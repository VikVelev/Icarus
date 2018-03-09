import React, { Component } from 'react'
import { Segment, Modal, Header, Image } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { addCommit } from '../../actions/profileActions.js'
//Lets try the new syntax
@connect((store) => {
    return {
        user: store.userManager
    }
})
class AddCommit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initialCommit: false,
            title: "",
            description: "",
            initialCommitObj: {
                title: "Initial commit.",
                belongs_to_model: "",
                new_version: "",
                details: "Initial commit.",
            }
        }
    }
    
    handleChange = (e, { name, value }) => {
        if(name === "initialCommit") {
            this.setState({ initialCommit: !this.state.initialCommit })
        } else {
            this.setState({ [name]: value })
        }
	}

    handleSubmit = (e) => {
        console.log("Submitting", this, e)      
        let formDataCommit = {}

        if (this.state.initialCommit) {
            formDataCommit = new FormData();        

            formDataCommit.append( "title", "Initial commit." )
            formDataCommit.append( "new_version", document.getElementById("file-upload").files[0] )
            formDataCommit.append( "details", "Initial commit" )
        }

        console.log(this.props.user.currentlyLoggedUser.username.token)
        this.props.dispatch(addCommit())
    }

    render() {
        return (
            <Modal className="addCommitModal" trigger={this.props.trigger} dimmer="blurring" closeIcon>
                <Modal.Header>Add a commit</Modal.Header>
                <Modal.Content>
                    
                </Modal.Content>
            </Modal>
        )
    }
}

export default AddCommit