from django import template
from django.template.defaultfilters import slugify

register = template.Library()

def custom_slugify(value):
    return slugify(value)

def get_item(dictionary, key):
    return dictionary.get(key)

register.filter('custom_slugify', custom_slugify)
register.filter('get_item', get_item)