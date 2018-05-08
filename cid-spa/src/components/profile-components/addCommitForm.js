import React, { Component } from 'react'
import { Segment, Modal, Header, Form, Message, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { addCommit } from '../../actions/profileActions.js'

import Loading from 'react-loading-animation'
import lang from '../../lang.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        lang: store.langManagement.lang,
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

        if (this.props.profile.commitError.response) {
            if (this.props.profile.commitError.response.data[type] !== undefined) {
                return (
                    <Message attached="bottom" color="red">
                        {this.props.profile.commitError.response.data[type]}
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

        if (document.getElementById("textures-upload").files[0] !== undefined ) {
            formDataCommit.append( "new_textures", document.getElementById("textures-upload").files[0] )        
        } else {
            formDataCommit.append( "new_textures", null )               
        }

        formDataCommit.append( "details", this.state.details )

        this.props.dispatch(
            addCommit(
                this.props.user.currentlyLoggedUser.username.id, 
                formDataCommit,
                this.props.user.currentlyLoggedUser.username.token
            )
        )
    }

    render() {
        let text = lang[this.props.lang].addCommit
        return (
            <Modal className="addCommitModal" trigger={this.props.trigger} dimmer="blurring" closeIcon>
                <Modal.Header>{text.header}</Modal.Header>
                <Modal.Content>
                <Segment className="profileSettingsForm">
                    <Form size='large' name="add_model" onSubmit={this.handleSubmit.bind(this)}>
                        <Segment stacked>
                            <Header>{text.title}:</Header>
                            
                            <Form.Input
                                placeholder={text.title_p}
                                value={this.state.title}
                                onChange={this.handleChange}
                                type="text"
                                name="title"
                                error={this.handleErrors("title") ? true : false}
                            />
                            {this.handleErrors("title")}

                            <Header>{text.desc}:</Header>  

                            <Form.Input 
                                type="text"
                                name="details"
                                value={this.state.details}
                                error={this.handleErrors("details") ? true : false}
                                onChange={this.handleChange}
                                id="details"
                                rows='5' 
                                cols='50' 
                                placeholder={text.desc_p}/>

                            {this.handleErrors("details")}                 
                            {/* TODO: Create a component for upload button.*/}
                            <Header>{text.selectModel}</Header>
                            <label htmlFor="file-upload" className="file-upload">
                                {text.b_selectModel}
                            </label>
                            <label className="selected_model">
                                { document.getElementById("file-upload") ? document.getElementById("file-upload").files[0] ? document.getElementById("file-upload").files[0].name : null : null}
                            </label>
                            <Form.Input type="file" id="file-upload" name="thumbnail" onChange={this.handleChange} accept=".obj" />
                            {this.handleErrors("new_version")}

                            <Header>{text.selectTex}</Header>
                            <label htmlFor="textures-upload" className="file-upload">
                                {text.b_selectTex}
                            </label>
                            <label className="selected_model">
                                { document.getElementById("textures-upload") ? document.getElementById("textures-upload").files[0] ? document.getElementById("textures-upload").files[0].name : null : null}
                            </label>
                            <Form.Input type="file" id="textures-upload" name="thumbnail" onChange={this.handleChange} accept=".mtl" />
                            {this.handleErrors("new_textures")}               
                            
                            <Message color="yellow">{text.supportWarn}</Message>

                            {
                                this.props.profile.fetching ? 
                                    <Message info className="processing">
                                        <Loading style={{width: '50px', margin: 'unset'}}/> <p style={{marginLeft: '20px'}}>{text.processing}</p>
                                    </Message>
                                : null
                            }
                            {this.props.profile.commitFetched ? <Message color="green" > {text.success} </Message> : null }
                            {this.handleErrors("error")}                                      
                        </Segment>
                        <Button className="submitButton" type='submit 'color='blue' fluid size='large'>{text.b_commit}</Button>
                    </Form>
                </Segment>
            </Modal.Content>
        </Modal>
        )
    }
}