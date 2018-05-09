import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Post from '../post.js'
import { fetchPersonalizedPosts } from '../../../actions/homeActions.js'

import Loading from 'react-loading-animation'

@connect((store)=>{
    return {
        user: store.userManagement,
        home: store.homeManagement
    }
})
export default class Feed extends Component {

    constructor(props) {
        super(props);
        this.props.dispatch(
            fetchPersonalizedPosts(
                this.props.user.currentlyLoggedUser.username.token
            )
        )
    }

    renderPost(object, i){
        return (     
            <Post className="post-container" key={i} {...object}/>
        )
    }

    render(){
        return(
            <div className="feed">
                {
                    Object.keys(this.props.home.personalizedPosts).length !== 0  ? this.props.home.personalizedPosts.map((object, i) => this.renderPost(object,i)) : 
                    <Loading style={{marginTop: '10%'}}/>
                }
            </div> 
            )
        }
    }
