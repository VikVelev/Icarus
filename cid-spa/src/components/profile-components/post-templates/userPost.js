import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Item, Segment, Dropdown } from 'semantic-ui-react'
import * as moment from 'moment'

import AddCommit from '../addCommitForm.js'
import Canvas3D from '../../viewport/canvas3d.js'
import DeleteModal from '../deleteModal.js' 
import lang from '../../../lang.js'

import { connect } from 'react-redux'

@connect((store)=>{
    return {
        lang: store.langManagement.lang,
    }
})
export default class UserPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
            editingPost: false,
            deletingPost: false,
            modelID: undefined,
        }
    }
    
    mountCanvas = () => {
        if (this.state.rendering){
            return(
                <Segment className="canvas3d" style={{ width:'100%', height: "500px",padding: 0 }}>
                    <Canvas3D modelPath={this.props.commits[0].new_version}  
                              modelPath={this.props.commits[0].new_textures}/>
                </Segment>
            )
        } else {
            return null
        }
    }

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    handleEditPost(e, {name}){
        e.preventDefault()
        e.stopPropagation()

        this.setState({ editingPost: true, modelID: name })        
    }

    handleDeletePost(e, {name}){
        e.preventDefault()
        e.stopPropagation()

        this.setState({ deletingPost: true, modelID: name })        
    }

    render(){
        this.date_uploaded = moment(this.props.date_uploaded).fromNow()
        let text = lang[this.props.lang].post
        return(
            <div className="profilePostWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                    </Item.Content>

                    <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header content={text.menu.manage}/>
                            {/* <Dropdown.Item disabled={this.props.commits.length === 0 ? true : false} as={Link} to={"model/" + this.props.id}> View </Dropdown.Item>                             */}
                            <Dropdown.Item disabled> {text.menu.edit} </Dropdown.Item>
                            <DeleteModal trigger={<Dropdown.Item name={this.props.id} onClick={this.handleDeletePost.bind(this)}> {text.menu.delete} </Dropdown.Item>} id={this.state.modelID}/>                             
                            <Dropdown.Header content='Version Control'/>
                            <Dropdown.Item disabled> {text.menu.versionControl} </Dropdown.Item>                            
                            {/* <AddCommit trigger={<Dropdown.Item name={this.props.id} onClick={this.handleAddCommit.bind(this)}> Add Commit </Dropdown.Item>} id={this.state.modelID}/>  */}
                            <Dropdown.Item disabled> {text.menu.addOwner} </Dropdown.Item>
                            <Dropdown.Item disabled> {text.menu.commits} </Dropdown.Item>                                                                 
                        </Dropdown.Menu>
                    </Dropdown>
                </Item>
                {this.mountCanvas()}
            </div>
        )
    }
}