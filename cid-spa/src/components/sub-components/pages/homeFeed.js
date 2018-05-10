import React, { Component } from 'react'

import { connect } from 'react-redux';

import Post from '../post.js'
import { fetchPersonalizedPosts, fetchNextBatch } from '../../../actions/homeActions.js'

import Loading from 'react-loading-animation'
import { Button } from 'semantic-ui-react';

@connect((store)=>{
    return {
        user: store.userManagement,
        home: store.homeManagement
    }
})
export default class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: 0,
            fetched: false,
            fetchBatch: true,
            batches: [],
            currentlyOn: 8,
            update: true,
        }

        this.props.dispatch(
            fetchPersonalizedPosts(
                this.props.user.currentlyLoggedUser.username.token
            )
        )
    }

    // fetchBatch() {
    //     this.props.dispatch(
    //         fetchNextBatch(
    //             this.state.currentlyOn, this.props.user.currentlyLoggedUser.username.token
    //         )
    //     )
    //     this.setState({
    //         update: true,
    //         fetchBatch: true,
    //         currentlyOn: this.state.currentlyOn + 8,
    //     })
    // }

    renderPost(object, i){
        return (     
            <Post className="post-container" key={i} {...object}/>
        )
    }

    // renderBatches() {
    //     this.props.home.batches.forEach((batch) => {
    //         batch.map((object, i) => this.renderPost(object,i))
    //     })
    // }

    render(){
        return(
            <div className="feed">
                {
                    this.props.home.personalizedPosts.length !== 0 ? 
                    this.props.home.personalizedPosts.map((object, i) => this.renderPost(object,i)) : 
                    <Loading style={{marginTop: '10%'}}/>
                }
                {/* {
                    this.props.home.batches.length !== 0 ? 
                    this.renderBatches() :
                    <div>Nothing</div>
                }
                <Button onClick={this.fetchBatch.bind(this)}>Fetch next batch</Button> */}
            </div> 
            )
        }
    }
