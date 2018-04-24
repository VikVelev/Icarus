import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
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
        this.state = {
            shuffled: false,
            shuffledArr: [],
        }
        
        this.props.dispatch(
            fetchTrendingPosts(
                this.props.user.currentlyLoggedUser.username.token
            )
        )
    }

    renderPost(object, i){
        return (
            <Segment id={object.id} key={i} className="post-container">
                <Post {...object}/>
            </Segment>
        )
    }
    
    //Simple shuffle to simulate trendingness
    //TODO: Implement popularity sort or something
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    shuffleAndMap() {
        if (!this.props.trending.shuffled) {
            this.props.dispatch({ type: "SHUFFLE", payload: this.shuffle(this.props.trending.trendingPosts)})
        }

        return this.props.trending.shuffledPosts.map((object, i) => this.renderPost(object,i))
    }

    render(){
        return(
            <div className="feed">
                {
                    Object.keys(this.props.trending.trendingPosts).length !== 0 ? this.shuffleAndMap()  : 
                    <Loading style={{marginTop: '10%'}}/>
                }
            </div> 
        )
    }
}
