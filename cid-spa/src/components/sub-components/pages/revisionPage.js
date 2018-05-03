import React, { Component } from 'react'

import { Header, Segment, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import RevisionItem from '../items/revisionItem.js'
import { fetchUserRevisions, fetchMyRevisions } from '../../../actions/revisionActions.js'

import Loading from 'react-loading-animation'

@connect((store)=>{
    return {
        user: store.userManagement,
        home: store.homeManagement,
        rev: store.revisionManagement,
    }
})
export default class Revision extends Component {

    constructor(props) {
        super(props);

        this.props.dispatch(
            fetchUserRevisions(
                this.props.user.currentlyLoggedUser.username.id,
                this.props.user.currentlyLoggedUser.username.token,
            )
        )

        this.props.dispatch(
            fetchMyRevisions(
                this.props.user.currentlyLoggedUser.username.token,
            )
        )
    }

    renderPost(object, mine, i){
        return (     
            <Segment  id={object.id} key={i}>
                <RevisionItem {...object} mine={mine}/>
            </Segment>
        )
    }

    noRevisions(mine) {
        if(!mine) {
            return (
                <Message info>
                    No revisions to review at this moment.
                </Message>
            )
        } else {
            return (
                <Message info>
                    No posted revisions.
                </Message>
            )
        }

    }
    // TODO make a 
    render(){
        return(
            <Segment className="revisionContainer">
                <Segment className="postedRevisions">
                <Header>
                    Your proposed revisions
                </Header>
                {/*TODO Perhaps add tabs here for approved/rejected and pending*/}
                {   
                    Object.keys(this.props.rev.postedRevisions).length !== 0  ?  //if
                    this.props.rev.postedRevisions.map((object, i) => this.renderPost(object, true, i)) : //else if
                    !this.props.rev.fetched ? //if it's not fetched, loading
                     <Loading style={{marginTop: '10%'}}/> : //else if it is fetched (and has length of 0) 
                     this.noRevisions(true) 
                }
                </Segment>
                <Segment className="toReview">
                <Header>
                    Revisions to review
                </Header>
                {   
                    Object.keys(this.props.rev.revisions).length !== 0  ?  //if
                    this.props.rev.revisions.map((object, i) => this.renderPost(object, false, i)) : //else if
                    !this.props.rev.fetched ? //if it's not fetched, loading
                     <Loading style={{marginTop: '10%'}}/> : //else if it is fetched (and has length of 0) 
                     this.noRevisions(false) 
                }
                </Segment>
            </Segment>
            )
        }
    }
