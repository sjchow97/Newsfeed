# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('rss', '0002_auto_20240515_1502'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postcomment',
            name='comment_id',
            field=models.AutoField(serialize=False, primary_key=True),
        ),
        migrations.AlterField(
            model_name='postreaction',
            name='reaction_id',
            field=models.AutoField(serialize=False, primary_key=True),
        ),
        migrations.AlterField(
            model_name='rsssource',
            name='source_id',
            field=models.AutoField(serialize=False, primary_key=True),
        ),
    ]
