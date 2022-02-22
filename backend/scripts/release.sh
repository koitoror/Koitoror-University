# !/bin/sh

set -e

ls -la /app/frontend/staticfiles/
ls -la /app/frontend/build

whoami

echo "Running Release Tasks"

# python backend/manage.py wait_for_db
# python backend/manage.py collectstatic --noinput

echo "Running Database migrations and migrating the new changes"
# python backend/manage.py makemigrations account admin assignment auth authtoken contenttypes sessions sites socialaccount profiles
python backend/manage.py makemigrations account admin assignment auth authtoken base contenttypes core profiles sessions sites socialaccount token_blacklist
python backend/manage.py makemigrations 
python backend/manage.py migrate --noinput

echo "Done.."