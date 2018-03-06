import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Post from '../sub-components/post.js'
import { fetch3DModels } from '../../actions/profileActions.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class ProfileModelsFeed extends Component {
    
    constructor(props) {
        super(props);
        console.log(this.props.user)
        this.props.dispatch(fetch3DModels())
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
                {Object.keys(this.props.profile.models).length !== 0 ? this.props.profile.models.map((object, i) => this.renderPost(object,i)) : null}
            </div> 
        )
    }
}
