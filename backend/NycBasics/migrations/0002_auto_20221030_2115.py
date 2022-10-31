# Generated by Django 2.2 on 2022-10-31 01:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("NycBasics", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("username", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=255)),
                ("password", models.CharField(max_length=50)),
                ("ifLogged", models.BooleanField(default=False)),
                ("token", models.CharField(default="", max_length=500, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name="amenity_model",
        ),
        migrations.DeleteModel(
            name="user_location_model",
        ),
    ]
