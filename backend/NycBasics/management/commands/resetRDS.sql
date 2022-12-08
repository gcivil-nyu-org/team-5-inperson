-- Purpose: this script was created due to ID increments of
-- amenities in the tables caused by RDS migrations
-- These commands reset the ID back to the originals

---- Resetting Amenity IDs

-- create duplicate to test on
-- create table NycBasics_bench_model_test as (select * from public."NycBasics_bench_model");

-- bench
-- SELECT * FROM public."NycBasics_bench_model"
-- ORDER BY id ASC
-- update public."NycBasics_bench_model"
-- set id = id - 6492

-- wifi
-- SELECT * FROM public."NycBasics_wifi_model"
-- ORDER BY id ASC
-- update public."NycBasics_wifi_model"
-- set id = id - 13276

-- parking
-- SELECT * FROM public."NycBasics_parking_model"
-- ORDER BY id ASC
-- update public."NycBasics_parking_model"
-- set id = id - 69676

-- toilet
-- SELECT * FROM public."NycBasics_toilet_model"
-- ORDER BY id ASC
-- update public."NycBasics_toilet_model"
-- set id = id - 1116

-- water
-- SELECT * FROM public."NycBasics_water_model"
-- ORDER BY id ASC
-- update public."NycBasics_water_model"
-- set id = id - 13249

---- Resetting corresponding Rating Review amenity_ids

-- create duplicate to test on
-- create table NycBasics_rating_review_test as (select * from public."NycBasics_rating_review");

-- SELECT * FROM public."NycBasics_rating_review"
-- ORDER BY id ASC

-- water
-- update public."NycBasics_rating_review"
-- set amenity_id = MOD(amenity_id, (select count(*) from public."NycBasics_water_model"))
-- where amenity_type = 'water'

-- bench
-- update public."NycBasics_rating_review"
-- set amenity_id = MOD(amenity_id, (select count(*) from public."NycBasics_bench_model"))
-- where amenity_type = 'bench'

-- wifi
-- update public."NycBasics_rating_review"
-- set amenity_id = MOD(amenity_id, (select count(*) from public."NycBasics_wifi_model"))
-- where amenity_type = 'wifi'

-- parking
-- update public."NycBasics_rating_review"
-- set amenity_id = MOD(amenity_id, (select count(*) from public."NycBasics_parking_model"))
-- where amenity_type = 'parking'

-- toilet
-- update public."NycBasics_rating_review"
-- set amenity_id = MOD(amenity_id, (select count(*) from public."NycBasics_toilet_model"))
-- where amenity_type = 'toilet'