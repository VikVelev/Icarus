import React, { Component } from 'react'
import { Menu, Image, Dropdown } from 'semantic-ui-react'

import { Link, Redirect } from 'react-router-dom'
//import Logout from './sub-components/logout.js'
import { connect } from 'react-redux';

import { changePages } from '../actions/pageActions'
import { logout } from '../actions/userActions'

@connect((store) => {
    return {
        manage: store.userManagement,
        currentPage: store.pageManagement.currentPage
    }
})
export class Navbar extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            profile: false,
            settings: false,
        }
    }

    handleItemClick = (e, { name }) => this.props.dispatch(changePages(name))

    handleProfileClick = (e) => {
        this.setState({ profile: true })
    }

    handleSettingsClick = (e) => {
        this.setState({ settings: true })
    }
    
    handleLogout() {
        this.props.dispatch(logout())
    }

    handleProfileCallback () {
        this.setState({ profile: false })                
        return (
            <Redirect to="/profile"/>
        )
    }

    handleSettingsCallback () {
        this.setState({ settings: false })                
        return (
            <Redirect to="/profile/settings"/>
        )
    }

    handleProfile() {
        const trigger = (
            <span id="loggedInUser">
                <Image avatar src="/img/default.jpg"/>  {this.props.manage.currentlyLoggedUser.username.username}
            </span>
          )
          
          const options = [
            { key: 'user', text: 'Profile', icon: 'user', onClick: this.handleProfileClick },
            { key: 'settings', text: 'Settings', icon: 'settings', onClick: this.handleSettingsClick },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: this.handleLogout.bind(this) },
          ]
          
        
        return (  
            <Menu.Item id="profileBadge">
                <Dropdown trigger={trigger} pointing options={options} />
            </Menu.Item>
        )
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
                    to="/create-post"
                    icon="write"
                    name='create_post'
                    active={this.props.currentPage === 'create_post'} 
                    onClick={this.handleItemClick}/>

                <Menu.Item 
                    as={Link} 
                    to="/create-model"
                    icon="world"
                    name='create_model'
                    active={this.props.currentPage === 'create_model'} 
                    onClick={this.handleItemClick}/>

                {/* <Menu.Item name="search" position="right" style={{ width: '40%', height: "80%"}}>
                    <Input disabled icon='search' placeholder='Search...' />
                </Menu.Item> */}
                
                <Menu.Menu position='right'>
                    {this.handleProfile()}
                </Menu.Menu>
            </Menu>

            { this.state.profile ? this.handleProfileCallback() : null }
            { this.state.settings ? this.handleSettingsCallback() : null }            

        </div>
        )
    }
}