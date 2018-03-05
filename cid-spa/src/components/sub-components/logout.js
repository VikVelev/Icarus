import React, { Component } from 'react'
import { Header, Modal, Button, Icon } from 'semantic-ui-react'

import { connect } from 'react-redux';

import { logout } from '../../actions/userManagementActions.js'

@connect((store) => {
    return {
        user: store.userManagement
    }
})
export default class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleLogout() {
        this.props.dispatch(logout())
    }

    handleTrigger() {
        this.setState({ open: !this.state.open })
    }

    render() {
        return(
            <Modal open={this.state.open} OnTriggerClick={this.handleTrigger} trigger={this.props.trigger} basic size='small' >
                <Header icon='log out' content='Are you sure you want to log out?' />
                <Modal.Actions>
                    <Button color='green' inverted>
                        <Icon name='checkmark' onClick={this.handleLogout.bind(this)}/> Yes
                    </Button>
                    <Button basic color='red' inverted toggle onClick={this.handleLogout}>
                        <Icon name='remove'/> No
                    </Button>
                </Modal.Actions>
          </Modal>
        )
    }
}