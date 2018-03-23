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
                new_version: undefined,
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
    
    handleCommitErrors(type) {

        if (this.props.profile.commitError !== {}) {
            if (this.props.profile.commitError.response !== undefined) {            
                if (this.props.profile.commitError.response.data[type] !== undefined) {
                    return (
                        <Message attached="bottom" color="red">
                            {this.props.profile.commitError.response.data[type]}
                        </Message>
                    )
                }
            }
        }
	}

    handleSubmit = (e) => {
        
        const formDataModel = new FormData();

        formDataModel.append("title",this.state.title)
        formDataModel.append("description",this.state.description)        
        
        let formDataCommit = {}

        if (this.state.initialCommit) {
            formDataCommit = new FormData();        

            formDataCommit.append( "title", "Initial commit." )
            formDataCommit.append( "new_version", document.getElementById("file-upload").files[0] )
            formDataCommit.append( "new_textures", document.getElementById("textures-upload").files[0] )
            formDataCommit.append( "details", "Initial commit" )
        }

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
                            error={this.handleErrors("title") ? true : false}                            
                            type="text"
                            name="title"
                        />

                        {this.handleErrors("title")}

                        <Header>Description:</Header>  

                        <Form.Input 
                            type="text"
                            name="description" 
                            value={this.state.description}
                            onChange={this.handleChange}
                            id="description"
                            error={this.handleErrors("description") ? true : false}
                            rows='5' 
                            cols='50' 
                            placeholder="Write a description"/>

                        {this.handleErrors("description")}                        
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

                                <label className="selected_model">
                                        { document.getElementById("file-upload") ? document.getElementById("file-upload").files[0] ? document.getElementById("file-upload").files[0].name : null : null}
                                </label>

                                <Form.Input type="file" 
                                            id="file-upload"
                                            name=""
                                            onChange={this.handleChange} 
                                            accept=".obj"  />

                                {this.handleCommitErrors("new_version")}              
                                        
                                <Header>Select textures</Header>
                                <label htmlFor="textures-upload" className="file-upload">
                                    Choose textures
                                </label>

                                <label className="selected_model">
                                        { document.getElementById("textures-upload") ? document.getElementById("textures-upload").files[0] ? document.getElementById("textures-upload").files[0].name : null : null}
                                </label>
                                                
                                <Form.Input type="file" id="textures-upload" name="textures" onChange={this.handleChange} accept=".mtl"  />
                                
                                {this.handleCommitErrors("new_textures")}                                
                                
                                <Message color="yellow">Currently supporting only .obj models and .mtl textures.</Message>
                            </div>
                        
                        : null}
                        </div>

                        {this.props.profile.fetching ? <Message info > Processing... </Message> : null }                        
                        {/*TODO VALIDATION*/}
                    </Segment>
                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>Create</Button>
                </Form>
            </Segment>
        )
    }
}