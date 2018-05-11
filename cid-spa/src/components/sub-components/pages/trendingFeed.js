import React, { Component } from 'react'

import { connect } from 'react-redux';

import Post from '../post.js'
import { fetchNextTrendingBatch } from '../../../actions/trendingActions.js'

import Loading from 'react-loading-animation'
import InfiniteScroll from 'react-infinite-scroller'

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
            fetched: false,
            fetching: false,
            currentlyOn: 0,
            step: 8,
            page: 0,
        }
    }

    fetchBatch() {
        if(!this.state.fetching && this.props.trending.hasMore){
            this.state.fetching = true

            this.props.dispatch(
                fetchNextTrendingBatch(
                    this.state.page*10,
                    this.props.user.currentlyLoggedUser.username.token
                )
            )
    
            this.setState({
                currentlyOn: this.state.currentlyOn + this.state.step,
                page: this.state.page + 1
            })
        } else {

        }
    }

    callbackFetch() {
        this.setState({fetching: false, fetched: true})
        
    }

    render(){
        let items = [];
        console.log(this.props.trending.hasMore)

        this.props.trending.trendingPosts.forEach((batch, index) => {
            batch.map((object, i) => items.push(<Post className="post-container" key={i + 10 * index} {...object}/>))
        })

        return(
            <InfiniteScroll pageStart={0}
                            loadMore={this.fetchBatch.bind(this)}
                            hasMore={this.props.trending.hasMore}
                            loader={<Loading style={{marginTop: '10%'}}/>}
            >
                {items}
                {this.props.trending.fetched && !this.state.fetched ? this.callbackFetch() : null}
            </InfiniteScroll>
            )
        }
    }
