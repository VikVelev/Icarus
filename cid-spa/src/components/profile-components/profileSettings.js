import React, { Component } from 'react'

import { Segment, Image, Header, Icon, Form, /*Message,*/ Button } from 'semantic-ui-react'

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
        this.props.dispatch(fetchUserData(this.props.user.currentlyLoggedUser.username.id, this.props.user.currentlyLoggedUser.username.token))
        this.state = {
            profile: false,
            first_name: "",
            last_name: "", 
            email: "",
            country: "",
            profile_picture: "",
            birth_date: "",
            description: '',
        }
    }

    handleChange = (e, { name, value}) => {
        console.log([name],value)
        this.setState({ [name]: value })
	}

    handleSubmit = () => {
        const { username, first_name, last_name, email, country, profile_picture, birth_date, description } = this.state
        //check for custom validation here
        this.setState({
            first_name: first_name,
            last_name: last_name, 
            email: email,
            country: country,
            profile_picture: profile_picture,
            birth_date: birth_date,
            description: description,
        })
        // FIXME COMPLETE UTTETR BULSHIT
        console.log()

        const formData = new FormData();

        formData.append('email', email)
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('profile.country', country)
        formData.append('profile.birth_date', birth_date)
        formData.append('profile.profile_picture', document.getElementById("file-upload").files[0])
        formData.append('description', birth_date)                       
        
        
        console.log(formData)

        this.props.dispatch(setUserData(
            this.props.user.currentlyLoggedUser.username.id,
            formData,
            this.props.user.currentlyLoggedUser.username.token
        ))
    }

    
    renderProfile() {
        this.setState({ profile: !this.state.settings })
    }

    renderSettingsOnFetch(){
        if (this.props.profile.userData !== {}) {
            if (this.props.profile.userData.profile !== undefined ) {
                if (this.state.email === "") {
                    this.state = {...this.props.profile.userData, ...this.props.profile.userData.profile, profile: false}
                    
                    if(this.state.country === null) {
                        this.state.country = ""
                    }
                    
                    if(this.state.first_name === null) {
                        this.state.first_name = ""
                    }

                    if(this.state.last_name === null) {
                        this.state.last_name = ""
                    }

                    if(this.state.birth_date === null) {
                        this.state.birth_date = ""
                    }

                    if(this.state.description === null) {
                        this.state.description = ""
                    }

                    if(this.state.profile_picture === null) {
                        this.state.profile_picture = ""
                    }
                }
                return(
                    <Segment color="blue">
                        <Header size="huge">Settings</Header>                 
                        <Segment className="settingsHeader">
                            <div className="profileSettingsImage">
                                <Image src={this.props.profile.userData.profile.profile_picture} size="medium" circular style={{objectFit: "cover"}}/>

                            </div>
                            <div className="profileSettingsForm">
                                <Form as="form" size='large' id="settings" name="settings" onSubmit={this.handleSubmit}>
                                    <label htmlFor="file-upload" className="file-upload">
                                        <i className="fa fa-cloud-upload"></i> Upload picture
                                    </label>
                                    <Form.Input id="file-upload" 
                                        name="profile_picture" 
                                        type="file"
                                        onChange={this.handleChange} 
                                    />
                                           
                                    <Form.Input
                                            fluid
                                            icon='user'
                                            name="first_name"      
                                            value={this.state.first_name}
                                            onChange={this.handleChange}
                                            iconPosition='left'
                                            placeholder='Enter first name'
                                        />

                                    <Form.Input
                                        fluid
                                        icon='user'
                                        name="last_name"
                                        value={this.state.last_name}
                                        onChange={this.handleChange}
                                        iconPosition='left'
                                        placeholder='Enter last name'
                                    />

                                    <Form.Input
                                        fluid
                                        icon='at'
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        iconPosition='left'
                                        placeholder='Enter e-mail'
                                    />                                
                        
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
                                    
                                    <Form.Input
                                        fluid
                                        icon='clock'
                                        iconPosition='left'                                                                   
                                        name="birth_date"
                                        value={this.state.birth_date}
                                        onChange={this.handleChange}
                                        placeholder='Birth date'
                                        type='datetime'
                                    />

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