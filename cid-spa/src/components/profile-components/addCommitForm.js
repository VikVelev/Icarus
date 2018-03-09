import React, { Component } from 'react'
import { Segment, Modal, Header, Image, Form, Message, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { addCommit } from '../../actions/profileActions.js'
//Lets try the new syntax
@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class AddCommit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            belongs_to_model: this.props.id,
            new_version: "",
            details: "",
        }
    }
    
    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
	}

    handleSubmit = (e) => {
        console.log("Submitting", this.props.user)  

        let formDataCommit = new FormData();        

        formDataCommit.append( "title", this.state.title )
        formDataCommit.append( "belongs_to_model", this.props.id)
        formDataCommit.append( "new_version", document.getElementById("file-upload").files[0] )
        formDataCommit.append( "details", this.state.details )

        this.props.dispatch(addCommit(this.props.user.currentlyLoggedUser.username.id, formDataCommit, this.props.user.currentlyLoggedUser.username.token))
    }

    render() {
        return (
            <Modal className="addCommitModal" trigger={this.props.trigger} dimmer="blurring" closeIcon>
                <Modal.Header>Add a commit</Modal.Header>
                <Modal.Content>
                <Segment className="profileSettingsForm">
                    <Form size='large' name="add_model" onSubmit={this.handleSubmit.bind(this)}>
                        <Segment stacked>
                            <Header>Title:</Header>
                            
                            <Form.Input
                                placeholder='Write a title'
                                value={this.state.title}
                                onChange={this.handleChange}
                                type="text"
                                name="title"
                            />

                            <Header>Description:</Header>  

                            <Form.Input 
                                type="text"
                                name="details" 
                                value={this.state.details}
                                onChange={this.handleChange}
                                id="details"
                                rows='5' 
                                cols='50' 
                                placeholder="Write a description"/>

                                    <Header>Select a model</Header>
                                    <label htmlFor="file-upload" className="file-upload">
                                        Choose a model
                                    </label>
                                    <Form.Input type="file" id="file-upload" name="thumbnail" onChange={this.handleChange} accept=".obj" />
                                    <Message color="yellow">Currently supporting only .obj models.</Message>

                            {this.props.profile.error.response !== undefined ? <Message color="red" > Error </Message> : null }
                            {this.props.profile.fetching ? <Message info > Uploading model... </Message> : null }                            
                            {this.props.profile.commitFetched ? <Message color="green" > Successfully added a new commit. </Message> : null }
                            
                        </Segment>
                        <Button className="submitButton" type='submit 'color='blue' fluid size='large'>Commit</Button>
                    </Form>
                </Segment>
            </Modal.Content>
        </Modal>
        )
    }
}