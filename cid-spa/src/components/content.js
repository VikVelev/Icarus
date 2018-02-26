import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Navbar } from './navbar.js'

import HomePage from './templates/homePage.js';
import RelatedPage from './templates/feed.js';

import LoginForm from './templates/loginForm.js';
import RegisterForm from './templates/registerForm.js';

import { BrowserRouter as Router } from "react-router-dom";

export default class Content extends Component {
    render(){
        return(
            <Router>
                <div className="content">
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={routes.Home} />
                        <Route exact path="/feed" component={routes.Posts} />
                        <Route exact path="/login" component={routes.Login} />                    
                        <Route exact path="/register" component={routes.SignUp} />                                                   
                    </Switch>
                </div>
            </Router>
        );
    }
}

const routes = {
    Home: () => <HomePage/>,
    Posts: () => <RelatedPage/>,
    Login: () => <LoginForm/>,
    SignUp: () => <RegisterForm/>
    //Add more routes here
}