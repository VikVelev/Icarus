# Currently hosted at: nowhere, currently working on it

# How to run on your machine
It is wrapped in a docker container. A minio docker will be added soon.
Requires a build first. If you haven't built it before it will start automatically with 'up' but if you have and you just updated you should rebuild.
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
The website + db should be up on 0.0.0.0:8000
# CiD-Platform
Version control web platform for 3D models. Making collaborating in 3D design easier.
# Used techonologies:
Django, DRF, React.js, webpack, bazel, Three.js, Docker, Heroku, Postgres

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
                                                                    |                                    |                 ^------(AJAX Requests)<----(Redux)<---
//NOTE: Django doest both - serving the SPA and acting like a REST API.
```
# DB
Database relations:
```js
//Not yet finished.
```

# S3

WIP