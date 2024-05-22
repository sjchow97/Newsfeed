from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.core.exceptions import ValidationError
from django.utils import timezone
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from .feed_reader import get_feeds, feed_to_json
from .comment_model_manager import get_comments
from .reaction_model_manager import get_reactions, add_reaction, remove_reaction, get_reaction_counts, user_reaction
from .models import PostReference, PostComment, PostReaction
from .serializers import PostReferenceSerializer, PostCommentSerializer, PostReactionSerializer
from bs4 import BeautifulSoup

import re
import uuid
import requests

REFERENCE_NAMESPACE = uuid.UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')

# Gets all the RSS feed entries depending on the user's location, as well as the comments and reactions for the related posts
# GET /rss/read_feeds/
# params: request object
# returns: response object with body containing JSON object containing the feed posts, comments, and reactions
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def read_feeds(request):
    feeds = get_feeds(request.user.userprofile.location)
    comment_dict = {}
    reaction_dict = {}
    for entry in feeds.entries:
        reference_id = uuid.uuid5(REFERENCE_NAMESPACE, entry.title.encode('utf-8'))
        entry['uuid'] = reference_id
        # get meta info
        url_pattern = re.compile(r'https?://\S+')
        url_match = url_pattern.search(entry.link)
        if url_match:
            url = url_match.group()
            response = requests.get(url)

            if response.status_code == 200:
                html_content = response.content
                soup = BeautifulSoup(html_content, 'html.parser')

                image = soup.find('meta', property='og:image')

                entry['image'] = image['content'] if image else ''
        else:
            url = None

        if PostReference.objects.filter(reference_id=reference_id).exists():
            reference = PostReference.objects.get(reference_id=reference_id)
            # Check comments
            comments = get_comments(reference)
            if comments.exists():
                post_comment_serializer = PostCommentSerializer(comments, many=True)
                comment_dict[str(reference_id)] = post_comment_serializer.data

            # Check reactions
            reactions = get_reactions(reference)
            if reactions.exists():
                reaction_counts = get_reaction_counts(reference_id)
                user_vote = user_reaction(reference_id, request.user)
                reaction_dict[str(reference_id)] = {
                    'likes': reaction_counts['likes'],
                    'dislikes': reaction_counts['dislikes'],
                    'user_vote': user_vote
                }
    json_feeds = feed_to_json(feeds)
    context = {
        "feed_posts": json_feeds["entries"],
        "post_comments": comment_dict,
        "post_reactions": reaction_dict,
    }
    return Response(context)

# Gets all the comments for a specific post
# GET /rss/get_comments_for_post/<reference_id>/
# params: request object, reference_id
# returns: response object with body containing JSON object containing the comments for the post (array of comments)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def get_comments_for_post(request, reference_id):
    try:
        reference = PostReference.objects.get(reference_id=reference_id)
    except PostReference.DoesNotExist:
        return Response({'error': 'PostReference not found'}, status=404)

    comments = get_comments(reference)
    post_comment_serializer = PostCommentSerializer(comments, many=True)
    return Response(post_comment_serializer.data)

# Gets all the comments in the database
# GET /rss/list_comments/
# params: request object
# returns: response object with body containing JSON object containing all the comments
@api_view(['GET'])
def list_comments(request):
    if request.method == 'GET':
        post_comments = PostComment.objects.all()
        post_comment_serializer = PostCommentSerializer(post_comments, many=True)
        return Response(post_comment_serializer.data)
    else:
        return Response({'error': 'Invalid request method'}, status=405)

# Creates a new comment for a post
# POST /rss/post_comment/
# params: request object with body containing JSON object with the post comment data
# returns: response object with body containing JSON object with the new post comment data
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def create_post_comment(request):
    if request.method == 'POST':
        # Request body should contain post_reference data of the post they are commenting on
        post_reference_data = request.data.pop('post_reference', None)
        if post_reference_data is not None:
            post_reference, created = PostReference.objects.get_or_create(reference_id=post_reference_data['reference_id'], defaults=post_reference_data)
            data = request.data.copy()
            data.update({'reference': post_reference.reference_id})
            data.update({'parent': None})
            data.update({'user': request.user.id})
            data.update({'creation_date': timezone.now()})
            post_comment_serializer = PostCommentSerializer(data=data)
            if post_comment_serializer.is_valid():
                post_comment = post_comment_serializer.save()
                return Response(post_comment_serializer.data)
            else:
                return Response(post_comment_serializer.errors, status=400)
        else:
            return Response({'error': 'post_reference data is missing'}, status=400)
    else:
        return Response({'error': 'Invalid request method'}, status=405)

# Replies to an existing comment
# POST /rss/reply_to_comment/<comment_id>/
# params: request object with body containing JSON object with the reply comment data
# returns: response object with body containing JSON object with the new reply comment data
@api_view(['POST'])
def reply_to_comment(request, comment_id):
    if request.method == 'POST':
        try:
            parent_comment = PostComment.objects.get(comment_id=comment_id)
        except PostComment.DoesNotExist:
            return Response({'error': 'Parent comment not found'}, status=404)

        data = request.data.copy()
        data.update({'reference': parent_comment.reference.reference_id})
        data.update({'parent': parent_comment.comment_id})
        data.update({'user': request.user.id})
        data.update({'creation_date': timezone.now()})
        post_comment_serializer = PostCommentSerializer(data=data)
        if post_comment_serializer.is_valid():
            post_comment = post_comment_serializer.save()
            return Response(post_comment_serializer.data)
        else:
            return Response(post_comment_serializer.errors, status=400)
    else:
        return Response({'error': 'Invalid request method'}, status=405)

# Edits an existing comment
# PUT /rss/edit_comment/<comment_id>/
# params: request object with body containing JSON object with the new post comment data
# returns: response object with body containing JSON object with the edited post comment data
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
def edit_post_comment(request, comment_id):
    if request.method == 'PUT':
        try:
            post_comment = PostComment.objects.get(comment_id=comment_id)
        except PostComment.DoesNotExist:
            return Response({'error': 'PostComment not found'}, status=404)

        if request.user.is_authenticated and post_comment.user == request.user:
            data = request.data.copy()
            data.update({'edited_date': timezone.now()})
            for key in ['post_title', 'content', 'edited_date']:
                if key in data:
                    setattr(post_comment, key, data[key])
            post_comment.save()
            post_comment_serializer = PostCommentSerializer(post_comment)
            return Response(post_comment_serializer.data)
        else:
            return Response({'error': 'User does not have permission to edit this comment'}, status=403)
    else:
        return Response({'error': 'Invalid request method'}, status=405)

# Deletes an existing comment
# DELETE /rss/delete_comment/<comment_id>/
# params: request object
# returns: response object with body containing JSON object with message indicating success or failure
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
def delete_post_comment(request, comment_id):
    if request.method == 'DELETE':
        try:
            post_comment = PostComment.objects.get(comment_id=comment_id)
        except PostComment.DoesNotExist:
            return Response({'error': 'PostComment not found'}, status=404)

        if request.user.is_authenticated and post_comment.user == request.user:
            post_comment.delete()
            return Response({'message': 'Comment deleted successfully'})
        else:
            return Response({'error': 'User does not have permission to delete this comment'}, status=403)
    else:
        return Response({'error': 'Invalid request method'}, status=405)

# Likes a post
# POST /rss/like_post/<reference_id>/
# params: request object and reference_id
# returns: response object with body containing JSON object with the new post reaction data
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def like_post(request, reference_id):
    if request.method == 'POST':
        if reference_id is None:
            return Response({'error': 'reference_id is missing'}, status=400)
        post_reference, created = PostReference.objects.get_or_create(reference_id=reference_id)
        user = request.user
        reaction = add_reaction(post_reference, user, 1)
        return Response(PostReactionSerializer(reaction).data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method'}, status=405)

# Dislikes a post
# POST /rss/like_post/<reference_id>/
# params: request object and reference_id
# returns: response object with body containing JSON object with the new post reaction data
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def dislike_post(request, reference_id):
    if request.method == 'POST':
        if reference_id is None:
            return Response({'error': 'reference_id is missing'}, status=400)
        post_reference, created = PostReference.objects.get_or_create(reference_id=reference_id)
        user = request.user
        reaction = add_reaction(post_reference, user, -1)
        return Response(PostReactionSerializer(reaction).data, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid request method'}, status=405)

# Removes a reaction from a post
# DELETE /rss/undo_reaction/<reference_id>/
# params: request object and reference_id
# returns: response object with body containing JSON object with message indicating success or failure
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
def undo_reaction(request, reference_id):
    if request.method == 'DELETE':
        if reference_id is None:
            return Response({'error': 'reference_id is missing'}, status=400)
        try:
            post_reference = PostReference.objects.get(reference_id=reference_id)
        except PostReference.DoesNotExist:
            return Response({'error': 'PostReference not found'}, status=404)
        user = request.user
        remove_reaction(post_reference, user)

        # If no other comment or reaction exists for the post, delete the post reference as well
        if not (PostComment.objects.filter(reference=post_reference).exists() or 
                PostReaction.objects.filter(reference=post_reference).exists()):
            post_reference.delete()
        return Response({'message': 'Reaction removed successfully'})
    else:
        return Response({'error': 'Invalid request method'}, status=405)


# Function from fcv-redesign meant to obtain image url 
# @login_required_ajax
def FetchMeta(request):
            if request.method == 'GET':
                input_string = request.GET.get('input_string')  # String containing URL(s)

                # Regular expression pattern to detect URLs
                url_pattern = re.compile(r'https?://\S+')
                urls = url_pattern.findall(input_string)

                meta_info_list = []
                
                for url in urls:
                    try:
                        response = requests.get(url)
                        if response.status_code == 200:
                            html_content = response.content
                            soup = BeautifulSoup(html_content, 'html.parser')

                            # Extract meta information
                            title = soup.find('meta', property='og:title')
                            description = soup.find('meta', property='og:description')
                            image = soup.find('meta', property='og:image')

                            meta_info = {
                                'url': url,
                                'title': title['content'] if title else '',
                                'description': description['content'] if description else '',
                                'image': image['content'] if image else ''
                            }
                            meta_info_list.append(meta_info)
                            return JsonResponse({'meta_info': meta_info_list})
                    except Exception as e:
                        # Handle exceptions accordingly
                        print("Error fetching metadata for")

            return JsonResponse({'error': 'Invalid request'})
            