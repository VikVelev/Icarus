import React, { Component } from 'react'

import { Segment, Header, Tab } from 'semantic-ui-react'

import ProfileModelsFeed from '../../profile-components/profileModels.js'
import ProfileContributions from '../../profile-components/profileContributions.js'
import ProfilePosts from '../../profile-components/profilePosts.js'
import { fetchUserData } from '../../../actions/profileActions.js'
//import ProfileFavorites from '../../profile-components/profileFavorites.js'

import { connect } from 'react-redux';

import Loading from 'react-loading-animation'

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
        // TODO FIX, this overwrites the current user data. Only I will get this. 
        // NOTE: I am 2 months from the future and I don't get this
        this.props.dispatch(
            fetchUserData(
                props.id,
                this.props.user.currentlyLoggedUser.username.token
            )
        )
    }

    renderProfileOnFetch(){
        console.log(this.props.profile)
        if (Object.keys(this.props.profile.userData).length !== 0) {
            if (this.props.profile.userData.profile !== undefined ) {
                let picture = this.props.profile.userData.profile.profile_picture
                if(picture === null) {
                    picture = "/img/default.png"
                }
                return(
                    <Segment color="blue">
                    <Segment className="userHeader">
                        <div className="profileImage" style={{
                                backgroundImage: "url(" + picture + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundColor: '#ccc'
                            }}>
                        </div>
                        <div className="profileDetails">
                            <Header size="huge">{this.props.profile.userData.username}</Header>
                            <Header size="medium">{this.props.profile.userData.first_name} {this.props.profile.userData.last_name ? this.props.profile.userData.last_name + "," : null} {this.props.profile.userData.profile.country}</Header>                   
                            {this.props.profile.userData.profile.description}
                        </div>
                    </Segment>
                    <Tab menu={{ stackable: true, size: "massive", color: "blue", secondary: true , pointing: true }} panes={this.panes} />
                    </Segment>
                )
            }
        } else if (Object.keys(this.props.profile.error).length !== 0) {
            //404 page here
            return(this.props.profile.error.response.status)
        } else {
            return <Loading style ={{marginTop: "10%"}}/>
        }
    }

    render(){
        return <div className="userContainer">{this.renderProfileOnFetch()}</div>
    }
}