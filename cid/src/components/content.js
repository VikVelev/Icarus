import React, { Component } from 'react';
import HomePage from './templates/homePage.js'

export default class Content extends Component {
    render(){
        return(
            <div className="content">
                <HomePage/>
            </div>
        );
    }
}