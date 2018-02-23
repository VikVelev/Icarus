# CiD-Platform (WIP)
Version control web platform for 3D models. Making collaborating in 3D design easier.
# Used techonologies:
Django, DRF, React.js, webpack, bazel, Three.js, Docker, Heroku, Postgres

# Structure
viewport-dev contains the currently working viewport implemented with three.js.

cid folder contains the react frontend.
Frontend structure is as following (wip):

```js
Main component {
    Head {
        Navbar{
            Home,
            Posts,
            Login,
            Register,
        }
        Content {}
    }
    Footer{}
}

```

cid-api-django folder contains the REST API for the app. 
The architecture is as following:

```js
db(filesystem) ---> db(postgres) ---(django orm)---> Django Backend ---(serves SPA)---> React frontend
                                                        |                                    |
                                                        ^---(sends AJAXes to the rest api)<---

//NOTE: Django doest both - serving the SPA and acting like a REST API.
```

Database relations:
```js
//Not yet finished.
```
Will merge later all of them and put everything in a docker.