from django.contrib import admin

from .models import (
    User,
    water_model,
    wifi_model,
    parking_model,
    bench_model,
    toilet_model,
    Rating_Review,
)

admin.site.register(User)
admin.site.register(water_model)
admin.site.register(wifi_model)
admin.site.register(parking_model)
admin.site.register(bench_model)
admin.site.register(toilet_model)
admin.site.register(Rating_Review)
