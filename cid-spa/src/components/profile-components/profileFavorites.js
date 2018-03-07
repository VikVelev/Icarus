import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Post from '../sub-components/post.js'
import { fetchFavorites } from '../../actions/profileActions.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class ProfileFavorites extends Component {
    
    constructor(props) {
        super(props);
        this.props.dispatch(fetchFavorites(this.props.user.currentlyLoggedUser.username.id, this.props.user.currentlyLoggedUser.username.token))
    }

    renderPost(object, i){
        return (
            <Segment id={object.id} key={i} className="profile-post-container">
                <Post {...object}/>
            </Segment>
        )
    }

    render(){
        return(
            <div className="feed">
                { 
                Object.keys(this.props.profile.contributions).length !== 0 ? 
                this.props.profile.favorites.map((object, i) => this.renderPost(object,i)) 
                : null
                }
            </div> 
        )
    }
}
