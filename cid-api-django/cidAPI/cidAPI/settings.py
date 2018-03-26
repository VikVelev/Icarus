"""
Django settings for cidAPI project.

Generated by 'django-admin startproject' using Django 2.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 's@5idp4#w&%!=1$pi6d8)2_(e=1ku6q44d%%tmj+aiwl2hfoq='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [    
    'fortress88.servebeer.com',
    'cid-platform.myddns.me',
    'localhost',
    '0.0.0.0',
    'main',
]

CORS_ORIGIN_WHITELIST = (
    'google.com',
    'localhost:3000',
    'main:3000',
    'localhost:8000',
    '0.0.0.0:3000',
    '0.0.0.0',
    '127.0.0.1:9000',
    'cid-platform.myddns.me:3000',
    'cid-platform.myddns.me:8000',
    'cid-platform.myddns.me',
    '192.168.0.106:3000'
    'localhost',
)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'minio_storage',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_registration',
    'django_extensions',
    'corsheaders',
    'core',   
]

REST_REGISTRATION = {
    'REGISTER_VERIFICATION_ENABLED': False,

    'RESET_PASSWORD_VERIFICATION_URL': 'https://localhost:3000/reset-password/',

    'REGISTER_EMAIL_VERIFICATION_ENABLED': False,

    'VERIFICATION_FROM_EMAIL': 'no-reply@cid.com',
    'LOGIN_RETRIEVE_TOKEN': True,
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    #'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    #'spa.middleware.SPAMiddleware',
]

ROOT_URLCONF = 'cidAPI.urls'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        
    ),
    # 'DEFAULT_PERMISSION_CLASSES': (
    #     'rest_framework.permissions.IsAuthenticated',
    # )
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'  # noqa
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'sharedlinks': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'links': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'minio_storage': {
            'handlers': ['console'],
            'level': 'INFO',
        }
    },
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cidAPI.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'db_password',
        'HOST': 'db',
        'PORT': 5432,
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Sofia'

USE_I18N = True

USE_L10N = True

USE_TZ = True

#TODO Fix Static directories so django can serve the spa properly
#TODO OR Just migrate to nginx to serve the spa, tyvm bye

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'static/static'),
    os.path.join(BASE_DIR, 'static/media'),
    os.path.join(BASE_DIR, 'static/src'),
)

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

DEFAULT_FILE_STORAGE = "minio_storage.storage.MinioMediaStorage"
MINIO_STORAGE_ENDPOINT = "cid-platform.myddns.me:9000"
MINIO_STORAGE_ACCESS_KEY = "test_access"
MINIO_STORAGE_SECRET_KEY = "test_secret"
MINIO_STORAGE_MEDIA_BUCKET_NAME = "media"

MINIO_STORAGE_USE_HTTPS = False
