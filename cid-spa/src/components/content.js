import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Navbar } from './navbar.js'

import Feed from './sub-components/pages/homeFeed.js';
import HomePage from './sub-components/pages/homePage.js';
import Revisions from './sub-components/pages/revisionPage.js';
import TrendingFeed from './sub-components/pages/trendingFeed.js';
import ErrorPage from './sub-components/pages/clientErrors.js'

import Profile from './sub-components/pages/profilePage.js'
import UserProfile from './sub-components/pages/userPage.js'

import ProfileSettings from './profile-components/profileSettings.js'
import AddPost from './sub-components/pages/addPostForm.js'
import Add3DModel from './sub-components/pages/add3DModelForm.js'
import ViewModel3D from './sub-components/pages/viewModel3D.js'

import { LoginForm } from './sub-components/pages/loginForm.js';
import RegisterForm from './sub-components/pages/registerForm.js';

import { BrowserRouter as Router } from "react-router-dom";
import { connect } from 'react-redux';

import { changePages } from '../actions/pageActions.js'


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

        if (location === "" && this.props.user.logged) {
            location = "home"
        } else if (location === "") {
            location = "homepage"
        }

        this.props.dispatch(changePages(location))
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

    checkForErrors(){
        if (Object.keys(this.props.user.error).length !== 0) {
            return <ErrorPage type={this.props.user.error.response.status}/>
        }
    }

    render(){
        return(
            <Router>
                <div className="content">
                    {this.RenderNavbar()}
                    {this.checkForErrors()}
                    <Switch>
                        <Route exact path="/" component={this.routes.Home} />
                        <Route exact path="/login" component={this.routes.Login} />
                        <Route exact path="/trending" component={this.routes.Trending} />                                                          
                        <Route exact path="/register" component={this.routes.SignUp} />
                        
                        <Route exact path="/create-post" component={this.routes.CreatePost} />                        
                        <Route exact path="/create-model" component={this.routes.Upload} />

                        <Route exact path="/profile/" component={this.routes.MyProfile} />                        
                        <Route exact path="/profile/settings" component={this.routes.ProfileSettings} />
                        <Route exact path="/profile/:id" component={this.routes.UserProfile} />

                        <Route exact path="/model/:id" component={this.routes.ViewModel}/>
                        <Route exact path="/profile/model/:id" component={this.routes.ViewModel}/>

                        <Route exact path="/revisions" component={this.routes.Revisions}/>
                        <Route path='*' type={404} exact={true} component={this.routes.Error404} />          
                    </Switch>
                </div>
            </Router>
        );
    }

    routes = {
        Home: () => ( this.props.user.logged ? <Feed/> : <HomePage/> ),
        Login: () =>  ( this.props.user.logged ? <Redirect to="/"/> : <LoginForm/> ),
        SignUp: () => ( this.props.user.logged ? <Redirect to="/"/> : <RegisterForm/> ),
        Trending: () => ( this.props.user.logged ? <TrendingFeed/> : <Redirect to="/login"/> ),
        MyProfile: () => ( this.props.user.logged ? <Profile/> : <Redirect to="/login"/> ),
        UserProfile: (data) => ( this.props.user.logged ? <UserProfile id={data.match.params.id}/> : <Redirect to="/login"/> ),        
        ProfileSettings: () => ( this.props.user.logged ? <ProfileSettings/> : <Redirect to="/login"/> ),
        Upload: () => ( this.props.user.logged ? <Add3DModel/> : <Redirect to="/login"/> ),
        CreatePost: () => ( this.props.user.logged ? <AddPost/> : <Redirect to="/login"/> ),
        ViewModel: (data) => ( this.props.user.logged ? <ViewModel3D id={data.match.params.id}/> : <Redirect to="/login"/> ),
        Revisions: (data) => ( this.props.user.logged ? <Revisions/> : <Redirect to="/login"/> ),
        Error: (data) => ( this.props.user.logged ? <ErrorPage type={data.props.type}/> : <Redirect to="/login"/>)
        //Add more routes here
    }
}

