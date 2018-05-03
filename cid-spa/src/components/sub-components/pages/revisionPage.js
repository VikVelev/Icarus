import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import RevisionItem from '../items/revisionItem.js'
import { fetchUserRevisions } from '../../../actions/revisionActions.js'

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
    }

    renderPost(object, i){
        return (     
            <Segment  id={object.id} key={i} className="post-container">
                <RevisionItem {...object}/>
            </Segment>
        )
    }

    noRevisions() {
        return (
            <Segment color='blue' className="post-container">
                No revisions to review at this moment.
            </Segment>
        )
    }

    render(){
        return(
            <div className="revisions">
                {console.log(this.props.rev)}
                {   
                    Object.keys(this.props.rev.revisions).length !== 0  ?  //if
                    this.props.rev.revisions.map((object, i) => this.renderPost(object,i)) : //else if
                    !this.props.rev.fetched ? //if it's not fetched, loading
                     <Loading style={{marginTop: '10%'}}/> : //else if it is fetched (and has length of 0) 
                     this.noRevisions() 
                }
            </div> 
            )
        }
    }
