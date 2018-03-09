import React, { Component } from 'react'
import { Segment, Header, Form, /*Message,*/ Button, Select } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { addPost } from '../../../actions/profileActions.js'

@connect((store) => {
    return {
        user: store.userManagement
    }
})
export default class AddPost extends Component{
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
        }
    }
    
    handleChange = (e, { name, value }) => {
		this.setState({ [name]: value })
	}

    handleSubmit = () => {
        this.props.dispatch(addPost(this.state))
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
                            type="text"
                            name="title"
                        />
                        <Header>Select a 3D Model:</Header>                    
                        
                        <Select placeholder='Select a 3D Model' options={[{key: "1", value:"nc", text:"nice"}]} />
                        
                        <Header>Select a thumbnail:</Header>                                                
                        <label htmlFor="file-upload" className="file-upload">
                            Upload picture
                        </label>
                        <Form.Input id="file-upload" name="thumbnail" onChange={this.handleSubmit} type="file"/>
                        
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
                    </Segment>
                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>Add post</Button>
                </Form>
            </Segment>
        )
    }
}