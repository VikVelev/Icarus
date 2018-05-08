import React, { Component } from 'react'

import { Segment, Header, Tab } from 'semantic-ui-react'

import ProfileModelsFeed from '../../profile-components/profileModels.js'
import ProfileContributions from '../../profile-components/profileContributions.js'
import ProfilePosts from '../../profile-components/profilePosts.js'
import { fetchUserData } from '../../../actions/profileActions.js'
//import ProfileFavorites from '../../profile-components/profileFavorites.js'
import ErrorPage from './clientErrors.js'

import { connect } from 'react-redux';

import Loading from 'react-loading-animation'
import lang from '../../../lang.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        page: store.pageManagement,
        lang: store.langManagement.lang,
    }
})
export default class UserProfile extends Component {

    panes = [
        { menuItem: lang[this.props.lang].profilePage.models_t, render: () => <Tab.Pane><ProfileModelsFeed user id={this.props.id}/></Tab.Pane> },
        { menuItem: lang[this.props.lang].profilePage.contrib_t, render: () => <Tab.Pane><ProfileContributions user id={this.props.id}/></Tab.Pane> },
        { menuItem: lang[this.props.lang].profilePage.posts_t, render: () => <Tab.Pane><ProfilePosts user id={this.props.id}/></Tab.Pane> },
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
        if (Object.keys(this.props.profile.userData).length !== 0) {
            if (this.props.profile.userData.profile !== undefined ) {
                let text = lang[this.props.lang].profilePage
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
                            <p>{this.props.profile.userData.profile.description}</p>
                                {
                                    this.props.profile.userData.profile.software !== null ?
                                        <p>{text.using + " " + this.props.profile.userData.profile.software}</p> :
                                    null
                                }  
                        </div>
                    </Segment>
                    <Tab menu={{ stackable: true, size: "massive", color: "blue", secondary: true , pointing: true }} panes={this.panes} />
                    </Segment>
                )
            }
        } else if (Object.keys(this.props.profile.error).length !== 0) {
            return <ErrorPage type={this.props.profile.error.response.status}/>
        } else {
            return <Loading style ={{marginTop: "10%"}}/>
        }
    }

    render(){
        return <div className="userContainer">{this.renderProfileOnFetch()}</div>
    }
}