import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Item, Dropdown } from 'semantic-ui-react'
import * as moment from 'moment'

import AddCommit from '../addCommitForm.js'
import DeleteModal from '../deleteModal.js' 


export default class ModelPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
            addingCommit: false,
            deletingModel: false,
            modelID: undefined,
        }
    }

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    handleAddCommit(e, {name}){
        e.preventDefault();
        e.stopPropagation();

        this.setState({ addingCommit: true, modelID: name })        
    }

    handleDeleteModel(e, {name}){
        e.preventDefault();
        e.stopPropagation();
 
        this.setState({ deletingModel: true, modelID: name })        
    }

    render(){
        this.date_uploaded = moment(this.props.date_uploaded).fromNow()
        return(
            <div className="profilePostWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>Created by {<a>{this.props.owners[0].username}</a>}</Item.Meta>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                    </Item.Content>

                    <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header content='Manage'/>
                            <Dropdown.Item disabled={this.props.commits.length === 0} as={Link} to={"model/" + this.props.id}> View </Dropdown.Item>                                           
                            {!this.props.isUser ? <Dropdown.Item disabled> Edit </Dropdown.Item> : null }
                            {!this.props.isUser ?  <DeleteModal trigger={
                                <Dropdown.Item  name={this.props.id} 
                                                onClick={this.handleDeleteModel.bind(this)}> 
                                    Delete 
                                </Dropdown.Item>
                            } type="model" id={this.state.modelID}/> : null }
                            <Dropdown.Divider/>
                            <Dropdown.Header content='Version Control'/>
                            <Dropdown.Item disabled={this.props.commits.length === 0} 
                                            as="a" 
                                            href={this.props.commits.length !== 0 ? this.props.commits[0].new_version : "#"} 
                                            download={this.props.title} > Download mesh
                            </Dropdown.Item>   
                            <Dropdown.Item disabled={this.props.commits.length === 0} 
                                            as="a" 
                                            href={this.props.commits.length !== 0 ? this.props.commits[0].new_textures : "#"} 
                                            download={this.props.title} > Download textures
                            </Dropdown.Item>   
                            <AddCommit trigger={<Dropdown.Item disabled={this.props.isUser} name={this.props.id} onClick={this.handleAddCommit.bind(this)}> Add Commit </Dropdown.Item>} id={this.state.modelID}/>
                            <Dropdown.Item disabled> Add Owner </Dropdown.Item>                                                                                        
                            <Dropdown.Item disabled> Commit Chain </Dropdown.Item>                                                                 
                        </Dropdown.Menu>
                    </Dropdown>
                </Item>
            </div>
        )
    }
}