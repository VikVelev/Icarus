import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Navbar } from './navbar.js'

import HomePage from './sub-components/pages/homePage.js';
import Feed from './sub-components/pages/homeFeed.js';
import TrendingFeed from './sub-components/pages/trendingFeed.js';

import Profile from './sub-components/pages/profilePage.js'
import ProfileSettings from './profile-components/profileSettings.js'
import AddPost from './sub-components/pages/addPostForm.js'
import Add3DModel from './sub-components/pages/add3DModelForm.js'
import ViewModel3D from './sub-components/pages/viewModel3D.js'

import{ LoginForm } from './sub-components/pages/loginForm.js';
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
                        
                        <Route exact path="/create-post" component={this.routes.CreatePost} />                        
                        <Route exact path="/create-model" component={this.routes.Upload} />

                        <Route exact path="/profile" component={this.routes.MyProfile} />                        
                        <Route exact path="/profile/:id" component={this.routes.UserProfile} />
                        <Route exact path="/profile/settings" component={this.routes.ProfileSettings} />

                        <Route exact path="/model/:id" component={this.routes.ViewModel}/>
                    </Switch>
                </div>
            </Router>
        );
    }

    routes = {
        Home: () => ( this.props.user.logged ? <Feed/> : <HomePage/> ),
        Login: () =>  ( this.props.user.logged ? <Redirect to="/"/> : <LoginForm/> ),
        SignUp: () => ( this.props.user.logged ? <Redirect to="/"/> : <RegisterForm/> ),
        Trending: () => ( this.props.user.logged ? <TrendingFeed/> : <Redirect to="login"/> ),
        MyProfile: () => ( this.props.user.logged ? <Profile/> : <Redirect to="login"/> ),
        UserProfile: () => ( this.props.user.logged ? <Profile/> : <Redirect to="login"/> ),        
        ProfileSettings: () => ( this.props.user.logged ? <ProfileSettings/> : <Redirect to="login"/> ),
        Upload: () => ( this.props.user.logged ? <Add3DModel/> : <Redirect to="login"/> ),
        CreatePost: () => ( this.props.user.logged ? <AddPost/> : <Redirect to="login"/> ),
        ViewModel: (data) => ( this.props.user.logged ? <ViewModel3D id={data.match.params.id}/> : <Redirect to="login"/> ),        
        // TODO: IMPLEMENT THIS
        //Profile: () => ( loggedIn ? <Profile loggedUser={state.id}/> : <LoginForm message="You are not logged in"/> )
        
        //Add more routes here
    }
}

