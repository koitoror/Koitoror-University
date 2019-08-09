#!/usr/bin/env bash
echo "Running Release Tasks"

echo "Running Database migrations and migrating the new changes"
python manage.py migrate api, users --noinput
# python manage.py migrate --noinput

echo "Done.."