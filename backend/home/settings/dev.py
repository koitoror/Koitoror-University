'''Use this for development'''

from .base import *

# ALLOWED_HOSTS += os.environ.get('ALLOWED_HOSTS_DEV'),
ALLOWED_HOSTS += [
    'localhost:3000',
    'localhost:5000',
    'localhost:8000',
    'kubernetes.docker.internal'
    '127.0.0.1:3000',
    '127.0.0.1:5000',
    '127.0.0.1:8000',
]

DEBUG = True

WSGI_APPLICATION = 'backend.home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
