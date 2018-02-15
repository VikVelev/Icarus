import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
                        <a href="#home">CiD</a>
                    </Navbar.Brand>
                </Navbar.Header>

                <Nav>
                    <NavItem eventKey={1} href="#home">
                        Home
                    </NavItem>

                    <NavItem eventKey={2} href="#posts">
                        Wall
                    </NavItem>

                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>

                </Nav>

                <Nav pullRight>

                    <NavItem eventKey={1} href="#">
                        Sign in
                    </NavItem>

                    <NavItem eventKey={2} href="#">
                        Register
                    </NavItem>

                </Nav>

            </Navbar>
        );
    }
}
