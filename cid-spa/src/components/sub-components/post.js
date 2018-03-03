import React, { Component } from 'react'
import { Item, Segment } from 'semantic-ui-react'

import Canvas3D from '../viewport/canvas3d.js'

class PostTemplate extends Component {
    render () {
        return(
            <Item className="post" onClick={this.props.onClick}>
                <Item.Image size='small' src={this.props.image} style={{
                    padding: '20px'    
                }} />

                <Item.Content>

                    <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                    <Item.Meta as='p'>Posted by {<a href={this.props.user.id}>{this.props.user.name}</a>}</Item.Meta>
                    <Item.Meta as='p'>{this.props.date}</Item.Meta>
                    <Item.Description>
                        <p>{this.props.description}</p>
                    </Item.Description>

                </Item.Content>
            </Item>
        )
    }
}

export default class Post extends Component {
    constructor(props){
        super(props)

        this.state = {
            rendering: true,

        }
    }
    
    mountCanvas = () => {
        if (this.state.rendering){
            return(
                <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                    <Canvas3D modelPath={this.props.feedData.modelPath} modelName={this.props.feedData.modelName}/>
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
            <div className="postWrapper">
                <PostTemplate {...this.props.feedData} onClick={this.clickHandler.bind(this)}/>
                {this.mountCanvas()}
            </div>
        )
    }

}