# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('rss', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommentReaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('vote', models.IntegerField(choices=[(1, b'Like'), (-1, b'Dislike')])),
            ],
        ),
        migrations.RemoveField(
            model_name='postcomment',
            name='link',
        ),
        migrations.AddField(
            model_name='postcomment',
            name='edited_date',
            field=models.DateTimeField(null=True, verbose_name=b'date edited'),
        ),
        migrations.AddField(
            model_name='postcomment',
            name='parent',
            field=models.ForeignKey(related_name='replies', blank=True, to='rss.PostComment', null=True),
        ),
        migrations.AlterField(
            model_name='postcomment',
            name='content',
            field=models.CharField(max_length=800),
        ),
        migrations.AlterField(
            model_name='postcomment',
            name='post_title',
            field=models.CharField(max_length=80, null=True),
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
