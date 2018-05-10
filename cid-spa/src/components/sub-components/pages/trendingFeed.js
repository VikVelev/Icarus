import React, { Component } from 'react'

import { connect } from 'react-redux';

import Post from '../post.js'
import { fetchTrendingPosts } from '../../../actions/trendingActions.js'

import Loading from 'react-loading-animation'

@connect((store)=>{
    return {
        user: store.userManagement,
        trending: store.trendingManagement,
    }
})
export default class TrendingFeed extends Component {
    
    constructor(props) {
        super(props);
        
        this.props.dispatch(
            fetchTrendingPosts(
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
                    Object.keys(this.props.trending.trendingPosts).length !== 0 ? 
                    this.props.trending.trendingPosts.map((object, i) => this.renderPost(object,i))  : 
                    this.props.trending.fetching ?
                    <Loading style={{marginTop: '10%'}}/> : null
                }
            </div> 
        )
    }
}
