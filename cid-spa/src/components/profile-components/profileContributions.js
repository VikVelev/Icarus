import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ContribPost from './contribPost.js'
import { fetchContributions } from '../../actions/profileActions.js'
import { changeSubpage } from '../../actions/pageActions.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class ProfileContributionsFeed extends Component {
    
    constructor(props) {
        super(props);
        this.props.dispatch(fetchContributions(this.props.user.currentlyLoggedUser.username.id), changeSubpage("profile_contributions"))
        this.props.dispatch(changeSubpage("profile_contributions"))
    }

    renderPost(object, i){
        return (          
            <Segment id={object.id} key={i} className="profile-post-container">
                <ContribPost {...object}/>
            </Segment>
        )
    }

    render(){
        return(
            <div className="feed">
                {Object.keys(this.props.profile.contributions).length !== 0 ? 
                this.props.profile.contributions.map((object, i) => this.renderPost(object,i)) 
                : null}
            </div> 
        )
    }
}
