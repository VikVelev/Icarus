/* eslint-disable */

import React, { Component } from 'react'

import { connect } from 'react-redux';

import Post from '../post.js'
import { fetchPersonalizedPosts, fetchNextBatch } from '../../../actions/homeActions.js'

import Loading from 'react-loading-animation'
import { Button } from 'semantic-ui-react';

import InfiniteScroll from 'react-infinite-scroller'

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
            fetching: false,
            batches: [],
            currentlyOn: 0,
            page: 0,
            update: true,
        }
    }

    fetchBatch() {
        if(!this.state.fetching && this.props.home.hasMore){
            this.state.fetching = true

            this.props.dispatch(
                fetchNextBatch(
                    this.state.page*10,
                    this.props.user.currentlyLoggedUser.username.token
                )
            )

            this.setState({
                update: true,
                currentlyOn: this.state.currentlyOn + this.state.step,
                page: this.state.page + 1
            })
        } else {

        }
    }

    callbackFetch() {
        this.setState({ fetching: false, fetched: true })
    }

    render(){
        let items = [];
        
        this.props.home.personalizedPosts.forEach((batch, index) => {

                batch.map((object, i) => {
                    return items.push(<Post key={i  + 10 * index} className="post-container"  {...object}/>)
                })
        })

        if (this.props.home.fetched && !this.state.fetched) {
            this.callbackFetch()
        }

        return(
            <InfiniteScroll pageStart={0}
                            loadMore={this.fetchBatch.bind(this)}
                            hasMore={this.props.home.hasMore}
                            loader={<Loading style={{marginTop: '10%'}}/>}
            >
                {items}
            </InfiniteScroll>
            )
        }
    }
