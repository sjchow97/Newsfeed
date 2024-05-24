from .models import PostReaction

def get_reactions(reference_id):
    return PostReaction.objects.filter(reference=reference_id)

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

def get_reaction_counts(reference_id):
    reactions = get_reactions(reference_id)
    return {
        'likes': reactions.filter(vote=1).count(),
        'dislikes': reactions.filter(vote=-1).count(),
    }

def user_reaction(reference_id, user):
    reaction = PostReaction.objects.filter(reference=reference_id, user=user).first()
    return reaction.vote if reaction else 0
