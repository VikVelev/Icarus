import React, { Component } from 'react'
import { Segment, Header, Form, /*Message,*/ Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { addPost } from '../../../actions/profileActions.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class AddPost extends Component{
    constructor(props) {
        super(props)
        this.state = {
            posted_by: this.props.user.currentlyLoggedUser.username.id,
            title: "",
            image:"",
            description: "",
            content: undefined,
            is_relevant: true,
            is_recent: true,
        }
    }  

    handleErrors(type) {
        if (this.props.profile.error.data !== undefined) {
            if (this.props.profile.error.data[type] !== undefined) {
                return (
                    <Message attached="bottom" color="red">
                        {this.props.profile.error.data[type]}
                    </Message>
                )
            }
        }
	}
    
    handleChange = (e, { name, value }) => {
        
        if (name === "content") {
            value = parseInt(value.replace(/[^\d]/,''), 10)
        }
        
        this.setState({ [name]: value })
	}

    handleSubmit = () => {
        
        let formData = new FormData()
        formData.append("posted_by", this.state.posted_by)
        formData.append("title", this.state.title)

        if ( document.getElementById("file-upload").files[0] !== undefined ) {
            formData.append("image", document.getElementById("file-upload").files[0])               
        } else {
            formData.append("image", null)                   
        }

        formData.append("description", this.state.description)
        formData.append("content", this.state.content)
        formData.append("is_relevant", this.state.is_relevant)
        formData.append("is_recent", this.state.is_recent)                                

        this.props.dispatch(addPost(this.props.user.currentlyLoggedUser.username.id, formData, this.props.user.currentlyLoggedUser.username.token))
    }

    render(){
        return (
            <Segment className="addPostContainer profileSettingsForm">
            <Header size="huge">Add post</Header>
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
                        <Header>Select a 3D Model:</Header>                    
                        
                        <Form.Input
                            placeholder='Write your ID'
                            value={this.state.content}
                            onChange={this.handleChange}
                            error={this.handleErrors("content") ? true : false}                            
                            type="text"
                            name="content"
                        />
                        {this.handleErrors("content")}
                        
                        <Message color="blue">You must type your model's id. Only numbers allowed.</Message>

                        <Header>Select a thumbnail:</Header>                                                
                        <label htmlFor="file-upload" className="file-upload">
                            Upload picture
                        </label>                
                        <label className="selected_model">
                            { document.getElementById("file-upload") ? document.getElementById("file-upload").files[0] ? document.getElementById("file-upload").files[0].name : null : null}
                        </label>
                        <Form.Input id="file-upload" name="image" onChange={this.handleChange} type="file"/>
                        {this.handleErrors("image")}


                        <Header>Description:</Header>  

                        <Form.Input 
                            type="text"
                            name="description" 
                            value={this.state.description}
                            onChange={this.handleChange}
                            error={this.handleErrors("description") ? true : false}                            
                            id="description"
                            rows='5' 
                            cols='50' 
                            placeholder="Write a description"/>
                    </Segment>
                    {this.handleErrors("description")}
                    
                    {this.props.profile.fetching ? <Message info > Processing... </Message> : null }                       
                    {this.props.profile.postFetched ? <Message color="green" > Successfully added a new commit. </Message> : null }

                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>Add post</Button>
                </Form>
            </Segment>
        )
    }
}