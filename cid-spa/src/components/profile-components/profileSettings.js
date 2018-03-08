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
        }
    }

    handleChange = (e, { name, value}) => {
        console.log([name],value)
        this.setState({ [name]: value })
	}

    handleSubmit = () => {
        const { username, first_name, last_name, email, country, birth_date, description } = this.state
        //check for custom validation here
        this.setState({
            first_name: first_name,
            last_name: last_name, 
            email: email,
            country: country,
            birth_date: birth_date,
            description: description,
        })
        // FIXME COMPLETE UTTETR BULSHIT
        this.props.dispatch(setUserData(
            this.props.user.currentlyLoggedUser.username.id,
            {
                username: this.props.profile.userData.username,
                first_name: first_name,
                last_name: last_name,
                email: email,
                profile: {
                    country: country,
                    birth_date: birth_date,
                    description: description, 
                }
            },
            this.props.user.currentlyLoggedUser.username.token
        )
    )
    }

    renderProfile() {
        this.setState({ profile: !this.state.settings })
    }

    renderSettingsOnFetch(){
        if (this.props.profile.userData !== {}) {
            if (this.props.profile.userData.profile !== undefined ) {
                if (this.state.email === undefined) {
                    this.state = {...this.props.profile.userData, ...this.props.profile.userData.profile, profile: false}
                }
                return(
                    <Segment color="blue">
                        <Header size="huge">Settings</Header>                 
                        <Segment className="settingsHeader">
                            <div className="profileSettingsImage">
                                <Image src={this.props.profile.userData.profile.profile_picture} size="medium" circular style={{objectFit: "cover"}}/>
                            </div>
                            <div className="profileSettingsForm">
                                <Form size='large' onSubmit={this.handleSubmit}>
                                    <Segment stacked>
                                        <Form.Input
                                                fluid
                                                icon='user'
                                                name="first_name"      
                                                value={this.state.first_name}
                                                onChange={this.handleChange}
                                                iconPosition='left'
                                                placeholder='First Name'
                                            />    
                                        <Form.Input
                                            fluid
                                            icon='user'
                                            name="last_name"
                                            value={this.state.last_name}
                                            onChange={this.handleChange}
                                            iconPosition='left'
                                            placeholder='Enter username'
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
                                            placeholder='Country'
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
                                    </Segment>
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