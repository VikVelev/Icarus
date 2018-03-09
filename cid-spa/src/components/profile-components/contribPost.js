import React, { Component } from 'react'
import { Item, Segment } from 'semantic-ui-react'
import * as moment from 'moment'
import Canvas3D from '../viewport/canvas3d.js'

export default class ContribPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
        }
    }
    
    mountCanvas = () => {
        if (this.state.rendearing){
            return(
                //RETURN COMMIT DIFF Canvas with the same camera controls
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
        this.date_uploaded = moment(this.props.date_uploaded)._d.toString().substring(0, moment(this.props.date_uploaded)._d.toString().length - 14)        
        return(
            <div className="profilePostWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                        <Item.Meta as='p'>Version 1.0.0{/*think of a way to keep track of this*/}</Item.Meta>
                    </Item.Content>
                </Item>
                {this.mountCanvas()}
            </div>
        )
    }

}