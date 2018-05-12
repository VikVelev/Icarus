# Currently hosted at: cid-platform.com


# Notes before trying to use it.

It is WIP so bugs are pretty common
 
- Revision control is acting pretty sketchy.

The project is in really active and rapid development.

# How to run on your machine
It is wrapped in a docker container. Requires a build first.

This is the production build.
```bash
    git clone https://github.com/VikVelev/CiD-Platform
    cd CiD-Platform/cid-api-django
    git checkout production
    sudo docker-compose up --build
```

Everything should be up on 0.0.0.0.

If you want to run everything in developer mode.
```shell
    git checkout master
```
If you want to run the frontend only in developer mode (the docker serves a built one with no logging):

```shell
    #After cloning the repository
    cd CiD-Platform/cid-spa
    yarn install
    yarn start
```

# CiD-Platform
Version control web platform for 3D models. Making collaborating in 3D design easier.
# Used techonologies:
Django, DRF, React, Webpack, Babel, Three.js, Docker, Minio, Postgres
# Structure

# API

cid-api-django folder contains the REST API for the app. 
The architecture is as following:

```js
storage(filesystem/s3)) ---> db(postgres) ---(django orm)---> Django Backend ---(nginx serving SPA)---> React frontend
                                                                    |                                    |                 
                                                                    ^------(AJAX Requests)<----(Redux)<---
//NOTE: Django doest both - serving the SPA and acting like a REST API.
```
# If you encounter a bug please submit an issue. Thanks.
