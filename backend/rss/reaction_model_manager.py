from .models import PostReaction

# Get all reactions for a post
# params: reference_id is the id of the post
# returns: list of PostReaction objects
def get_reactions(reference_id):
    return PostReaction.objects.filter(reference=reference_id)

# Add a reaction to a post
# params: reference is the PostReference object, user is the User object, vote is the vote (as an integer)
# returns: dictionary containing updated counts and user's vote
def add_reaction(reference, user, vote):
    reaction, _ = PostReaction.objects.update_or_create(
        reference=reference,
        user=user,
        defaults={'vote': vote},
    )

    # Return updated counts
    updated_counts = get_reaction_counts(reference.reference_id)
    updated_likes = updated_counts['likes']
    updated_dislikes = updated_counts['dislikes']
    return {
        'likes': updated_likes,
        'dislikes': updated_dislikes,
        'user_vote': reaction.vote,
    }

# Remove a reaction from a post
# params: reference is the PostReference object, user is the User object
# returns: dictionary containing updated counts and user's vote
def remove_reaction(reference, user):
    PostReaction.objects.filter(reference=reference, user=user).delete()

    # Return updated counts
    updated_counts = get_reaction_counts(reference.reference_id)
    updated_likes = updated_counts['likes']
    updated_dislikes = updated_counts['dislikes']
    return {
        'likes': updated_likes,
        'dislikes': updated_dislikes,
        'user_vote': 0,
    }

# Get the counts of likes and dislikes for a post
# params: reference_id is the id of the post
# returns: dictionary containing counts of likes and dislikes
def get_reaction_counts(reference_id):
    reactions = get_reactions(reference_id)
    return {
        'likes': reactions.filter(vote=1).count(),
        'dislikes': reactions.filter(vote=-1).count(),
    }

# Get the user's reaction to a post
# params: reference_id is the id of the post, user is the User object
# returns: integer representing the user's vote (1 for like, -1 for dislike, 0 for no vote)
def user_reaction(reference_id, user):
    reaction = PostReaction.objects.filter(reference=reference_id, user=user).first()
    return reaction.vote if reaction else 0
