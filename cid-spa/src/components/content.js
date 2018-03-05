import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Navbar } from './navbar.js'

import HomePage from './sub-components/pages/homePage.js';
import Feed from './sub-components/feed.js';
import Profile from './sub-components/pages/profilePage.js'
import Upload from './sub-components/upload.js'

import{ LoginForm } from './sub-components/pages/loginForm.js';
import RegisterForm from './sub-components/pages/registerForm.js';

import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';

import { changePages } from '../actions/pageManagementActions.js'


@connect((store) => {
    return {
        user: store.userManagement,
        page: store.pageManagement,
    }
})
export default class Content extends Component {

    constructor(props) {
        super(props)
        this.props.dispatch(changePages(this.extractCurrentPage()))
        this.noNavbar = ['homepage', 'login', 'register']
    }

    extractCurrentPage(){
        let location = window.location.href

        for (let i = 0; i < 3; i++) {
            location = location.slice(location.search("/") + 1, location.length)
        }
        
        return location
    }

    RenderNavbar () {
        for (let i = 0; i < this.noNavbar.length; i++) {
            if (this.props.page.currentPage === this.noNavbar[i] || !this.props.user.logged) {
                return null;
            }
        }
        return <Navbar/>
    }

    render(){
        return(
            <Router>
                <div className="content">
                    {this.RenderNavbar()}
                    <Switch>
                        <Route exact path="/" component={this.routes.Home} />
                        <Route exact path="/login" component={this.routes.Login} />
                        <Route exact path="/trending" component={this.routes.Trending} />                                                          
                        <Route exact path="/register" component={this.routes.SignUp} />
                        <Route exact path="/profile" component={this.routes.MyProfile} />
                        <Route exact path="/upload" component={this.routes.Upload} />                                                                                                                                                
                    </Switch>
                </div>
            </Router>
        );
    }

    dataFeed = {
        title: "Aventador",
        image: "/img/trex.png",
        user: {
            name: "viktorv",
            id: "user/10"
        },
        date: "26th Feb",
        description: "Pretty cool model I made",
        modelPath: "/models/aventador/",
        modelName: "Avent"  
    }
    
    dataFeedTrending = {
        image: "/img/logo.png",
        user: {
            name: "VikVelev",
            id: "user/666"
        },
        date: "30th Feb",
        description: "Voluptate consequat aliquip non irure laboris. Et sunt duis magna sunt irure labore Lorem ea dolor consectetur aliqua laborum. Proident sint sunt in Lorem deserunt. Labore est sit labore duis Lorem voluptate adipisicing voluptate eiusmod qui elit ",
        modelPath: "/models/aventador/",
        modelName: "Avent"
    }

    routes = {
        Home: () => ( this.props.user.logged ? <Feed feedData={this.dataFeed} /> : <HomePage/> ),
        Login: () =>  ( this.props.user.logged ? <Redirect to="/"/> : <LoginForm/> ),
        SignUp: () => ( this.props.user.logged ? <Redirect to="/"/> : <RegisterForm/> ),
        Trending: () => ( this.props.user.logged ? <Feed feedData={this.dataFeedTrending} /> : <Redirect to="login"/> ),
        MyProfile: () => ( this.props.user.logged ? <Profile loggedUser={1}/> : <Redirect to="login"/> ),
        Upload: () => ( this.props.user.logged ? <Upload/> : <Redirect to="login"/> )
        // TODO: IMPLEMENT THIS
        //Profile: () => ( loggedIn ? <Profile loggedUser={state.id}/> : <LoginForm message="You are not logged in"/> )
        
        //Add more routes here
    }
}

