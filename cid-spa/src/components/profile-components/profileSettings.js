import React, { Component } from 'react'

import { Segment, Image, Header, Tab, Icon } from 'semantic-ui-react'

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

    renderProfile() {
        this.setState({ profile: !this.state.settings })
    }

    renderSettingsOnFetch(){
        if (this.props.profile.userData !== {}) {
            if (this.props.profile.userData.profile !== undefined ) {
                return(
                    <Segment  color="blue" className="userContainer" style={{
                        height: 'auto',
                        marginTop: '5px',
                        marginLeft: '20%',
                        marginRight: '20%',  
                    }}>
                    <Header size="huge">Settings</Header>                 
                    <Segment className="userHeader" style={{ display: 'flex' }}>
                        <div className="profileImage">
                            <Image src={this.props.profile.userData.profile.profile_picture} size="medium" circular style={{objectFit: "cover"}}/>
                        </div>
                        <div className="profileDetails">
                            <Header size="huge">{this.props.profile.userData.first_name} {this.props.profile.userData.last_name}</Header>
                            <Header size="medium">@{this.props.profile.userData.username}</Header>
                            <Header size="medium">Uploaded models </Header>                    
                            {this.props.profile.userData.profile.description}
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
        return <div>{this.renderSettingsOnFetch()}</div>
    }
}