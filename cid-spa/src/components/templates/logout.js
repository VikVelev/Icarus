import React, { Component } from 'react'
import { Header, Modal, Button, Icon } from 'semantic-ui-react'


export default class Logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }

    render() {
        return(
            <Modal trigger={this.props.trigger} basic size='small' >
                <Header icon='log out' content='Are you sure you want to log out?' />
                <Modal.Actions>
                    <Button color='green' inverted>
                        <Icon name='checkmark' /> Yes
                    </Button>
                    <Button basic color='red' inverted toggle >
                        <Icon name='remove' /> No
                    </Button>
                </Modal.Actions>
          </Modal>
        )
    }
}