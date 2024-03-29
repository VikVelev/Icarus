import React, { Component } from 'react'
import { Segment, Header, Form, Message, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { add3DModel } from '../../../actions/profileActions.js'

import Loading from 'react-loading-animation'
import lang from '../../../lang.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        lang: store.langManagement.lang,
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
            
            if(document.getElementById("textures-upload").files[0]) {
                formDataCommit.append( "new_textures", document.getElementById("textures-upload").files[0] )
            } else {
                formDataCommit.append( "new_textures", "")
            }

            formDataCommit.append( "details", "Initial commit" )
        }

        this.props.dispatch(
            add3DModel(
                this.props.user.currentlyLoggedUser.username.id, 
                this.props.user.currentlyLoggedUser.username.token,
                formDataModel,
                this.state.initialCommit,
                formDataCommit,
            )
        )
    }

    render(){
        let text = lang[this.props.lang].createModel
        return (
            <Segment className="addPostContainer profileSettingsForm">
            <Header size="huge">{text.header}</Header>
            <Message info>{text.createInfo}</Message>
                <Form size='large' name="add_model" onSubmit={this.handleSubmit}>
                    <Segment stacked>
                        <Header>{text.title}:</Header>
                        
                        <Form.Input
                            placeholder={text.title_p}
                            value={this.state.title}
                            onChange={this.handleChange}
                            error={this.handleErrors("title") ? true : false}                            
                            type="text"
                            name="title"
                        />

                        {this.handleErrors("title")}

                        <Header>{text.desc}:</Header>  

                        <Form.Input 
                            type="text"
                            name="description" 
                            value={this.state.description}
                            onChange={this.handleChange}
                            id="description"
                            error={this.handleErrors("description") ? true : false}
                            rows='5' 
                            cols='50' 
                            placeholder={text.desc_p}/>

                        {this.handleErrors("description")}                        
                        <div>
                        <Form.Checkbox 
                            name="initialCommit"
                            onChange={this.handleChange}
                            id="initialCommitCheckbox" 
                            label={text.initCommitCheck}
                        />
                        
                        <Message info>{text.initCommitInfo}</Message>                       
                        {this.state.initialCommit ?
                            <div className="initialCommmit">
                                <Header size="huge">{text.initCommit.header}</Header> 
                                <Header>{text.initCommit.selectModel}</Header>
                                <label htmlFor="file-upload" className="file-upload">
                                    {text.initCommit.b_selectModel}
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
                                        
                                <Header>{text.initCommit.selectTex}</Header>
                                <label htmlFor="textures-upload" className="file-upload">
                                    {text.initCommit.b_selectTex}
                                </label>

                                <label className="selected_model">
                                        { document.getElementById("textures-upload") ? document.getElementById("textures-upload").files[0] ? document.getElementById("textures-upload").files[0].name : null : null}
                                </label>
                                                
                                <Form.Input type="file" id="textures-upload" name="textures" onChange={this.handleChange} accept=".mtl"  />
                                
                                {this.handleCommitErrors("new_textures")}                                
                                
                                <Message color="yellow">{text.initCommit.initCommitWarn}</Message>
                            </div>
                        
                        : null}
                        </div>
                        {this.handleCommitErrors("error")}                        
                        {this.props.profile.fetching ? 
                        <Message info className="processing">
                            <Loading style={{width: '50px', margin: 'unset'}}/> <p style={{marginLeft: '20px'}}>Processing...</p>
                        </Message> : null }       
                        {this.props.profile.modelFetched ? 
                        <Message color="green">
                            {text.success}
                        </Message> : null }                   

                    </Segment>
                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>{text.b_create}</Button>
                </Form>
            </Segment>
        )
    }
}