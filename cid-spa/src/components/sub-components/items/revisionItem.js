import React, { Component } from 'react'
import { Item, Segment, Dropdown, Icon } from 'semantic-ui-react'

import * as moment from 'moment'

import { Link } from 'react-router-dom'
import Canvas3D from '../../viewport/canvas3d.js'
//import { getModelbyID } from '../../actions/profileActions.js';
import { connect } from 'react-redux';

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

    mountCanvas = () => {
        let content = this.props
        console.log(content)
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
                        { 
                            !this.state.inProfile ? 
                                <Item.Meta>Posted by{" "}
                                    {
                                        <Link to={"/profile/" + this.props.posted_by.id}>
                                            {this.props.posted_by.username}
                                        </Link>
                                    }
                                </Item.Meta>
                            : null
                        }
                        <Item.Meta as='p'>{this.date_posted}</Item.Meta>
                        <Item.Description>
                            <p>{this.props.description}</p>
                        </Item.Description>
                        </Item.Group>
                        
                        <Item.Group className="groupItem choices">
                            <Icon className="choice" name="check" size="big"/>
                            <Icon className="choice" name="close" size="big"/>
                        </Item.Group>                        
                    
                    </Item.Content>
                </Item>
                { this.mountCanvas() }
            </div>
        )
    }

}