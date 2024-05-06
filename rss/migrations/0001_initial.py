# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FeedPost',
            fields=[
                ('post_id', models.IntegerField(serialize=False, primary_key=True)),
                ('post_title', models.CharField(max_length=200)),
                ('content', models.CharField(max_length=200)),
                ('link', models.CharField(max_length=200)),
                ('creation', models.DateTimeField(verbose_name=b'date published')),
            ],
        ),
        migrations.CreateModel(
            name='FeedVote',
            fields=[
                ('reaction_id', models.IntegerField(serialize=False, primary_key=True)),
                ('vote', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='PostReference',
            fields=[
                ('reference_id', models.CharField(max_length=200, serialize=False, primary_key=True)),
                ('source_id', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='feedvote',
            name='reference',
            field=models.ForeignKey(to='rss.PostReference'),
        ),
        migrations.AddField(
            model_name='feedpost',
            name='reference',
            field=models.ForeignKey(to='rss.PostReference'),
        ),
    ]
