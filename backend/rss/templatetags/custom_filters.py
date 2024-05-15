from django import template
from django.template.defaultfilters import slugify

import uuid

register = template.Library()
REFERENCE_NAMESPACE = uuid.UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')

def convert_uuid(value):
    return uuid.uuid5(REFERENCE_NAMESPACE, value.title.encode('utf-8'))

def get_item(dictionary, key):
    return dictionary.get(key)

register.filter('convert_uuid', convert_uuid)
register.filter('get_item', get_item)