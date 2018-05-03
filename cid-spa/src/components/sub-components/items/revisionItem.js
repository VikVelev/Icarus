import React, { Component } from 'react'
import { Item, Segment, Icon } from 'semantic-ui-react'

import * as moment from 'moment'

import { Link } from 'react-router-dom'
import Canvas3D from '../../viewport/canvas3d.js'
//import { getModelbyID } from '../../actions/profileActions.js';
import { connect } from 'react-redux';
import { approveRevision, rejectRevision } from '../../../actions/revisionActions.js'

@connect((store) => {
    return {
        profile: store.profileManagement,
        page: store.pageManagement,
        user: store.userManagement,
    }
})
export default class RevisionItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            status: "SYNCING",
            rendering: false,
            approved: false,
            rejected: false,
        }
    }
    
    handleApprove(e){
        e.preventDefault()
        e.stopPropagation()

        this.props.dispatch(
            approveRevision(
                this.props.user.currentlyLoggedUser.username.id,
                this.props.id,
                this.props.user.currentlyLoggedUser.username.token,
            )
        )
    }

    approveCallback(){
        //Implement success animation
        return(
            "Success Animation"
        )
    }

    handleReject(e){
        e.preventDefault()
        e.stopPropagation()
        
        this.props.dispatch(
            rejectRevision(
                this.props.user.currentlyLoggedUser.username.id,
                this.props.id,
                this.props.user.currentlyLoggedUser.username.token,
            )
        )
    }

    // Implement the 3D Canvas to show the difference between this and the last model
    mountCanvas = () => {
        let content = this.props
        if (this.state.rendering){
            return(
                <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                    <Canvas3D modelPath={content.commit_mesh}
                              texturePath={content.commit_textures}/>
                </Segment>
            )
        } else {
            return null
        }
    }

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    render(){
        this.date_posted = moment(this.props.date_posted).fromNow()
        
        return(
            <div className="postWrapper">
                <Item onClick={this.clickHandler.bind(this)}>               
                    <Item.Content className="revisionItem">
                        <Item.Group className="groupItem">
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta>Posted by{" "}
                            {
                                <Link to={"/profile/" + this.props.posted_by.id}>
                                    {this.props.posted_by.username}
                                </Link>
                            }
                        </Item.Meta>
                        <Item.Meta>Model:{" "}
                            {
                                <Link to={"/model/" + this.props.model.id}>
                                    {this.props.model.title}
                                </Link>
                            }
                        </Item.Meta>
                        <Item.Meta as='p'>Status: {this.props.status}</Item.Meta>                        
                        <Item.Meta as='p'>{this.date_posted}</Item.Meta>
                        <Item.Description>
                            <p>{this.props.commit_details}</p>
                        </Item.Description>
                        {/*TODO a implement Tabs for approved, rejected, pending*/}
                        </Item.Group>
                        {!this.props.mine && ( this.props.status !== "APPROVED" && this.props.status !== "REJECTED" )?
                        <Item.Group className="groupItem choices">
                            <Icon onClick={this.handleApprove.bind(this)} className="choice" name="check" size="big"/>
                            <Icon onClick={this.handleReject.bind(this)} className="choice" name="close" size="big"/>
                        </Item.Group>                      
                        : null}
                    </Item.Content>
                </Item>
                { this.mountCanvas() }
            </div>
        )
    }

}