import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
//import { LinkContainer } from 'react-router-bootstrap';

import Content from './content.js';

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
                    {/*Navbar*/}
                    <Content/>
                </div>
            </Router>
        );
    }
}