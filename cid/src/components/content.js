import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './templates/homePage.js';
import RelatedPage from './templates/relatedPage.js';

export default class Content extends Component {
    render(){
        return(
            <div className="content">
                <Switch>
                    <Route exact path="/" component={routes.Home} />
                    <Route exact path="/posts" component={routes.Posts} />
                    <Route exact path="/trending" component={routes.Trending} />
                </Switch>
            </div>
        );
    }
}

const routes = {
    Home: () => <HomePage/>,
    Posts: () => <RelatedPage/>,
    Trending: () => <div>hi</div>
    //Add more routes here
}