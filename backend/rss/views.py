from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.core.exceptions import ValidationError
from django.utils import timezone

from .feed_reader import get_feeds
from .comment_model_manager import get_comments, add_comment, edit_comment, delete_comment
from .reaction_model_manager import get_reactions

from .models import PostReference

import uuid

# Create your views here.

# REFERENCE_NAMESPACE = uuid.UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')

# def index(request):
#     feeds = get_feeds(request.user.userprofile.location)
#     comment_dict = {}
#     reaction_dict = {}
#     for entry in feeds.entries:
#         reference_id = uuid.uuid5(REFERENCE_NAMESPACE, entry.title.encode('utf-8'))
#         print("id: " + str(reference_id))
#         if PostReference.objects.filter(reference_id=reference_id).exists():
#             print("Reference exists")
#             reference = PostReference.objects.get(reference_id=reference_id)
#             comments = get_comments(reference)
#             reactions = get_reactions(reference)
#             comment_dict[reference_id] = comments
#             reaction_dict[reference_id] = reactions
#     template = loader.get_template("rss/index.html")
#     context = {
#         "feeds": feeds,
#         "post_comments": comment_dict,
#         "post_reactions": reaction_dict,
#     }
#     return HttpResponse(template.render(context, request))

# # @csrf_exempt
# def post_comment(request):
#     if request.method == 'POST':
#         reference_id = request.POST['reference_id']
#         post_title = request.POST['post_title']
#         content = request.POST['content']
#         user = request.user

#         try: 
#             add_comment(reference_id, user, post_title, content)
#             return JsonResponse({'status': 'success', 'message': 'Comment added successfully'})
#         except ValidationError as e:
#             return JsonResponse({'status': 'error', 'message': str(e)})
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

# # @csrf_exempt
# def edit_comment(request):
#     if request.method == 'POST':
#         comment_id = request.POST['comment_id']
#         post_title = request.POST['post_title']
#         content = request.POST['content']
#         user = request.user

#         try: 
#             edit_comment(comment_id, user, post_title, content)
#             return JsonResponse({'status': 'success', 'message': 'Comment edited successfully'})
#         except ValidationError as e:
#             return JsonResponse({'status': 'error', 'message': str(e)})
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

# # @csrf_exempt
# def delete_comment(request):
#     if request.method == 'POST':
#         comment_id = request.POST['comment_id']
#         user = request.user

#         try: 
#             delete_comment(comment_id, user)
#             return JsonResponse({'status': 'success', 'message': 'Comment deleted successfully'})
#         except ValidationError as e:
#             return JsonResponse({'status': 'error', 'message': str(e)})
#     else:
#         return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import PostReference, PostComment
from .serializers import PostReferenceSerializer, PostCommentSerializer

# Sample class to perform a GET and POST to the database
# class ListComments(generics.ListCreateAPIView):
#     queryset = PostComment.objects.all()
#     serializer_class = PostCommentSerializer

@api_view(['GET'])
def list_comments(request):
    if request.method == 'GET':
        post_comments = PostComment.objects.all()
        post_comment_serializer = PostCommentSerializer(post_comments, many=True)
        return Response(post_comment_serializer.data)
    else:
        return Response({'error': 'Invalid request method'}, status=405)

@api_view(['POST'])
def create_post_comment(request):
    if request.method == 'POST':
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

@api_view(['PUT'])
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

@api_view(['DELETE'])
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