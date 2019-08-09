#!/usr/bin/env bash
echo "Running Release Tasks"

echo "Running Database migrations and migrating the new changes"
python manage.py makemigrations api users
python manage.py migrate --noinput

echo "Done.."