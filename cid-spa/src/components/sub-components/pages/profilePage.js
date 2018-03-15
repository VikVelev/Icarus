import React, { Component } from 'react'

import { Segment, Image, Header, Tab, Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import ProfileModelsFeed from '../../profile-components/profileModels.js'
import ProfileContributions from '../../profile-components/profileContributions.js'

import { fetchUserData } from '../../../actions/profileActions.js'
//import ProfileFavorites from '../../profile-components/profileFavorites.js'

import { connect } from 'react-redux';


@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        page: store.pageManagement,
    }
})
export default class Profile extends Component {

    panes = [
        { menuItem: '3D Models', render: () => <Tab.Pane><ProfileModelsFeed/></Tab.Pane> },
        { menuItem: 'Contributions', render: () => <Tab.Pane><ProfileContributions/></Tab.Pane> },
        // { menuItem: 'Favorites', render: () => <Tab.Pane><ProfileFavorites/></Tab.Pane> },
        // { menuItem: 'Posts', render: () => <Tab.Pane><Profile/></Tab.Pane> },      
    ]

    constructor(props){
        super(props)
        this.props.dispatch(fetchUserData(this.props.user.currentlyLoggedUser.username.id, this.props.user.currentlyLoggedUser.username.token))
        this.state = {
            settings: false,
        }
    }

    renderSettings() {
        this.setState({ settings: !this.state.settings })
    }

    renderProfileOnFetch(){
        if (this.props.profile.userData !== {}) {
            if (this.props.profile.userData.profile !== undefined ) {
                return(
                    <Segment color="blue">
                    <Segment className="userHeader">
                        <div className="profileImage" style={{
                                backgroundImage: "url(" + this.props.profile.userData.profile.profile_picture + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundColor: '#ccc'
                            }}>
                        </div>
                        <div className="profileDetails">
                            <Header size="huge">{this.props.profile.userData.username}</Header>
                            <Header size="medium">{this.props.profile.userData.first_name} {this.props.profile.userData.last_name}, {this.props.profile.userData.profile.country}</Header>                   
                            {this.props.profile.userData.profile.description}
                        </div>
                    </Segment>
                    <div className="settings_button" onClick={this.renderSettings.bind(this)}>
                        <Icon size='big' name='settings'></Icon>
                    </div>
                    <Tab menu={{ stackable: true, size: "massive", color: "blue", secondary: true , pointing: true }} panes={this.panes} />
                    {this.state.settings ? <Redirect to="/profile/settings"/> : null}
                    </Segment>
                )
            }
        } else {
            return null
        }
    }

    render(){
        return <div className="userContainer">{this.renderProfileOnFetch()} </div>
    }
}