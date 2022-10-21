from django.core.management.base import BaseCommand
from django.conf import settings
import csv
from NycBasics.models import water_model, wifi_model, parking_model, bench_model, toilet_model


class Command(BaseCommand):
    def handle(self, *args, **options):

        water_model.objects.all().delete()
        wifi_model.objects.all().delete()
        parking_model.objects.all().delete()
        bench_model.objects.all().delete()
        toilet_model.objects.all().delete()


        with open('fountainmod.csv', 'r') as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:            
                if row[0]!="":
                    water_model.objects.create(water_longitude=row[1], water_latitude=row[2])


            csv_file.close()


        with open('wifimod.csv', 'r') as csv_file1:
            csv_reader = csv.reader(csv_file1, delimiter=',')
            for row in csv_reader:
                if row[0]!="":                    
                    wifi_model.objects.create(wifi_longitude=row[1], wifi_latitude=row[2])


            csv_file1.close()


        with open('parkingmod.csv', 'r') as csv_file2:
            csv_reader = csv.reader(csv_file2, delimiter=',')
            for row in csv_reader:
                if row[0]!="":
                    parking_model.objects.create(parking_longitude=row[1], parking_latitude=row[2])


            csv_file2.close()


        with open('benchmod.csv', 'r') as csv_file3:
            csv_reader = csv.reader(csv_file3, delimiter=',')
            for row in csv_reader:
                if row[0]!="":
                    bench_model.objects.create(bench_longitude=row[1], bench_latitude=row[2])


            csv_file3.close()


        with open('toiletmod.csv', 'r') as csv_file4:
            csv_reader = csv.reader(csv_file4, delimiter=',')
            for row in csv_reader:
                if row[0]!="":
                    toilet_model.objects.create(toilet_longitude=row[1], toilet_latitude=row[2])
            

            csv_file4.close()