import React, { Component } from 'react'

import { Segment, Header, Icon, Form, Message, Button } from 'semantic-ui-react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import * as moment from 'moment'
//import ProfileFavorites from '../../profile-components/profileFavorites.js'
import { fetchUserData, setUserData } from '../../actions/profileActions.js'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        page: store.pageManagement,
    }
})
export default class ProfileSettings extends Component {

    constructor(props){
        super(props)

        this.state = {
            success: false,
            profile: false,
            first_name: "",
            last_name: "", 
            email: "",
            country: "",
            profile_picture: "",
            birth_date: moment(),
            description: '',
        }   
        
        this.props.dispatch(
            fetchUserData(
                this.props.user.currentlyLoggedUser.username.id, 
                this.props.user.currentlyLoggedUser.username.token
            )
        )
        
    }

    handleChange = (e, { name, value}) => {
        this.setState({ [name]: value })
    }

    handleDateChange(date) {
        this.setState({ birth_date: date })
    }
    
    renderProcessing() {
        // TODO: Make a cool loading animation
        return(
            <Message info>
                Processing...
            </Message>
        )
    }

    renderSuccess() {
        return(<Message success attached="bottom" style={{ display: "block" }}> Your profile was updated successfully. </Message>)
    }

    handleSubmit = () => {
        const { first_name, last_name, email, country, profile_picture, birth_date, description } = this.state
        
        this.setState({
            first_name: first_name,
            last_name: last_name, 
            email: email,
            country: country,
            profile_picture: profile_picture,
            birth_date: birth_date,
            description: description,
        })

        const formData = new FormData();
        
        formData.append('email', email)
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('profile.country', country)
        formData.append('profile.birth_date', birth_date.format("YYYY-MM-DD"))

        if (this.state.profile_picture !== this.props.profile.userData.profile.profile_picture) {
            formData.append('profile.profile_picture', document.getElementById("file-upload").files[0])
        }
        formData.append('profile.description', description)        

        this.props.dispatch(
            setUserData(
                this.props.user.currentlyLoggedUser.username.id,
                formData,
                this.props.user.currentlyLoggedUser.username.token
            )
        )    
    }

    handleErrors(type) {
        if (this.props.profile.error.data !== undefined) {
            if (this.props.profile.error.data[type] !== undefined || this.props.profile.error.data.profile[type] !== undefined) {
                return (
                    <Message attached="bottom" color="red">
                        {
                            this.props.profile.error.data[type] ? 
                            this.props.profile.error.data[type] : 
                            this.props.profile.error.data.profile[type] 
                        }
                    </Message>
                )
            }
        }
	}
    
    renderProfile() {
        this.setState({ profile: !this.state.settings })
    }

    renderSettingsOnFetch(){
        if (this.props.profile.userData !== {}) {
            if (this.props.profile.userData.profile !== undefined ) {
                if (this.state.email === "") {
                    
                    let state = {
                        ...this.props.profile.userData, 
                        ...this.props.profile.userData.profile, 
                        profile: false
                    }

                    if (this.props.profile.userData.profile.birth_date !== null) {
                        state = {
                            ...state,
                            birth_date: moment(state.birth_date)
                        }
                    }

                    // This is retarded 
                    if(state.country === null) {
                        state.country = ""
                    }
                    
                    if(state.first_name === null) {
                        state.first_name = ""
                    }

                    if(state.last_name === null) {
                        state.last_name = ""
                    }

                    if(state.birth_date === null) {
                        state.birth_date = ""
                    }

                    if(state.description === null) {
                        state.description = ""
                    }
                    
                    // eslint-disable-next-line
                    this.state = {...state}

                    // end of retardation - did this to eliminate warnings.
                }
                let picture = this.props.profile.userData.profile.profile_picture

                if(picture === null) {
                    picture = "/img/default.png"
                }

                return(
                    <Segment color="blue">
                        <Header size="huge">Settings</Header>                 
                        <Segment className="settingsHeader">
                            <div className="profileImage" style={{
                                    backgroundImage: "url(" + picture + ")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundColor: '#ccc',
                                    marginBottom: "20px"
                                }}>
                            </div>
                            <div className="profileSettingsForm">
                                <Form as="form" size='large' id="settings" name="settings" onSubmit={this.handleSubmit}>
                                    <label htmlFor="file-upload" className="file-upload">
                                        <i className="fa fa-cloud-upload"></i> Upload picture
                                    </label>
                                    <label className="selected_model">
                                        { document.getElementById("file-upload") ? document.getElementById("file-upload").files[0] ? document.getElementById("file-upload").files[0].name : null : null}
                                    </label>
                                    <Form.Input id="file-upload" 
                                        name="profile_picture" 
                                        type="file"
                                        onChange={this.handleChange}
                                        accept=".png,.jpg,.jpeg"
                                    />
                                    {this.handleErrors("profile_picture")}
                                    
                                    <Header size="small">First name</Header>                                                                        
                                    <Form.Input
                                            fluid
                                            icon='user'
                                            name="first_name"      
                                            value={this.state.first_name}
                                            onChange={this.handleChange}
                                            iconPosition='left'
                                            placeholder='Enter first name'
                                    />
                                    <Header size="small">Last name</Header> 
                                    <Form.Input
                                        fluid
                                        icon='user'
                                        name="last_name"
                                        value={this.state.last_name}
                                        onChange={this.handleChange}
                                        iconPosition='left'
                                        placeholder='Enter last name'
                                        />

                                    <Header size="small">E-mail</Header>                                     
                                    <Form.Input
                                        fluid
                                        icon='at'
                                        name="email"
                                        error={this.handleErrors("email") !== undefined}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        iconPosition='left'
                                        placeholder='Enter e-mail'
                                    />                                
                                    {this.handleErrors("email")}
                                    
                                    <Header size="small">Country</Header>                                    
                                    <Form.Input
                                        fluid
                                        icon='world'
                                        iconPosition='left'                                                                       
                                        name="country"
                                        value={this.state.country}
                                        onChange={this.handleChange}
                                        placeholder='Country'
                                        type='text'
                                    />
                                    
                                    <Header size="small">Birth date</Header>
                                    <DatePicker 
                                        onChange={this.handleDateChange.bind(this)}
                                        selected={typeof this.state.birth_date === "string" ? null : this.state.birth_date}
                                        name="birth_date"/>
                                    {this.handleErrors("birth_date")}
                                    <Header size="small">Description</Header>                                    
                                    <Form.Input
                                        fluid
                                        icon='file text'
                                        iconPosition='left'                                            
                                        name="description"
                                        type="textarea"
                                        onChange={this.handleChange}                                            
                                        value={this.state.description}                                            
                                        placeholder="Write your description..."
                                    /> 

                                    {this.props.profile.userDataSet ? this.renderSuccess() : null}
                                    {this.props.profile.fetching ? this.renderProcessing() : null}                                    
                                    
                                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>Save changes</Button>
                                </Form>
                            </div>
                        </Segment>

                        <div className="settings_button" onClick={this.renderProfile.bind(this)}>
                            <Icon size='big' name='user'></Icon>
                        </div>
                        {this.state.profile ? <Redirect to="/profile"/> : null}           
                    </Segment>
                )
            }
        } else {
            return null
        }
    }

    render(){
        return <div className="settingsContainer">{this.renderSettingsOnFetch()}</div>
    }
}