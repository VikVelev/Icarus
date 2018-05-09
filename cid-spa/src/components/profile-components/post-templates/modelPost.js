import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Item, Dropdown, Button, TextArea, Input, Segment, Message } from 'semantic-ui-react'
import * as moment from 'moment'
import 'moment/locale/bg'

import Canvas3D from '../../viewport/canvas3d.js'
import ItemTag from '../../sub-components/items/itemTag.js'
import { editModel } from '../../../actions/profileActions.js'
import AddCommit from '../addCommitForm.js'
import DeleteModal from '../deleteModal.js' 

import { connect } from 'react-redux'
import lang from '../../../lang.js'

@connect((store) => {
    return {
        profile: store.profileManagement,
        user: store.userManagement,
        lang: store.langManagement.lang,
    }
})
export default class ModelPost extends Component {
    constructor(props){
        super(props)
        moment.locale(this.props.lang)
        this.state = {
            rendering: false,
            addingCommit: false,
            deletingModel: false,
            deleted: false,
            edit: false,
            editing: false,
            edited: false,
            modelID: undefined,
            editMode: {
                title: this.props.title,
                description: this.props.description
            }
        }
    }

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    handleAddCommit(e, {name}){
        e.preventDefault()
        e.stopPropagation()

        this.setState({ addingCommit: true, modelID: name })        
    }

    handleDeleteModel(e, {name}){
        e.preventDefault()
        e.stopPropagation()
 
        this.setState({ deletingModel: true, modelID: name })  
    }

    handleEdit(e){
        e.preventDefault()
        e.stopPropagation() 

        this.setState({ edit: true })
    }

    handleChange = (e, { name, value}) => {
        this.setState({ 
            editMode: {
                ...this.state.editMode,
                [name]: value
            }
        })
    }

    submitEdit(e) {
        e.preventDefault();
        e.stopPropagation();

        let submitData = {
            ...this.state.editMode,
        }

        this.props.dispatch(
            editModel(
                this.props.user.currentlyLoggedUser.username.id,
                this.props.id,
                submitData,
                this.props.user.currentlyLoggedUser.username.token,
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
            edited: true,
            editing: false,
            edit: false 
        })
    }

    stopEdit(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            editMode: {
                title: this.props.title,
                description: this.props.description
            }
        })
        this.setState({
            edit: false,
            editing: false,
        })
    }

    editMode(text){
        return (
            <div className="profilePostWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>
                            <Input type="text"
                                    name="title"
                                    value={this.state.editMode.title}
                                    onChange={this.handleChange}
                                    size="mini"
                                />
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
            </div>
        )
    }

    callbackDeleteModel() {
        this.setState({ deletingModel: false, deleted: true })
        this.props.dispatch({ type: "DELETE_REFRESH" })
    }

    mountCanvas = () => {
        if (this.state.rendering){
            return(
                //modelPath is the latest commit's model.
                <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                    <Canvas3D modelPath={this.props.commits[0].new_version} 
                              texturePath={this.props.commits[0].new_textures}/>
                </Segment>
            )
        } else {
            return null
        }
    }

    returnPost() {
        let commitsLength = this.props.commits.length
        let text = lang[this.props.lang].model

        return(
            <Segment id={this.props.id} className="contribPost">
            
            { !this.state.edit ? 
            <div className="profilePostWrapper">
                    <Item className="post" onClick={this.clickHandler.bind(this)}>
                        <Item.Content>
                            <Item.Header style={{ fontSize: '1.3em' }}>
                                <div className="titleBox">
                                    <Link style={{color: 'black'}} 
                                        to={"/model/" + this.props.id}>
                                        {this.state.edited ? this.state.editMode.title : this.props.title }
                                    </Link>
                                    {this.props.is_fork ? <ItemTag type="fork"/> : null }
                                </div>                                
                            </Item.Header>
                            <Item.Meta as='p'>{text.createdBy} {<a>{this.props.owners[0].username}</a>}</Item.Meta>
                            <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                            <p>{this.state.edited ? this.state.editMode.description : this.props.description }</p>
                        </Item.Content>

                        <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                            <Dropdown.Menu>
                                <Dropdown.Header content={text.menu.manage}/>
                                <Dropdown.Divider/>                                                                     
                                {!this.props.isUser ? 
                                    <Dropdown.Item onClick={this.handleEdit.bind(this)}> 
                                        {text.menu.edit}
                                    </Dropdown.Item> 
                                : null }
                                {!this.props.isUser ?  <DeleteModal trigger={
                                    <Dropdown.Item  name={this.props.id} 
                                                    onClick={this.handleDeleteModel.bind(this)}> 
                                        {text.menu.delete}
                                    </Dropdown.Item>
                                } type="model" id={this.state.modelID}/> : null }
                                <Dropdown.Divider/>
                                <Dropdown.Header content={text.menu.versionControl}/>
                                <Dropdown.Divider/>                            
                                <Dropdown.Item disabled={commitsLength === 0} as={Link} to={"/model/" + this.props.id}> {text.menu.commits} </Dropdown.Item> 
                                <AddCommit trigger={
                                    <Dropdown.Item name={this.props.id} 
                                                onClick={this.handleAddCommit.bind(this)}> 
                                        {text.menu.addCommit}
                                    </Dropdown.Item>
                                } id={this.state.modelID}/>
                                <Dropdown.Item disabled={commitsLength === 0} 
                                                as="a" 
                                                href={commitsLength !== 0 ? this.props.commits[0].new_version : "#"} 
                                                download={this.props.title} > {text.menu.downloadMesh}
                                </Dropdown.Item>   
                                <Dropdown.Item disabled={commitsLength === 0} 
                                                as="a" 
                                                href={commitsLength !== 0 ? this.props.commits[0].new_textures : "#"}
                                                download={this.props.title} > {text.menu.downloadTex}
                                </Dropdown.Item>
                                <Dropdown.Item disabled> {text.menu.addOwner} </Dropdown.Item>                                                                                        
                                
                            </Dropdown.Menu>
                        </Dropdown>
                    </Item>
                        { this.state.deletingModel && this.props.profile.deletedModel ?  this.callbackDeleteModel() : null }
                        { commitsLength > 0 ? this.mountCanvas() : this.state.rendering ? <Message info> {text.noCommitsInfo} </Message> : null }
                </div> : this.editMode(text) }
            </Segment>
        )
    }

    render(){
        this.date_uploaded = moment(this.props.date_uploaded).fromNow()

        return (
            this.state.deleted ? null : this.returnPost()
        )
    }
}