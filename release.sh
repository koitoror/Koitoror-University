#!/usr/bin/env bash
echo "Running Release Tasks"

echo "Running Database migrations and migrating the new changes"
# python manage.py makemigrations account admin assignment auth authtoken contenttypes sessions sites socialaccount users
python manage.py migrate --noinput

echo "Done.."