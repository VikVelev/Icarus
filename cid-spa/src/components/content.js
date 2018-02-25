import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './templates/homePage.js';
import RelatedPage from './templates/feed.js';
import Authentication from './templates/userAuth.js';

export default class Content extends Component {
    render(){
        return(
            <div className="content">
                <Switch>
                    <Route exact path="/" component={routes.Home} />
                    <Route exact path="/posts" component={routes.Posts} />
                    <Route exact path="/trending" component={routes.Trending} />
                    <Route exact path="/login" component={routes.Login} />                    
                </Switch>
            </div>
        );
    }
}

const routes = {
    Home: () => <HomePage/>,
    Posts: () => <RelatedPage/>,
    Trending: () => <div>test</div>,
    Login: () => <Authentication/>
    //Add more routes here
}