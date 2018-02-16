import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
//import { BrowserRouter, Link } from "react-router-dom";
//import { LinkContainer } from 'react-router-bootstrap';

export default class MainNavbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentPage: "",
            loggedIn: "",
        }

    }

    render(){
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                            <a href="/">CiD</a>
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    <NavItem href="/">Home</NavItem>
                    <NavItem href="/posts">Posts</NavItem>
                    <NavItem href="/trending">Trending</NavItem>
                </Nav>
                
                <Nav pullRight>
                    <NavItem href="/login#login">Log in</NavItem>
                    <NavItem href="/login#register">Register</NavItem>
                </Nav>
            </Navbar>
        );
    }
}