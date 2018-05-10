import React, { Component } from 'react'
import { Segment, Header, Form, Button, Message, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { addPost, fetchAll3DModels } from '../../../actions/profileActions.js'

import Loading from 'react-loading-animation'
import lang from '../../../lang.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        lang: store.langManagement.lang,
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

    componentWillMount() {
        this.props.dispatch(
            fetchAll3DModels(this.props.user.currentlyLoggedUser.username.token)
        )
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
        this.setState({ [name]: value })
    }
    
    receiveValue(value) {
        this.setState({
            content: value
        })
    }

    handleSubmit = () => {
        
        let formData = new FormData()
        formData.append("posted_by", this.state.posted_by)
        formData.append("title", this.state.title)

        if ( document.getElementById("file-upload").files[0] !== undefined ) {
            formData.append("image", document.getElementById("file-upload").files[0])               
        } else {
            formData.append("image", "")                  
        }

        formData.append("description", this.state.description)
        formData.append("content", this.state.content)
        formData.append("is_relevant", this.state.is_relevant)
        formData.append("is_recent", this.state.is_recent)                                

        this.props.dispatch(
            addPost(
                this.props.user.currentlyLoggedUser.username.id, 
                formData, 
                this.props.user.currentlyLoggedUser.username.token
            )
        )
    }

    render(){
        let text = lang[this.props.lang].createPost
        return (
            <Segment className="addPostContainer profileSettingsForm">
            <Header size="huge">{text.header}</Header>
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
                        <Header>{text.selectModel}:</Header>                    
                        
                        { this.props.profile.allModels[0] !== undefined ? 
                            <ModelDropdown text={text} options={this.props.profile.allModels} sendValue={this.receiveValue.bind(this)}/> 
                        : <Loading/> }
                        {this.handleErrors("content")}

                        <Header>{text.selectImage}:</Header>                                                
                        <label htmlFor="file-upload" className="file-upload">
                            {text.b_selectImage}
                        </label>                
                        <label className="selected_model">
                            { document.getElementById("file-upload") ? document.getElementById("file-upload").files[0] ? document.getElementById("file-upload").files[0].name : null : null}
                        </label>
                        <Form.Input id="file-upload" name="image" onChange={this.handleChange} type="file"/>
                        {this.handleErrors("image")}


                        <Header>{text.desc}:</Header>  

                        <Form.Input 
                            type="text"
                            name="description" 
                            value={this.state.description}
                            onChange={this.handleChange}
                            error={this.handleErrors("description") ? true : false}                            
                            id="description"
                            rows='5' 
                            cols='50' 
                            placeholder={text.desc_p}/>
                    </Segment>
                    {this.handleErrors("description")}
                    
                    {
                        this.props.profile.fetching ? 
                            <Message info className="processing">
                                <Loading style={{width: '50px', margin: 'unset'}}/> <p style={{marginLeft: '20px'}}>{text.processing}</p>
                            </Message> 
                        : null 
                    }
                    {this.props.profile.postFetched ? <Message color="green" > {text.success} </Message> : null }

                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>{text.b_addPost}</Button>
                </Form>
            </Segment>
        )
    }
}

class ModelDropdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFetching: false,
            multiple: false,
            search: true,
            searchQuery: null,
            value: "",
            options: this.getOptions(),
        }
    }
    
    getOptions(){
        let options = []
        this.props.options.forEach((element)=>{
            if (element.commits.length > 0){
                options.push({
                    key: element.id,
                    text: element.title,
                    icon: {
                        name: "cubes"
                    },
                    value: element.id
                })
            }
        })

        return options
    }

    handleChange = (e, { value }) => {
        this.setState({ value })
        this.props.sendValue(value)
    }

    handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

    render() {

        const { options, isFetching, value } = this.state

        return (
            <Dropdown
                fluid
                selection
                search
                options={options}
                value={value}
                name='content'
                placeholder={this.props.text.selectModel_p}
                onChange={this.handleChange}
                onSearchChange={this.handleSearchChange}
                disabled={isFetching}
                loading={isFetching}
            />
        )
    }
}
