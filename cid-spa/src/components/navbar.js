import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
//import Logout from './sub-components/logout.js'
import { connect } from 'react-redux';

import { changePages } from '../actions/pageManagementActions'
import { logout } from '../actions/userManagementActions'

@connect((store) => {
    return {
        manage: store.userManagement,
        currentPage: store.pageManagement.currentPage
    }
})
export class Navbar extends Component {

    handleItemClick = (e, { name }) => this.props.dispatch(changePages(name))

    handleLogout() {
        this.props.dispatch(logout())
    }

    render() {
        return (
        <div>
            <Menu 
                size="large" 
                color="blue" 
                style={{ paddingLeft: '20%', paddingRight: '20%'}} 
                stackable 
                pointing
                secondary>

                <Menu.Item>
                    <img src='/img/logo.png' alt="logo"/>
                </Menu.Item>
                
                <Menu.Item 
                        as={Link}
                        to="/" 
                        name='home'
                        active={this.props.currentPage === 'home'} 
                        onClick={this.handleItemClick} />
                        
                <Menu.Item 
                    as={Link} 
                    to="/trending" 
                    name='trending' 
                    active={this.props.currentPage === 'trending'} 
                    onClick={this.handleItemClick} />

                <Menu.Item 
                    as={Link} 
                    to="/profile"
                    name='profile' 
                    active={this.props.currentPage === 'profile'}
                    onClick={this.handleItemClick} />

                <Menu.Item 
                    as={Link} 
                    to="/upload"
                    icon="upload"
                    name='upload'
                    active={this.props.currentPage === 'upload'} 
                    onClick={this.handleItemClick}/>

                <Menu.Item name="search" position="right" style={{ width: '40%', height: "80%"}}>
                    <Input disabled icon='search' placeholder='Search...' />
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item as={Link} onClick={this.handleLogout.bind(this)} icon="log out" to="#" name='logout' />
                </Menu.Menu>
            </Menu>
        </div>
        )
    }
}