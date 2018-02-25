import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import Content from './content.js';
//import Navbar from './navbar.js'

export default class Head extends Component {

    constructor( props ){
        super( props );

        this.state = {
            currentPage: "",
            loggedIn: "",
        }
    }

    render(){
        return(
            <Router>
                <div className="head">
                    <Content/>
                </div>
            </Router>
        );
    }
}