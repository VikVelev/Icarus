import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Post from '../post.js'
import { fetchTrendingPosts } from '../../../actions/trendingActions.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        trending: store.trendingManagement,
    }
})
export default class TrendingFeed extends Component {
    
    constructor(props) {
        super(props);
        this.props.dispatch(fetchTrendingPosts(this.props.user.currentlyLoggedUser.username.token))
    }

    renderPost(object, i){
        return (
            <Segment id={object.id} key={i} className="post-container">
                <Post {...object}/>
            </Segment>
        )
    }

    render(){
        return(
            <div className="feed">
                {Object.keys(this.props.trending.trendingPosts).length !== 0 ? this.props.trending.trendingPosts.map((object, i) => this.renderPost(object,i)) : null}
            </div> 
            )
        }
    }
