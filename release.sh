#!/usr/bin/env bash

# set -e

# ls -la /vol/
# ls -la /vol/web

# whoami

echo "Running Release Tasks"

# python backend/manage.py wait_for_db
# python backend/manage.py collectstatic --noinput

echo "Running Database migrations and migrating the new changes"
python backend/manage.py makemigrations account admin assignment auth authtoken contenttypes sessions sites socialaccount users
# python backend/manage.py makemigrations
python backend/manage.py migrate --noinput

echo "Done.."