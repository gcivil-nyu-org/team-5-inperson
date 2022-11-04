# Generated by Django 2.2 on 2022-11-04 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("NycBasics", "0002_rating_review"),
    ]

    operations = [
        migrations.RenameField(
            model_name="rating_review",
            old_name="user_id",
            new_name="user",
        ),
        migrations.RemoveField(
            model_name="rating_review",
            name="bench_id",
        ),
        migrations.RemoveField(
            model_name="rating_review",
            name="parking_id",
        ),
        migrations.RemoveField(
            model_name="rating_review",
            name="toilet_id",
        ),
        migrations.RemoveField(
            model_name="rating_review",
            name="water_id",
        ),
        migrations.RemoveField(
            model_name="rating_review",
            name="wifi_id",
        ),
        migrations.AddField(
            model_name="rating_review",
            name="amenity",
            field=models.IntegerField(default=0),
        ),
    ]
