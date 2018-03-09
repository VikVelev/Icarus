import React, { Component } from 'react'
import { Segment, Header, Form, Message, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { add3DModel } from '../../../actions/profileActions.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class Add3DModel extends Component{
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
        const formDataModel = new FormData();

        formDataModel.append("title",this.state.title)
        formDataModel.append("description",this.state.description)        
        
        let formDataCommit = {}

        if (this.state.initialCommit) {
            formDataCommit = new FormData();        

            formDataCommit.append( "title", "Initial commit." )
            formDataCommit.append( "new_version", document.getElementById("file-upload").files[0] )
            formDataCommit.append( "details", "Initial commit" )
        }

        console.log(this.props.user.currentlyLoggedUser.username.token)
        this.props.dispatch(add3DModel(this.props.user.currentlyLoggedUser.username.id, 
                                        this.props.user.currentlyLoggedUser.username.token,
                                        formDataModel,
                                        this.state.initialCommit,
                                        formDataCommit,
                                    ))
    }

    render(){
        return (
            <Segment className="addPostContainer profileSettingsForm">
            <Header size="huge">Create a project</Header>
            <Message info>You can create a project without uploading a model.</Message>
                <Form size='large' name="add_model" onSubmit={this.handleSubmit}>
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
                                    name="description" 
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    id="description"
                                    rows='5' 
                                    cols='50' 
                                    placeholder="Write a description"/>

                        <div>
                        <Form.Checkbox 
                            name="initialCommit"
                            onChange={this.handleChange}
                            id="initialCommitCheckbox" 
                            label="Create an initial commit."
                        />

                        <Message info>Initial commit is required if you want to upload a model.</Message>                       
                        {this.state.initialCommit ?
                            <div className="initialCommmit">
                                <Header size="huge">Initial commit</Header> 
                                <Header>Select a model</Header>
                                <label htmlFor="file-upload" className="file-upload">
                                    Choose a model
                                </label>
                                <Form.Input type="file" id="file-upload" name="thumbnail" onChange={this.handleChange} />
                                <Message color="yellow">Currently supporting only .obj models.</Message>
                            </div>
                        : null}
                        </div>
                        
                    </Segment>
                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>Create</Button>
                </Form>
            </Segment>
        )
    }
}