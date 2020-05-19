# Icarus
Version control web platform for 3D models. Making collaborating in 3D design easier. It was made for a couple of computer science competitions back in 2018 with big aspirations for the future, after receiving an overwhelmingly positive feedback.

# Features

- You can upload 3D models (currently supporting obj and mtl for now, but adding blender support shouldn't be hard).

- You can view each one of them in the respective user's profile.

- You can fork different projects. 

- You can contribute to other 3D projects. (By sending "pull requests" and awaiting approval from the creator)

- You can visualize the difference between two different versions.

- Features an optimized viewport written with the help of three.js. Running on any device supporting WebGL.

- Features a Home and Trending page where people post reviews of different models.

- Features a Profile page for each user containing statistics about their commits, models and interests.

# Currently hosted at: {contact me to send you the link as it is in closed alpha}

# Notes before trying to use it.

It is WIP so bugs are pretty common

- Diff and Revision control is acting pretty sketchy.

# How to run on your machine
It is wrapped in a docker container. Requires a build first and a lot of tweaks regarding allowed hosts, CORS, secrets + minio config, so I do not recommend trying. (Yes I know I should rewrite the docker configs and make it easier to run, but oh well.)

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

# Used techonologies:
Django, DRF, React, Three.js, Docker, Minio, Postgres
# API

cid-api-django folder contains the REST API for the app. 
The architecture is as following:

```js
storage(filesystem/s3)) ---> db(postgres) ---(django orm)---> Django Backend ---(nginx serving SPA)---> React frontend
                                                                    |                                    |                 
                                                                    ^------(AJAX Requests)<----(Redux)<---
```
# If you encounter a bug please submit an issue. Thanks.
