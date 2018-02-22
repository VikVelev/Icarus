import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

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
                    <Navbar>

                        <Navbar.Header>

                            <Navbar.Brand>
                                <LinkContainer to="/">
                                    <a>CiD</a> 
                                </LinkContainer>
                            </Navbar.Brand>

                        </Navbar.Header>

                        <Nav>

                            <LinkContainer to="/posts">
                                <NavItem>Posts</NavItem>
                            </LinkContainer>

                            <LinkContainer to="/trending">
                                <NavItem>Trending</NavItem>
                            </LinkContainer>

                        </Nav>
                        
                        <Nav pullRight>

                            <LinkContainer to="/login#login">
                                <NavItem>Log in</NavItem>
                            </LinkContainer>

                            <LinkContainer to="/login#register">
                                <NavItem>Register</NavItem>
                            </LinkContainer>

                        </Nav>

                    </Navbar>

                    <Content/>
                </div>
            </Router>
        );
    }
}