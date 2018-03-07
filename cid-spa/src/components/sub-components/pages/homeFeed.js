import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Post from '../post.js'
import { fetchPersonalizedPosts } from '../../../actions/homeActions.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        home: store.homeManagement
    }
})
export default class Feed extends Component {
    
    constructor(props) {
        super(props);
        this.props.dispatch(fetchPersonalizedPosts(this.props.user.currentlyLoggedUser.username.token))
    }

    renderPost(object, i){
        return (          
            <Segment  id={object.id} key={i} className="post-container">
                <Post {...object}/>
            </Segment>
        )
    }

    render(){
        return(
            <div className="feed">
                {Object.keys(this.props.home.personalizedPosts).length !== 0 ? this.props.home.personalizedPosts.map((object, i) => this.renderPost(object,i)) : null}
            </div> 
            )
        }
    }
