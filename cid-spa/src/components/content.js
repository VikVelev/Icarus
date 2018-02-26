import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Navbar } from './navbar.js'

import HomePage from './templates/homePage.js';
import Feed from './templates/feed.js';
import Profile from './templates/profilePage.js'
import Upload from './templates/upload.js'

import{ LoginForm, LoggedIn } from './templates/loginForm.js';
import RegisterForm from './templates/registerForm.js';

import { BrowserRouter as Router } from "react-router-dom";

var noNavbar = [ 'homepage', 'login', 'register', ]
var state = { currentPage: 'feed' }

const RenderNavbar = () => {
    for (let i = 0; i < noNavbar.length; i++) {
        if (state.currentPage === noNavbar[i]) {
            return null
        }
    }
    return <Navbar/>
}

export default class Content extends Component {
    render(){
        return(
            <Router>
                <div className="content">
                    <RenderNavbar/>
                    <Switch>
                        <Route exact path="/" component={routes.Home} />
                        <Route exact path="/login" component={routes.Login} />
                        <Route exact path="/trending" component={routes.Trending} />                                                          
                        <Route exact path="/register" component={routes.SignUp} />
                        <Route exact path="/profile" component={routes.MyProfile} />
                        <Route exact path="/upload" component={routes.Upload} />                                                                                                                                                
                    </Switch>
                </div>
            </Router>
        );
    }
}

var dataFeed = {
    image: "/img/trex.png",
    user: {
        name: "viktorv",
        id: "user/10"
    },
    date: "26th Feb",
    description: "Voluptate consequat aliquip non irure laboris. Et sunt duis magna sunt irure labore Lorem ea dolor consectetur aliqua laborum. Proident sint sunt in Lorem deserunt. Labore est sit labore duis Lorem voluptate adipisicing voluptate eiusmod qui elit aliquip. Sit tempor ex veniam sunt aute officia Lorem excepteur nisi ad amet. Fugiat minim irure voluptate irure exercitation consequat consequat quis.",
}

var dataFeedTrending = {
    image: "/img/logo.png",
    user: {
        name: "Bill Gates",
        id: "user/666"
    },
    date: "30th Feb",
    description: "Voluptate consequat aliquip non irure laboris. Et sunt duis magna sunt irure labore Lorem ea dolor consectetur aliqua laborum. Proident sint sunt in Lorem deserunt. Labore est sit labore duis Lorem voluptate adipisicing voluptate eiusmod qui elit aliquip. Sit tempor ex veniam sunt aute officia Lorem excepteur nisi ad amet. Fugiat minim irure voluptate irure exercitation consequat consequat quis.",
}

var loggedIn = true

const routes = {
    Home: () => ( loggedIn ? <Feed feedData={dataFeed} /> : <HomePage/> ),
    Login: () =>  ( loggedIn ? <LoggedIn/> : <LoginForm/> ) ,
    SignUp: () => ( loggedIn ? <LoggedIn/> : <RegisterForm/> ),
    Trending: () => ( loggedIn ? <Feed feedData={dataFeedTrending} /> : null ),
    MyProfile: () => ( loggedIn ? <Profile loggedUser={1}/> : <LoginForm/> ),
    Upload: () => ( loggedIn ? <Upload/> : <LoginForm/> )
    // TODO: IMPLEMENT THIS
    //Profile: () => ( loggedIn ? <Profile loggedUser={state.id}/> : <LoginForm message="You are not logged in"/> )
    
    //Add more routes here
}