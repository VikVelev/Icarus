import React, { Component } from 'react'
import { Message, TextArea, Input, Item, Button, Segment, Dropdown } from 'semantic-ui-react'

import * as moment from 'moment'

import { Link } from 'react-router-dom'
import Canvas3D from '../viewport/canvas3d.js'
import { connect } from 'react-redux';
import { editPost } from '../../actions/profileActions.js'
import ItemTag from './items/itemTag.js'
import lang from '../../lang.js'
import 'moment/locale/bg'
import DeleteModal from '../profile-components/deleteModal.js';


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
            editMode: {
                title: this.props.title,
                description: this.props.description,
            }
        }

        moment.locale(this.props.lang)
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
                                  />
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

    handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ 
            deleting: true, 
            deleted: false, 
        })
    }

    handleEdit(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ edit: true })
    }

    submitEdit(e) {
        e.preventDefault();
        e.stopPropagation();

        let submitData = {
            ...this.state.editMode,
        }

        this.props.dispatch(
            editPost(
                this.props.id,
                submitData,
                this.props.user.currentlyLoggedUser.username.token
            )
        )
        this.setState({ 
            editing: true,
            ...this.state.editMode
        })      
    }

    callbackEdit() {
        this.props.dispatch({ type: "EDIT_REFRESH"})

        this.setState({ 
            editing: false, 
            edited: true, 
            edit: false 
        })         
    }

    stopEdit() {
        this.setState({
            editMode: {
                title: this.props.title,
                description: this.props.description
            }
        })
        this.setState({
            editing: false,
            edit: false,
        })
    }

    deleteThis(){
        this.props.dispatch({ type: "DELETE_REFRESH"})
        this.setState({
            deleting: false,
            deleted: true,
        })
    }

    handleChange = (e, { name, value}) => {
        this.setState({ 
            editMode: {
                ...this.state.editMode,
                [name]: value
            }
        })
    }

    editMode(image) {
        return(
            <Item className="post editMode" onClick={this.clickHandler.bind(this)}>
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
                            <Input type="text"
                                name="title"
                                value={this.state.editMode.title}
                                onChange={this.handleChange}
                                size="mini"
                            />
                        </div>
                    </Item.Header>
                    <Item.Description style={{marginTop: '10px'}}>
                            <TextArea
                                className="descriptionEdit"
                                name="description"
                                autoHeight
                                style={{minWidth: '180px'}}
                                value={this.state.editMode.description}
                                onChange={this.handleChange}                                
                                size="medium"
                            />
                    </Item.Description>
                </Item.Content> 
                <div className="buttons">
                    <Button color="blue" 
                            loading={this.state.editing}
                            className="stopEdit" 
                            onClick={this.submitEdit.bind(this)}> Save </Button>                
                    <Button color="red" 
                            loading={this.state.editing}                            
                            className="stopEdit"
                            onClick={this.stopEdit.bind(this)}> Stop </Button>
                    {this.props.profile.edited ? this.callbackEdit() : null}
                </div>
            </Item>
        )
    }

    post(){
        this.date_posted = moment(this.props.date_posted).fromNow()
        let text = lang[this.props.lang].post

        let image = this.props.image

        if(!image) {
            image = "/img/default_post.png"
        }

        return(
            <Segment key={this.props.key} className={this.props.className}>
                <div className="postWrapper">
                    {
                        this.state.edit ? this.editMode(image) :
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
                                            {this.state.edited ? this.state.editMode.title : this.props.title}
                                        </Link>
                                        {this.props.edited ? <ItemTag type="edited"/> : null }
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
                                    <p>{this.state.edited ? this.state.editMode.description : this.props.description}</p>
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
                                        <Dropdown.Item onClick={this.handleEdit.bind(this)}> {text.menu.edit} </Dropdown.Item>                                
                                        <DeleteModal {...this.props} type="post" trigger={<Dropdown.Item onClick={this.handleDelete.bind(this)}> {text.menu.delete} </Dropdown.Item>}/>
                                    </Dropdown.Menu>
                                </Dropdown> : null
                            }
                        </Item>
                    }
                    { !this.state.inProfile && !this.state.edit ? !this.state.inDiff ? this.mountCanvas() : null : null}
                </div>
            </Segment>
        )
    }

    render() {

        if(this.props.profile.deletedPost && this.state.deleting) {
            this.deleteThis()
        }

        return(
            !this.state.deleted ? this.post() : null
        )
    }

}