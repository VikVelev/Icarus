import React, { Component } from 'react'
import { Item, Segment, Button } from 'semantic-ui-react'
import * as moment from 'moment'

import AddCommit from './addCommitForm.js'
import Canvas3D from '../viewport/canvas3d.js'

export default class ModelPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
            addingCommit: false,
            modelID: undefined,
        }
    }
    
    mountCanvas = () => {
        if (this.state.rendering){
            return(
                <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                    <Canvas3D modelPath={this.props.commits[this.props.commits-1].new_version}/>
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
                    
                    <AddCommit trigger={<Button name={this.props.id} className="addContrib" color="blue" onClick={this.handleAddCommit.bind(this)}>Add commit</Button>} id={this.state.modelID}/>
                </Item>
                {this.mountCanvas()}
            </div>
        )
    }

}