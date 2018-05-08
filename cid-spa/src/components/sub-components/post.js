import React, { Component } from 'react'
import { Message, Item, Segment, Dropdown } from 'semantic-ui-react'

import * as moment from 'moment'

import { Link } from 'react-router-dom'
import Canvas3D from '../viewport/canvas3d.js'
//import { getModelbyID } from '../../actions/profileActions.js';
import { connect } from 'react-redux';
import lang from '../../lang.js'
@connect((store) => {
    return {
        profile: store.profileManagement,
        page: store.pageManagement,
        user: store.userManagement,
        lang: store.langManagement.lang,
    }
})
export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
            inProfile: false,
            edit: false,
            editing: false,
            edited: false,
            deleted: false,
            deleting: false,
            inDiff: false,
        }
        //If I am not mistaken 2 months ago
        //inProfile boolean indicates that if you are is in your profile, not all profiles.
        if(this.props.inProfile !== undefined) {
            this.state.inProfile = this.props.inProfile
        }

        if(this.props.inDiff !== undefined) {
            this.state.inDiff = this.props.inDiff
        }
    }

    mountCanvas = () => {
        let content = this.props.content.commits[0]

        if (this.state.rendering){
            if(this.props.page.currentModel !== undefined && content !== undefined){
                return(
                    <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                        <Canvas3D modelPath={content.new_version} 
                                  texturePath={content.new_textures}
                                  canvasId={this.props.id}/>
                    </Segment>
                )
            } else {
                return (
                    <Message info>
                        This model has no commits.
                    </Message>
                )
            }
        } else {
            return null
        }
    }

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    handleEdit() {
        console.log("Entering edit mode")
        this.setState({ edit: true })
    }

    submitEdit() {
        this.setState({ editing: true })      
        console.log("Submitting edit")
    }

    handleDelete() {
        this.setState({ 
            deleting: true, 
            deleted: false, 
        })
        console.log("deleting")
    }

    callbackDelete() {
        this.setState({ 
            deleting: false, 
            deleted: true, 
        }) 
        console.log("deleted")
    }

    callbackEdit() {
        this.setState({ 
            editing: false, 
            edited: true, 
            edit: false 
        })         
        console.log("edited")
    }

    editMode() {
        console.log("Edit mode")
    }

    post(){
        this.date_posted = moment(this.props.date_posted).fromNow()
        let text = lang[this.props.lang].post

        let image = this.props.image

        if(!image) {
            image = "/img/default_post.png"
        }

        return(
            <div className="postWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Image className="minWidthImage" size='small' style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundColor: '#ccc',
                        borderRadius: "5px",
                        margin: '5px',
                        marginRight: '20px',
                    }}/>
                    
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>                                    
                            <div className="titleBox">
                                <Link style={{color: 'black'}} to={"/model/" + this.props.content.id}>
                                    {this.props.title}
                                </Link>
                                {this.props.edited ? <Message className="edited" >Edited</Message> : null }
                            </div>
                        </Item.Header>
                        { 
                            !this.state.inProfile ? 
                                <Item.Meta>{text.postedBy + " "}
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
                    </Item.Content>
                    { 
                        !this.state.inProfile && !this.state.inDiff ?
                            <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                                <Dropdown.Menu>
                                    <Dropdown.Header content={text.menu.versionControl}/>
                                    <Dropdown.Item as={Link} to={"model/" + this.props.content.id}> {text.menu.commits} </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> 
                        : null
                    }
                    {
                        this.state.inProfile ? 
                        <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                            <Dropdown.Menu>
                                <Dropdown.Header content='Manage'/>
                                <Dropdown.Item onClick={this.handleEdit}> {text.menu.edit} </Dropdown.Item>                                
                                <Dropdown.Item onClick={this.handleDelete}> {text.menu.delete} </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> : null
                    }
                </Item>
                { !this.state.inProfile ? !this.state.inDiff ? this.mountCanvas() : null : null}
            </div>
        )
    }

    render() {
        return(
            !this.state.deleted ? this.post() : null
        )
    }

}