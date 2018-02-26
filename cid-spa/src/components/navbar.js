import React, { Component } from 'react'
import { Menu, Input } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

export class Navbar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
        <div>
            <Menu size="large" color="blue" pointing secondary style={{ paddingLeft: '20%', paddingRight: '20%'}} stackable>
            <Menu.Item>
                <img src='/img/logo.png' alt="logo"/>
            </Menu.Item>
            <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Item as={Link} to="/trending" name='trending' active={activeItem === 'trending'} onClick={this.handleItemClick} />
            <Menu.Item as={Link} to="/user/id" name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick} />
            <Menu.Item name="search" position="right" style={{ width: '50%', height: "80%"}}>
                <Input disabled icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item as={Link} to="/logout" name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
            </Menu.Menu>
            </Menu>
        </div>
        )
    }
}