from django.contrib import admin

# Register your models here.
from .models import water_model, wifi_model, parking_model, bench_model, toilet_model
#, amenity_model, user_location_model

admin.site.register(water_model)
admin.site.register(wifi_model)
admin.site.register(parking_model)
admin.site.register(bench_model)
admin.site.register(toilet_model)
#admin.site.register(amenity_model)
#admin.site.register(user_location_model)

