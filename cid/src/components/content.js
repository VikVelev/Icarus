import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './templates/homePage.js';
import RelatedPage from './templates/relatedPage.js';

export default class Content extends Component {
    render(){
        return(
        <BrowserRouter>  
            <div className="content">
                <Switch>
                    <Route exact path="/" component={routes.Home} />
                    <Route exact path="/posts" component={routes.Posts} />
                    <Route exact path="/trending" component={routes.Posts} />
                </Switch>
            </div>
        </BrowserRouter>
        );
    }
}

const routes = {
    Home: () => <HomePage/>,
    Posts: () => <RelatedPage/>,
    //Add more routes here
}