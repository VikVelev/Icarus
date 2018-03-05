# Currently hosted at: nowhere (wip)

# CiD-Platform (WIP)
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

#S3

WIP