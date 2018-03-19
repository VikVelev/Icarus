# Currently hosted at: cid-platform.myddns.me

It is WIP so bugs are pretty common, Validation is acting pretty sketchy atm.
In active development.

# How to run on your machine
It is wrapped in a docker container. Requires a build first. If you haven't built it before it will start automatically with 'up' but if you have and you just updated you should rebuild.

```bash
    git clone https://github.com/VikVelev/CiD-Platform
    cd CiD-Platform/cid-api-django
    sudo docker-compose build web
```
After build, an initial migration is required.
```bash
    sudo docker-compose run web python cidAPI/manage.py migrate
```
After that's done you should be able to run the container with:
```bash
    sudo docker-compose up
```
So to get this properly working locally on your machine you should also change the file in cid-api-django/cidAPI/cidAPI/settings.py.
Just rename settings.local to just settings.

The website + db + local minio storage should be up on 0.0.0.0:8000

If you want to run the frontend only in developer mode:

```shell
    #After cloning the repository
    cd CiD-Platform/cid-spa
    yarn install
    yarn start
```
# CiD-Platform
Version control web platform for 3D models. Making collaborating in 3D design easier.
# Used techonologies:
Django, DRF, React, webpack, babel, Three.js, Docker, Minio, Postgres
# Structure

# SPA
folder structure is as following (wip):
cid-spa folder contains the react-redux frontend.

```js

```

# API

cid-api-django folder contains the REST API for the app. 
The architecture is as following:

```js
storage(filesystem/s3)) ---> db(postgres) ---(django orm)---> Django Backend ---(serves SPA)---> React frontend
                                                                    |                                    |                 
                                                                    ^------(AJAX Requests)<----(Redux)<---
//NOTE: Django doest both - serving the SPA and acting like a REST API.
```
# DB
Database relations:
```js
//Not yet finished.
```

# S3

WIP