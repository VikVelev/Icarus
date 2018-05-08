import React, { Component } from 'react'
import { Menu, Image, Dropdown, Flag } from 'semantic-ui-react'

import { Link, Redirect } from 'react-router-dom'
//import Logout from './sub-components/logout.js'
import { connect } from 'react-redux';

import { changePages } from '../actions/pageActions'
import { logout, fetchAllUsers } from '../actions/userActions'
import { fetchAll3DModels } from '../actions/profileActions'

import SearchBar from './searchBar.js'

import lang from '../lang.js'
@connect((store) => {
    return {
        manage: store.userManagement,
        currentPage: store.pageManagement.currentPage,
        profile: store.profileManagement,
        lang: store.langManagement.lang,
    }
})
export class Navbar extends Component {

    constructor(props) {
        super(props)
        props.dispatch(fetchAllUsers(props.manage.currentlyLoggedUser.username.token))
        props.dispatch(fetchAll3DModels(props.manage.currentlyLoggedUser.username.token))

        this.state = {
            value: this.props.lang,
        }
    }

    langOptions = [
        { key: "bg", name: "bg", flag: "bg", value: "bg" },
        { key: "en", name: "en", flag: "us", value: "en" },        
    ]

    handleItemClick = (e, { name }) => this.props.dispatch(changePages(name))
    
    handleLogout() {
        this.props.dispatch(logout())
    }

    handleChange = (e, { value }) => {
        this.setState({ value })
        this.props.dispatch({
            type: "CHANGE_LANG",
            payload: value
        })
    }

    handleProfile(text) {
        text = text.user

        const trigger = (
            <span>
                <Image avatar src="/img/default.png"/>  
                <b id="loggedInUser">
                    {this.props.manage.currentlyLoggedUser.username.username}
                </b>
            </span>
          )

          const options = [
            { key: 'user', name: 'profile', content: text.profile, as: Link, to:"/profile", text: 'Profile', icon: 'user', onClick: this.handleItemClick },
            { key: 'notifications', name: 'revisions', content: text.revisions, as: Link, to:"/revisions", text: 'Revisions', icon: 'tasks', onClick: this.handleItemClick },
            { key: 'create-post', name: 'create-post', content: text.createPost, as: Link, to:"/create-post", text: 'Create Post', icon: 'write', onClick: this.handleItemClick },
            { key: 'create-model', name: 'create-model', content: text.createModel, as: Link, to:"/create-model", text: 'Create Model', icon: 'world', onClick: this.handleItemClick },                                
            { key: 'settings', name: 'profile/settings', content: text.settings, as: Link, to:"/profile/settings", text: 'Settings', icon: 'settings', onClick: this.handleItemClick },
            { key: 'sign-out', name: 'sign-out', content: text.signOut, text: 'Sign Out', icon: 'sign out', onClick: this.handleLogout.bind(this) },
          ]     
        
        return (  
            <Menu.Item id="profileBadge" 
                       active={this.props.currentPage === "profile/settings" 
                        || this.props.currentPage === "profile"
                        || this.props.currentPage === "revisions"
                        || this.props.currentPage === "create-post"
                        || this.props.currentPage === "create-model" }>
                <Dropdown trigger={trigger} pointing options={options} />
            </Menu.Item>
        )
    }
    
    render() {
        let text = lang[this.props.lang].mainNavbar

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
                        content={text.home}
                        active={this.props.currentPage === 'home'} 
                        onClick={this.handleItemClick} />
                        
                <Menu.Item 
                    as={Link} 
                    to="/trending" 
                    name='trending'
                    content={text.trending}
                    active={this.props.currentPage === 'trending'} 
                    onClick={this.handleItemClick} />

                { 
                    (this.props.manage.allUsers.length > 0 || this.props.profile.allModels.length > 0) 
                    && this.props.profile.fetched 
                    && this.props.manage.fetched ?
                    <Menu.Item name="search" 
                               position="right" 
                               style={{ width: '40%', height: "80%", padding: "3px"}}>
                        {console.log()/*MYSTERY: I honestly have no idea, but when this console.log is removed, the search bar breaks*/}
                        <SearchBar models={this.props.profile.allModels} users={this.props.manage.allUsers}/>                 
                    </Menu.Item>
                    :  
                    <Menu.Item name="search" position="right" style={{ width: '40%', height: "80%", padding: "3px"}}>
                        <SearchBar models={[]} users={[]} isFetching={true}/>                 
                    </Menu.Item>
                }

                <Menu.Menu position='right'>
                    {this.handleProfile(text)}
                    <Menu.Item className="langSwitcher">
                        <Dropdown compact icon={<Flag name={this.state.value === "en" ? "us" : "bg" }/>} value={this.state.value} selection onChange={this.handleChange} options={this.langOptions}/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
        )
    }
}