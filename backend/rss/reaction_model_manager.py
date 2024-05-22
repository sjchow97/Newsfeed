from .models import PostReaction

def get_reactions(reference_id):
    return PostReaction.objects.filter(reference=reference_id)

def add_reaction(reference_id, user, vote):
    #reaction = PostReaction()
    #reaction.reference = reference_id
    #reaction.user = user
    #reaction.vote = vote
    #reaction.save()
    #return reaction
    

    #check if the user has already reacted 
    existing_reaction = PostReaction.objects.filter(reference=reference_id,user = user).first()
    if existing_reaction:
        # Update the existing reaction
        existing_reaction.vote = vote
        existing_reaction.save()
        return existing_reaction
    else:
        # Create a new reaction
        reaction = PostReaction(reference=reference_id, user=user, vote=vote)
        reaction.save()
        return reaction

def get_reaction_counts(reference_id):
    # Count likes and dislikes
    likes = PostReaction.objects.filter(reference=reference_id, vote=1).count()
    dislikes = PostReaction.objects.filter(reference=reference_id, vote=-1).count()
    return {'likes': likes, 'dislikes': dislikes}

def user_reaction(reference_id, user):
    # Get the user's reaction to the post
    reaction = PostReaction.objects.filter(reference=reference_id, user=user).first()
    if reaction:
        return reaction.vote
    else:
        return 0  # No reaction
