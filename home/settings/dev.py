'''Use this for development'''

from .base import *

ALLOWED_HOSTS += [
    'localhost',
    '127.0.0.1', 
    'koitoror-university.herokuapp.com'
]

DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

CORS_ORIGIN_WHITELIST = (
    '127.0.0.1',
    'localhost',
    'localhost:3000',
    'localhost:8000',
    'koitoror-university.herokuapp.com'
)
