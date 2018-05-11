import React, { Component } from 'react'
import { Item, Segment, Icon } from 'semantic-ui-react'

import * as moment from 'moment'
import 'moment/locale/bg'

import { Link } from 'react-router-dom'
//import { getModelbyID } from '../../actions/profileActions.js';
import { connect } from 'react-redux';
import { approveRevision, rejectRevision } from '../../../actions/revisionActions.js'
import ReviewWindow from './reviewWindow.js'
import lang from '../../../lang.js'
@connect((store) => {
    return {
        profile: store.profileManagement,
        page: store.pageManagement,
        user: store.userManagement,
        rev: store.revisionManagement,
        lang: store.langManagement.lang
    }
})
export default class RevisionItem extends Component {
    constructor(props){
        super(props)

        moment.locale(this.props.lang)
        this.state = {
            status: props.status,
            rendering: false,
            approved: false,
            rejected: false,
        }
    }

    componentWillMount(){
        this.setState({
            rendering: false,
            approving: false,
            rejecting: false,
            approved: false,
            rejected: false,
            deleted: false,
        })
    }

    rejectCallback() {
        this.setState({ rejected: true, rejecting: false, deleted: true, })  
        this.props.reFetch()
    }


    approveCallback() {
        this.setState({ approved: true, approving: false, deleted: true, })
        this.props.reFetch()        
    }

    handleReject(e){
        e.preventDefault()
        e.stopPropagation()
        
        this.setState({
            rejecting: true
        })

        this.props.dispatch(
            rejectRevision(
                this.props.user.currentlyLoggedUser.username.id,
                this.props.id,
                this.props.user.currentlyLoggedUser.username.token,
            )
        )
    }

    handleApprove(e){
        e.preventDefault()
        e.stopPropagation()
        
        this.setState({
            approving: true
        })

        this.props.dispatch(
            approveRevision(
                this.props.user.currentlyLoggedUser.username.id,
                this.props.id,
                this.props.user.currentlyLoggedUser.username.token,
            )
        )
    }

    // Implement the 3D Canvas to show the difference between this and the last model

    renderHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    renderPost() {
        this.date_posted = moment(this.props.date_posted).fromNow()
        let text = lang[this.props.lang].revisionItem
        return(
            <Segment className={"postWrapper " + this.props.status}>
                <Item onClick={this.renderHandler.bind(this)}>               
                    <Item.Content className="revisionItem">
                        <Item.Group className="groupItem">
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta>{text.postedBy}{" "}
                            {
                                <Link to={"/profile/" + this.props.posted_by.id}>
                                    {this.props.posted_by.username}
                                </Link>
                            }
                        </Item.Meta>
                        <Item.Meta>{text.model}:{" "}
                            {
                                <Link to={"/model/" + this.props.model.id}>
                                    {this.props.model.title}
                                </Link>
                            }
                        </Item.Meta>
                        <Item.Meta as='p'>{text.status}: {this.props.status}</Item.Meta>                        
                        <Item.Meta as='p'>{this.date_posted}</Item.Meta>
                        <Item.Description>
                            <p>{this.props.commit_details}</p>
                        </Item.Description>
                        </Item.Group>
                        {!this.props.mine && ( this.props.status !== "APPROVED" && this.props.status !== "REJECTED" )?
                            <Item.Group className="groupItem choices">
                                <ReviewWindow trigger={
                                    <Icon className="choice" name="eye" size="huge"/>                       
                                } content={this.props}/>
                                <Icon onClick={this.handleApprove.bind(this)} className="choice" name="check" size="huge"/>
                                { this.props.rev.approving && this.state.approving && !this.state.approved ? this.approveCallback() : null }
                                <Icon onClick={this.handleReject.bind(this)} className="choice" name="close" size="huge"/>
                                { this.props.rev.rejecting && this.state.rejecting && !this.state.rejected ? this.rejectCallback() : null }                   
                            </Item.Group>                      
                        : //else
                            <Item.Group className="groupItem choices">
                                <ReviewWindow trigger={
                                    <Icon onClick={this.handleReview.bind(this)}className="choice" name="eye" size="huge"/>                        
                                } content={this.props}/>
                            </Item.Group>  
                        }
                    </Item.Content>
                </Item>
                { /*this.mountCanvas() */}
            </Segment>
        )
    }


    render(){
        return(
            !this.state.deleted ? this.renderPost() : null
        )
    }

}