# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rss', '0003_auto_20240517_0855'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='postreference',
            name='source_id',
        ),
    ]
