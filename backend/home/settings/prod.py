'''Use this for production'''

from .base import *

DEBUG = True
ALLOWED_HOSTS += [
    'localhost',
    '127.0.0.1',
    '127.0.0.1:5000',
    '127.0.0.1:8000',
    'http://koitoror-university.tk',
    'https://koitoror-university.tk',
    'koitoror-university.tk',
    'koitoror-university.herokuapp.com',
    'http://koitoror-university.herokuapp.com',
    'https://koitoror-university.herokuapp.com'
]
WSGI_APPLICATION = 'backend.home.wsgi.prod.application'

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'koitoror-uni',
#         'USER': 'postgres',
#         'PASSWORD': '123456',
#         'HOST': 'localhost',
#         'PORT': '5432',
#     }
# }

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'd2vkr549vqnkf0',
#         'USER': 'dxgytuffemacwh',
#         'PASSWORD': '8f6bb7712144ad42df175f55ca7434e482bcaa6d87791ab2bea3a81a280d2908',
#         'HOST': 'ec2-54-83-9-36.compute-1.amazonaws.com',
#         'PORT': '5432',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.environ.get('DB_HOST'),
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASS'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
