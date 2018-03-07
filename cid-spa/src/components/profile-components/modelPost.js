import React, { Component } from 'react'
import { Item, Segment } from 'semantic-ui-react'

import Canvas3D from '../viewport/canvas3d.js'

export default class ModelPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
        }
    }
    
    mountCanvas = () => {
        if (this.state.rendearing){
            return(
                <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                    <Canvas3D modelPath={this.props.filename} modelName={this.props.content.modelName}/>
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
        return(
            <div className="profilePostWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Image size='small' src={this.props.image} style={{
                        padding: '20px'    
                    }} />

                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>Created by {<a>{this.props.owners[0]}</a>}</Item.Meta>
                        <Item.Meta as='p'>{this.props.date_uploaded}</Item.Meta>
                    </Item.Content>
                </Item>
                {this.mountCanvas()}
            </div>
        )
    }

}