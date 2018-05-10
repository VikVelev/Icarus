import React, { Component } from 'react'

import { Segment, Header, Icon, Form, Message, Button } from 'semantic-ui-react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

import * as moment from 'moment'
//import ProfileFavorites from '../../profile-components/profileFavorites.js'
import { fetchUserData, setUserData } from '../../actions/profileActions.js'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';
import lang from '../../lang.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        page: store.pageManagement,
        lang: store.langManagement.lang,
    }
})
export default class ProfileSettings extends Component {

    constructor(props){
        super(props)

        this.softwareChoices = [
            {
                key: "c4d",
                value: "Cinema4D"
            },            
            {
                key: "bld",
                value: "Blender"
            },            
            {
                key: "cad",
                value: "AutoCAD"
            },            
            {
                key: "zbrs",
                value: "Z-Brush"
            },
            {
                key: "3dsmax",
                value: "3DSMax"
            },                     
        ]

        this.state = {
            success: false,
            profile: false,
            first_name: "",
            last_name: "", 
            email: "",
            country: "",
            profile_picture: "",
            software: "",
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
        return(
            <Message info>
                {lang[this.props.lang].profileSettings.processing}
            </Message>
        )
    }

    renderSuccess() {
        return(
            <Message success attached="bottom" style={{ display: "block" }}>
                {lang[this.props.lang].profileSettings.saveChanges_success}
            </Message>
        )
    }

    handleSubmit = () => {
        const { first_name, last_name, email, country, profile_picture, software, birth_date, description } = this.state
        
        this.setState({
            first_name: first_name,
            last_name: last_name, 
            email: email,
            country: country,
            profile_picture: profile_picture,
            software: software,
            birth_date: birth_date,
            description: description,
        })

        const formData = new FormData();
        
        formData.append('email', email)
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('profile.country', country)
        formData.append('profile.birth_date', birth_date !== null && birth_date !== "" ? birth_date.format("YYYY-MM-DD") : null) 

        if (this.state.profile_picture !== this.props.profile.userData.profile.profile_picture) {
            formData.append('profile.profile_picture', document.getElementById("file-upload").files[0])
        }
        formData.append('profile.software', software)        
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

                let text = lang[this.props.lang].profileSettings

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
                    
                    for (const key in state) {
                        if (state.hasOwnProperty(key) && state[key] === null && key !== "profile_picture") {
                            state[key] = "" 
                        }
                    }
                    
                    // eslint-disable-next-line
                    this.state = {...state}
                }
                let picture = this.props.profile.userData.profile.profile_picture

                if(picture === null) {
                    picture = "/img/default.png"
                }

                return(
                    <Segment color="blue">
                        <Header size="huge">
                            {text.title}
                        </Header>                 
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
                                        <i className="fa fa-cloud-upload"></i> {text.b_uploadPic}
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
                                    <Header size="small">{text.firstName}</Header>                                                                        
                                    <Form.Input
                                            fluid
                                            icon='user'
                                            name="first_name"      
                                            value={this.state.first_name}
                                            onChange={this.handleChange}
                                            iconPosition='left'
                                            placeholder={text.firstName_p}
                                    />
                                    <Header size="small">{text.lastName}</Header>
                                    <Form.Input
                                        fluid
                                        icon='user'
                                        name="last_name"
                                        value={this.state.last_name}
                                        onChange={this.handleChange}
                                        iconPosition='left'
                                        placeholder={text.lastName_p}
                                        />

                                    <Header size="small">{text.email}</Header>                                     
                                    <Form.Input
                                        fluid
                                        icon='at'
                                        name="email"
                                        error={this.handleErrors("email") !== undefined}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        iconPosition='left'
                                        placeholder={text.email_p}
                                    />                                
                                    {this.handleErrors("email")}
                                    
                                    <Header size="small">{text.country}</Header>                                    
                                    <Form.Input
                                        fluid
                                        icon='world'
                                        iconPosition='left'                                                                       
                                        name="country"
                                        value={this.state.country}
                                        onChange={this.handleChange}
                                        placeholder={text.country_p}
                                        type='text'
                                    />
                                    
                                    <Header size="small">{text.software}</Header>                                    
                                    <Form.Input
                                        fluid
                                        icon='world'
                                        name="software"
                                        iconPosition='left'
                                        value={this.state.software}
                                        onChange={this.handleChange}
                                        placeholder={text.software_p}
                                    />

                                    <Header size="small">{text.birthDate}</Header>
                                    <DatePicker 
                                        onChange={this.handleDateChange.bind(this)}
                                        selected={typeof this.state.birth_date === "string" ? null : this.state.birth_date}
                                        placeholderText="DD/MM/YY"
                                        name="birth_date"/>
                                    {this.handleErrors("birth_date")}
                                    <Header size="small">{text.description}</Header>                                    
                                    <Form.Input
                                        fluid
                                        icon='file text'
                                        iconPosition='left'                                            
                                        name="description"
                                        type="textarea"
                                        onChange={this.handleChange}                                            
                                        value={this.state.description}                                            
                                        placeholder={text.description_p}
                                    /> 

                                    {this.props.profile.userDataSet ? this.renderSuccess() : null}
                                    {this.props.profile.fetching ? this.renderProcessing() : null}

                                    <Button className="submitButton" type='submit 'color='blue' fluid size='large'>{text.b_saveChanges}</Button>
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