import React, { Component } from 'react'

import { Segment, Header, Tab, Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import ProfileModelsFeed from '../../profile-components/profileModels.js'
import ProfileContributions from '../../profile-components/profileContributions.js'
import ProfilePosts from '../../profile-components/profilePosts.js'
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
export default class UserProfile extends Component {

    panes = [
        { menuItem: '3D Models', render: () => <Tab.Pane><ProfileModelsFeed user id={this.props.id}/></Tab.Pane> },
        { menuItem: 'Contributions', render: () => <Tab.Pane><ProfileContributions user id={this.props.id}/></Tab.Pane> },
        { menuItem: 'Posts', render: () => <Tab.Pane><ProfilePosts user id={this.props.id}/></Tab.Pane> },
        // { menuItem: 'Favorites', render: () => <Tab.Pane><ProfileFavorites/></Tab.Pane> },
    ]

    constructor(props){
        super(props)
        //TODO FIX, this overwrites the current user data. Only I will get this.
        this.props.dispatch(fetchUserData(props.id, this.props.user.currentlyLoggedUser.username.token))
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
                    <Tab menu={{ stackable: true, size: "massive", color: "blue", secondary: true , pointing: true }} panes={this.panes} />
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