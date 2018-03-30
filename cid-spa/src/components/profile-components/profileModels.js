import React, { Component } from 'react'

import { Segment, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ModelPost from './post-templates/modelPost.js'
import { fetch3DModels } from '../../actions/profileActions.js'
import { changeSubpage } from '../../actions/pageActions.js'

import Loading from 'react-loading-animation'

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
            <ModelPost key={i} isUser={this.props.id !== undefined} {...object}/>
        )
    }

    render(){
        return(
            <div className="feed">
                { 
                    Object.keys(this.props.profile.models).length !== 0 ? 
                        this.props.profile.models.map((object, i) => this.renderPost(object,i)) : 
                    this.props.profile.models.length === 0 && this.props.profile.fetched ? 
                        <Message info >
                            You don't have any 3D models. You can add some by clicking "Create Model" in the navigation bar.
                        </Message> 
                    :
                    <Loading/> 
                }
            </div> 
        )
    }
}
