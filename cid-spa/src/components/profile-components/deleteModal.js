import React, { Component } from 'react'
import { Header, Modal, Button, Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

import { deleteModel } from '../../actions/profileActions'
import { deletePost } from '../../actions/profileActions'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
    }
})
export default class DeleteModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            deleted: false
        }
    }

    handleDelete() {
        if (this.props.type === "model") {

            this.props.dispatch(deleteModel(this.props.user.currentlyLoggedUser.username.id,
                this.props.user.currentlyLoggedUser.username.token,
                this.props.id))
        
        } else if (this.props.type === "post" ) {

            this.props.dispatch(deletePost(this.props.user.currentlyLoggedUser.username.id,
                this.props.user.currentlyLoggedUser.username.token,
                this.props.id))
        }

        this.handleTrigger()
    }

    handleTrigger() {
        this.setState({ open: !this.state.open })
    }

    render() { 
        return(
            <Modal open={this.state.open} onOpen={this.handleTrigger.bind(this)} trigger={this.props.trigger} basic size='small' >
                <Header icon='trash' content='Are you sure you want to delete this?' />
                <Modal.Actions>
                    <Button color='green' inverted onClick={this.handleDelete.bind(this)}>
                        <Icon name='checkmark'/> Yes
                    </Button>
                    <Button basic color='red' inverted toggle onClick={this.handleTrigger.bind(this)}>
                        <Icon name='remove'/> No
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}