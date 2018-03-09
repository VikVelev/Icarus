import React, { Component } from 'react'
import { Segment, Image, Header, Icon, Form, /*Message,*/ Button, Select } from 'semantic-ui-react'

export default class AddPost extends Component{
    constructor(props) {
        super(props)
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
                            type="text"
                            name="title"
                        />
                        <Header>Select a 3D Model:</Header>                    
                        <Select placeholder='Select a 3D Model' options={[{key: "1", value:"nc", text:"nice"}]} />
                        <Header>Select a thumbnail:</Header>                                                
                        <UploadButton form="add_model"/>
                        <Header>Description:</Header>                                    
                        <textarea id="description" rows='5' cols='50' name="description" placeholder="Write a description"/>
                    </Segment>
                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>Add post</Button>
                </Form>
            </Segment>
        )
    }
}

export const UploadButton = (props) => (
    <div>
        <label htmlFor="file-upload" className="file-upload">
            <i className="fa fa-cloud-upload"></i> Upload picture
        </label>
        <input id="file-upload" type="file"/>
    </div>
)