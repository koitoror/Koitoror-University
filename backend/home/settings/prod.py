'''Use this for production'''

from .base import *

DEBUG = True

ALLOWED_HOSTS += [
    'localhost',
    'localhost:3000',
    'localhost:5000',
    'localhost:8000',
    '127.0.0.1',
    '127.0.0.1:3000',
    '127.0.0.1:5000',
    '127.0.0.1:8000',
    'http://koitoror-university.tk',
    'https://koitoror-university.tk',
    'koitoror-university.tk',
    'http://koitoror-university.herokuapp.com',
    'https://koitoror-university.herokuapp.com',
    'koitoror-university.herokuapp.com'
]

WSGI_APPLICATION = 'backend.home.wsgi.prod.application'


DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.environ.get('DB_HOST'),
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASS'),
        'PORT': os.environ.get('DB_PORT'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
