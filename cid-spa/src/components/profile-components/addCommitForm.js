import React, { Component } from 'react'
import { Segment, Modal, Header, Form, Message, Button } from 'semantic-ui-react'
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

    handleErrors(type) {
        if (this.props.profile.error.response) {
            if (this.props.profile.error.response.data[type] !== undefined) {
                return (
                    <Message attached="bottom" color="red">
                        {this.props.profile.error.response.data[type]}
                    </Message>
                )
            }
        }
	}

    handleSubmit = (e) => {  

        let formDataCommit = new FormData();        

        formDataCommit.append( "title", this.state.title )
        formDataCommit.append( "belongs_to_model", this.props.id)
        formDataCommit.append( "new_version", document.getElementById("file-upload").files[0] )
        console.log(document.getElementById("textures-upload").files[0])

        if (document.getElementById("textures-upload").files[0] !== undefined ) {
            formDataCommit.append( "new_textures", document.getElementById("textures-upload").files[0] )        
        } else {
            formDataCommit.append( "new_textures", null )               
        }

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
                                error={this.handleErrors("title") ? true : false}
                            />
                            {this.handleErrors("title")}

                            <Header>Description:</Header>  

                            <Form.Input 
                                type="text"
                                name="details" 
                                value={this.state.details}
                                error={this.handleErrors("details") ? true : false}
                                onChange={this.handleChange}
                                id="details"
                                rows='5' 
                                cols='50' 
                                placeholder="Write a description"/>

                            {this.handleErrors("details")}                 
                            {/* TODO: Create a component for upload button.*/}
                            <Header>Select a new model</Header>
                            <label htmlFor="file-upload" className="file-upload">
                                Choose a new model
                            </label>
                            <label className="selected_model">
                                { document.getElementById("file-upload") ? document.getElementById("file-upload").files[0] ? document.getElementById("file-upload").files[0].name : null : null}
                            </label>
                            <Form.Input type="file" id="file-upload" name="thumbnail" onChange={this.handleChange} accept=".obj" />
                            {this.handleErrors("new_version")}

                            <Header>Select new textures</Header>
                            <label htmlFor="textures-upload" className="file-upload">
                                Choose new textures
                            </label>
                            <label className="selected_model">
                                { document.getElementById("textures-upload") ? document.getElementById("textures-upload").files[0] ? document.getElementById("textures-upload").files[0].name : null : null}
                            </label>
                            <Form.Input type="file" id="textures-upload" name="thumbnail" onChange={this.handleChange} accept=".obj" />
                            {this.handleErrors("new_textures")}               
                            
                            <Message color="yellow">Currently supporting only .obj models.</Message>

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