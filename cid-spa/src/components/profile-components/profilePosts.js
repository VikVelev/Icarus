import React, { Component } from 'react'

import { Segment, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

//import UserPost from './post-templates/userPost.js'
import Post from '../sub-components/post.js'

import { fetchUserPosts } from '../../actions/profileActions.js'
import { changeSubpage } from '../../actions/pageActions.js'

import Loading from 'react-loading-animation'

@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class ProfilePostsFeed extends Component {
    
    constructor(props) {
        super(props);

        this.props.profile.posts = {}
        
        this.posts = props.posts
        if (this.posts === undefined) {
            this.posts = {}
            if (props.id === undefined) {
                // console.log(props.id)
                this.props.dispatch(
                    fetchUserPosts( 
                        this.props.user.currentlyLoggedUser.username.id, 
                        this.props.user.currentlyLoggedUser.username.token
                    )
                )
            } else {            
                this.props.dispatch(
                    fetchUserPosts(
                        this.props.id, 
                        this.props.user.currentlyLoggedUser.username.token
                    )
                )            
            }
            this.props.dispatch(changeSubpage("profile_posts"))
        }
    }

    renderPost(object, i){
        return (
            <Post id={object.id} 
                  key={i}
                  inProfile={this.props.inProfile === undefined ? false : this.props.inProfile}
                  inDiff={this.props.inDiff === undefined ? false : this.props.inDiff}
                  className="profile-post-container"
                  {...object}/>
        )
    }

    render(){
        return(
            <div className="feed">                  
                {
                    Object.keys(this.props.profile.posts).length !== 0 ?
                        this.props.profile.posts.map((object, i) => this.renderPost(object,i)) : 
                    Object.keys(this.posts).length !== 0 ?
                        this.posts.map((object, i) => this.renderPost(object,i)) :
                    this.props.profile.fetched && Object.keys(this.posts).length === 0 ?
                    <Message info >
                        You don't have any posts. You can add some by clicking "Create post" in the navigation bar.
                    </Message> : <Loading/> 
                }
            </div> 
        )
    }
}
