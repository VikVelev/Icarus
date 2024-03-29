import React, { Component } from 'react'

import { Header, Segment, Message, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';

import RevisionItem from '../items/revisionItem.js'
import { fetchUserRevisions, fetchMyRevisions } from '../../../actions/revisionActions.js'

import Loading from 'react-loading-animation'
import lang from '../../../lang.js'
@connect((store)=>{
    return {
        user: store.userManagement,
        home: store.homeManagement,
        rev: store.revisionManagement,
        lang: store.langManagement.lang,
    }
})
export default class Revision extends Component {

    constructor(props) {
        super(props);
        this.revisions = []

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

    noRevisions(mine, text) {
        if(!mine) {
            return (
                <Message info>
                    {text.reviewRev.noRevs}
                </Message>
            )
        } else {
            return (
                <Message info>
                    {text.proposedRev.noRevs}
                </Message>
            )
        }

    }

    render(){
        let text = lang[this.props.lang].revisions
        return(
            <Segment className="revisionContainer">
                <Segment className="postedRevisions">
                <Header>
                    {text.proposedRev.title}
                </Header>
                {   
                    Object.keys(this.props.rev.postedRevisions).length !== 0  ?  //if
                        <RevisionTabs data={this.props.rev.postedRevisions} mine={true}/> : //else if
                    !this.props.rev.fetched ? //if it's not fetched, loading
                        <Loading style={{marginTop: '10%'}}/> : //else if it is fetched (and has length of 0) 
                    this.noRevisions(true, text) 
                }
                </Segment>
                <Segment className="toReview">
                <Header>
                    {text.reviewRev.title}
                </Header>
                {   
                    Object.keys(this.props.rev.revisions).length !== 0 ?  //if
                        <RevisionTabs data={this.props.rev.revisions} mine={false}/> :
                    !this.props.rev.fetched ? //if it's not fetched, loading
                        <Loading style={{marginTop: '10%'}}/> : //else if it is fetched (and has length of 0) 
                    this.noRevisions(false, text) 
                }
                </Segment>
            </Segment>
            )
        }
    }

@connect((store)=>{
    return {
        user: store.userManagement,
        home: store.homeManagement,
        rev: store.revisionManagement,
        lang: store.langManagement.lang,
    }
})
class RevisionTabs extends Component {
    //Sorts all revisions into 3 tabs and renders them
    constructor(props){
        super(props)

        this.revisions = {
            'pending_approval': [],
            'approved': [],
            'rejected': [],
        }

        this.dataProcessing(props.data);

        this.panes = [
            this.revisions.pending_approval.length !== 0 || !this.props.mine ? { menuItem: lang[this.props.lang].revisions.pending_t, render: () => <Tab.Pane>
                {this.loopThroughRevs(this.revisions.pending_approval)}
            </Tab.Pane> } : undefined,
            this.revisions.approved.length !== 0 ? { menuItem: lang[this.props.lang].revisions.approved_t, render: () => <Tab.Pane>
                {this.loopThroughRevs(this.revisions.approved)}
            </Tab.Pane> } : undefined,
            this.revisions.rejected.length !== 0 ? { menuItem: lang[this.props.lang].revisions.rejected_t, render: () => <Tab.Pane>
                {this.loopThroughRevs(this.revisions.rejected)}
            </Tab.Pane> } : undefined,
        ]
    }

    dataProcessing(data){
        data.forEach((element) => {
            this.revisions[element.status.toLowerCase().replace(" ","_")].push(element)
        })
    }

    reFetch() {
        this.props.dispatch(
            fetchUserRevisions(
                this.props.user.currentlyLoggedUser.username.id,
                this.props.user.currentlyLoggedUser.username.token,
            )
        )
    }

    renderPost(object, mine, key){
        // TODO: IMPLEMENT DYNAMIC ADDING TO APPROVED OR REJECTED
        return (     
            <RevisionItem key={key} reFetch={this.reFetch.bind(this)} className={object.status} {...object} mine={mine}/>
        )
    }

    loopThroughRevs(data){
        return(
            <div className="revisionTab">
                {data.length !== 0 ? data.map((object, i) => this.renderPost(object, this.props.mine, i)) :
                <Message info>{lang[this.props.lang].revisions.reviewRev.noRevs}</Message>
                }
            </div>
        )
    }

    chooseActiveIndex() {
        for (let i = 0; i < this.panes.length; i++) {
            if(this.panes[i] !== undefined) {
                return i
            }
        }
    }

    render(){
        return(
            <Tab menu={{ 
                    stackable: true, 
                    size: "massive", 
                    color: "blue", 
                    secondary: true , 
                    pointing: true,
                }} panes={this.panes}
                defaultActiveIndex={this.props.mine ? this.chooseActiveIndex() : 0} />
        )
    }
}
