import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Item, Dropdown, Segment, Message } from 'semantic-ui-react'
import * as moment from 'moment'

import Canvas3D from '../../viewport/canvas3d.js'

import AddCommit from '../addCommitForm.js'
import DeleteModal from '../deleteModal.js' 

import { connect } from 'react-redux'
import lang from '../../../lang.js'

@connect((store) => {
    return {
        profile: store.profileManagement,
        lang: store.langManagement.lang,
    }
})
export default class ModelPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
            addingCommit: false,
            deletingModel: false,
            deleted: false,
            modelID: undefined,
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
            <div className="profilePostWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>
                            <Link style={{color: 'black'}} 
                                to={"/model/" + this.props.id}>
                                {this.props.title}
                            </Link>
                        </Item.Header>
                        <Item.Meta as='p'>{text.createdBy} {<a>{this.props.owners[0].username}</a>}</Item.Meta>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                    </Item.Content>

                    <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header content={text.menu.manage}/>
                            <Dropdown.Divider/>                                                                     
                            {!this.props.isUser ? <Dropdown.Item disabled> {text.menu.edit} </Dropdown.Item> : null }
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
            </div>
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