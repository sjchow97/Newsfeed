from .models import PostReaction

def get_reactions(reference_id):
    return PostReaction.objects.filter(reference=reference_id)

def add_reaction(reference_id, user, vote):
    reaction = PostReaction()
    reaction.reference = reference_id
    reaction.user = user
    reaction.vote = vote
    reaction.save()
    return reaction

