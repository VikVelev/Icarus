import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Item, Segment, Dropdown } from 'semantic-ui-react'
import * as moment from 'moment'

import AddCommit from '../addCommitForm.js'
import Canvas3D from '../../viewport/canvas3d.js'
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
    
    mountCanvas = () => {
        if (this.state.rendering){
            return(
                <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                    <Canvas3D modelPath={this.props.commits[this.props.commits.length-1].new_version}/>
                </Segment>
            )
        } else {
            return null
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
        console.log(name)
        this.setState({ deletingModel: true, modelID: name })        
    }

    render(){
        this.date_uploaded = moment(this.props.date_uploaded)._d.toString().substring(0, moment(this.props.date_uploaded)._d.toString().length - 14)
        
        return(
            <div className="profilePostWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>Created by {<a>{this.props.owners[0]}</a>}</Item.Meta>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                    </Item.Content>

                    <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header content='Manage'/>
                            <Dropdown.Item disabled={this.props.commits.length === 0 ? true : false} as={Link} to={"model/" + this.props.id}> View </Dropdown.Item>                         
                            {!this.props.isUser ? <Dropdown.Item disabled> Edit </Dropdown.Item> : null }
                            {!this.props.isUser ?  <DeleteModal trigger={<Dropdown.Item name={this.props.id} onClick={this.handleDeleteModel.bind(this)}> Delete </Dropdown.Item>} type="model" id={this.state.modelID}/> : null }
                            <Dropdown.Header content='Version Control'/>
                            <AddCommit trigger={<Dropdown.Item disabled={this.props.isUser} name={this.props.id} onClick={this.handleAddCommit.bind(this)}> Add Commit </Dropdown.Item>} id={this.state.modelID}/>
                            <Dropdown.Item disabled> Add Commit </Dropdown.Item>                                                                                             
                            <Dropdown.Item disabled> Commit Chain </Dropdown.Item>                                                                 
                        </Dropdown.Menu>
                    </Dropdown>
                </Item>
                {this.mountCanvas()}
            </div>
        )
    }
}