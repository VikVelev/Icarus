import React, { Component } from 'react'
import { Item, Segment } from 'semantic-ui-react'

import * as moment from 'moment'

import Canvas3D from '../viewport/canvas3d.js'
//import { getModelbyID } from '../../actions/profileActions.js';
import { connect } from 'react-redux';

@connect((store) => {
    return {
        profile: store.profileManagement,
        page: store.pageManagement,
        user: store.userManagement,
    }
})
export default class Post extends Component {
    constructor(props){
        super(props)        
        this.state = {
            rendering: false,
        }
    }

    mountCanvas = () => {
        if (this.state.rendering){
            if(this.props.page.currentModel !== undefined){
                return(
                    <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                        <Canvas3D modelPath={this.props.content}/>
                    </Segment>
                )
            } else {
                return null
            }
        } else {
            return null
        }
    }

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    render(){
        this.date_posted = moment(this.props.date_posted)._d.toString().substring(0, moment(this.props.date_posted)._d.toString().length - 14)        
        
        return(
            <div className="postWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Image size='small' style={{
                        backgroundImage: "url(" + this.props.image + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundColor: '#ccc',
                        borderRadius: "5px",
                        margin: '5px',
                        marginRight: '20px',
                    }}/>
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>Posted by {<a>{this.props.posted_by}</a>}</Item.Meta>
                        <Item.Meta as='p'>{this.date_posted}</Item.Meta>
                        <Item.Description>
                            <p>{this.props.description}</p>
                        </Item.Description>
                    </Item.Content>
                </Item>
                {this.mountCanvas()}
            </div>
        )
    }

}