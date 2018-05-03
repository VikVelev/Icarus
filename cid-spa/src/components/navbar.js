import React, { Component } from 'react'
import { Menu, Image, Dropdown } from 'semantic-ui-react'

import { Link, Redirect } from 'react-router-dom'
//import Logout from './sub-components/logout.js'
import { connect } from 'react-redux';

import { changePages } from '../actions/pageActions'
import { logout, fetchAllUsers } from '../actions/userActions'
import { fetchAll3DModels } from '../actions/profileActions'

import SearchBar from './searchBar.js'

@connect((store) => {
    return {
        manage: store.userManagement,
        currentPage: store.pageManagement.currentPage,
        profile: store.profileManagement,
    }
})
export class Navbar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            profile: false,
            revisions: false,
            settings: false,
        }

        props.dispatch(fetchAllUsers(props.manage.currentlyLoggedUser.username.token))
        props.dispatch(fetchAll3DModels(props.manage.currentlyLoggedUser.username.token))

        // fetch all users and all models
        // TODO: try to optimize this
    }

    handleItemClick = (e, { name }) => this.props.dispatch(changePages(name))

    handleProfileClick = (e) => {
        this.setState({ profile: true })
    }

    handleSettingsClick = (e) => {
        this.setState({ settings: true })
    }

    handleNotificationsClick = (e) => {
        this.setState({ revisions: true })
    }
    
    handleLogout() {
        this.props.dispatch(logout())
    }

    handleProfileCallback () {
        //Warnings here because philosophy of React that I don't seem to grasp.
        this.setState({ profile: false })
        this.props.dispatch(changePages("profile"))

        return (
            <Redirect to="/profile"/>
        )
    }

    handleSettingsCallback () {
        //Warnings here because philosophy of React that I don't seem to grasp.
        this.setState({ settings: false })

        this.props.dispatch(changePages("profile/settings"))
        
        return (
            <Redirect to="/profile/settings"/>
        )
    }

    handleNotificationsCallback () {

        this.setState({ revisions: false })
        this.props.dispatch(changePages("revisions"))

        return (
            <Redirect to="/revisions"/>
        )
    }

    handleProfile() {
        const trigger = (
            <span>
                <Image avatar src="/img/default.png"/>  
                <b id="loggedInUser">
                    {this.props.manage.currentlyLoggedUser.username.username}
                </b>
            </span>
          )
          
          const options = [
            { key: 'user', text: 'Profile', icon: 'user', onClick: this.handleProfileClick },
            { key: 'notifications', text: 'Revisions', icon: 'tasks', onClick: this.handleNotificationsClick },
            { key: 'settings', text: 'Settings', icon: 'settings', onClick: this.handleSettingsClick },
            { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: this.handleLogout.bind(this) },
          ]     
        
        return (  
            <Menu.Item id="profileBadge" 
                active={this.props.currentPage === "profile/settings" 
                        || this.props.currentPage === "profile"
                        || this.props.currentPage === "revisions" }>
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
                    name='create-post'
                    active={this.props.currentPage === 'create-post'} 
                    onClick={this.handleItemClick}/>
                
                <Menu.Item 
                    as={Link} 
                    to="/create-model"
                    icon="world"
                    name='create-model'
                    active={this.props.currentPage === 'create-model'} 
                    onClick={this.handleItemClick}/>
                
                { 
                    (this.props.manage.allUsers.length > 0 || this.props.profile.allModels.length > 0) 
                    && this.props.profile.fetched 
                    && this.props.manage.fetched ?
                    <Menu.Item name="search" position="right" style={{ width: '40%', height: "80%", padding: "3px"}}>
                        {console.log()/*MYSTERY: I honestly have no Idea, but when this console.log is removed, the searchbar breaks*/}
                        <SearchBar models={this.props.profile.allModels} users={this.props.manage.allUsers}/>                 
                    </Menu.Item>
                    :  
                    <Menu.Item name="search" position="right" style={{ width: '40%', height: "80%", padding: "3px"}}>
                        <SearchBar models={[]} users={[]} isFetching={true}/>                 
                    </Menu.Item>
                }

                <Menu.Menu position='right'>
                    {this.handleProfile()}
                </Menu.Menu>
            </Menu>

            { this.state.profile ? this.handleProfileCallback() : null }
            { this.state.settings ? this.handleSettingsCallback() : null }
            { this.state.revisions ? this.handleNotificationsCallback() : null }                   

        </div>
        )
    }
}