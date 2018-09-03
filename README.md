# Currently hosted at: nowhere, ran out of gas. Contact me if interested.


# Notes before trying to use it.

It is WIP so bugs are pretty common
 
- Revision control is acting pretty sketchy.

# How to run on your machine
It is wrapped in a docker container. Requires a build first.

If you want to run everything in developer mode.

Docker stack:

```bash
    git clone https://github.com/VikVelev/CiD-Platform
    cd CiD-Platform/cid-api-django
    sudo docker-compose up --build
```

Frontend:

```shell
    #After cloning the repository
    cd CiD-Platform/cid-spa
    yarn install
    yarn start
```
Everything should be up on localhost:3000 and a production frontend build on localhost

# CiD-Platform
Version control web platform for 3D models. Making collaborating in 3D design easier.
# Used techonologies:
Django, DRF, React, Webpack, Babel, Three.js, Docker, Minio, Postgres, Nginx
# API

cid-api-django folder contains the REST API for the app. 
The architecture is as following:

```js
storage(filesystem/s3)) ---> db(postgres) ---(django orm)---> Django Backend ---(nginx serving SPA)---> React frontend
                                                                    |                                    |                 
                                                                    ^------(AJAX Requests)<----(Redux)<---
```
# If you encounter a bug please submit an issue. Thanks.
