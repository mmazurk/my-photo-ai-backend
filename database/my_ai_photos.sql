\echo 'Delete and recreate database?'
\prompt 'Return for yes or Control-C to cancel >>>> ' reply

DROP DATABASE my_ai_photos;
CREATE DATABASE my_ai_photos;
\connect my_ai_photos

\i my_ai_photos_schema.sql
\i database_seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or Control-C to cancel >>>> ' reply

DROP DATABASE my_ai_photos_test;
CREATE DATABASE my_ai_photos_test;
\connect my_ai_photos_test

\i my_ai_photos_schema.sql
