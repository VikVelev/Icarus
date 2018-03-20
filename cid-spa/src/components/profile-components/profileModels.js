import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ModelPost from './post-templates/modelPost.js'
import { fetch3DModels } from '../../actions/profileActions.js'
import { changeSubpage } from '../../actions/pageActions.js'


@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class ProfileModelsFeed extends Component {
    
    constructor(props) {
        super(props);
        if (props.id === undefined) {
            this.props.dispatch(fetch3DModels(this.props.user.currentlyLoggedUser.username.id, this.props.user.currentlyLoggedUser.username.token))
        } else {
            this.props.dispatch(fetch3DModels(this.props.id, this.props.user.currentlyLoggedUser.username.token))        
        }
        this.props.dispatch(changeSubpage("profile_models"))
    }

    renderPost(object, i){
        return (          
            <Segment id={object.id} key={i} className="profile-post-container">
                <ModelPost isUser={this.props.id !== undefined} {...object}/>
            </Segment>
        )
    }

    render(){
        return(
            <div className="feed">
                { this.props.profile.models.length === 0 ? "Add a model" : null }
                { Object.keys(this.props.profile.models).length !== 0 ? this.props.profile.models.map((object, i) => this.renderPost(object,i)) : null }
            </div> 
        )
    }
}
