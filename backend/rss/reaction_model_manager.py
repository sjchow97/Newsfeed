from .models import PostReaction

def get_reactions(reference_id):
    return PostReaction.objects.filter(reference=reference_id)

#def add_reaction(reference_id, user, vote):
    #reaction = PostReaction()
    #reaction.reference = reference_id
    #reaction.user = user
    #reaction.vote = vote
    #reaction.save()
    #return reaction

def add_reaction(reference_id, user, vote):
    reaction, _ = PostReaction.objects.update_or_create(
        reference=reference_id,
        user=user,
        defaults={'vote': vote},
    )
    return reaction

def get_reaction_counts(reference_id):
    reactions = get_reactions(reference_id)
    return {
        'likes': reactions.filter(vote=1).count(),
        'dislikes': reactions.filter(vote=-1).count(),
    }

def user_reaction(reference_id, user):
    reaction = PostReaction.objects.filter(reference=reference_id, user=user).first()
    return reaction.vote if reaction else 0
