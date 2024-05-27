# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentReaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('vote', models.IntegerField(choices=[(1, b'Like'), (-1, b'Dislike')])),
            ],
        ),
        migrations.CreateModel(
            name='PostComment',
            fields=[
                ('comment_id', models.AutoField(serialize=False, primary_key=True)),
                ('post_title', models.CharField(max_length=80, null=True)),
                ('content', models.CharField(max_length=800)),
                ('creation_date', models.DateTimeField(verbose_name=b'date published')),
                ('edited_date', models.DateTimeField(null=True, verbose_name=b'date edited')),
                ('parent', models.ForeignKey(related_name='replies', blank=True, to='rss.PostComment', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PostReaction',
            fields=[
                ('reaction_id', models.AutoField(serialize=False, primary_key=True)),
                ('vote', models.IntegerField(choices=[(1, b'Like'), (-1, b'Dislike')])),
            ],
        ),
        migrations.CreateModel(
            name='PostReference',
            fields=[
                ('reference_id', models.CharField(max_length=200, serialize=False, primary_key=True)),
            ],
        ),
        migrations.CreateModel(
            name='RssSource',
            fields=[
                ('source_id', models.AutoField(serialize=False, primary_key=True)),
                ('source_name', models.CharField(max_length=200)),
                ('url', models.CharField(max_length=200)),
                ('location', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='postreaction',
            name='reference',
            field=models.ForeignKey(to='rss.PostReference'),
        ),
        migrations.AddField(
            model_name='postreaction',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='postcomment',
            name='reference',
            field=models.ForeignKey(to='rss.PostReference'),
        ),
        migrations.AddField(
            model_name='postcomment',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='commentreaction',
            name='comment',
            field=models.ForeignKey(to='rss.PostComment'),
        ),
        migrations.AddField(
            model_name='commentreaction',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
