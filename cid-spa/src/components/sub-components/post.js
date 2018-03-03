import React, { Component } from 'react'
import { Accordion, Item, Segment } from 'semantic-ui-react'

import Canvas3D from '../viewport/canvas3d.js'

class PostTemplate extends Component {
    render () {
        return(
            <Item className="post">
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
        this.panels = [{
            title: {
                content: <PostTemplate {...this.props.feedData}/>,
                key: "title",
            },
            content: {
                content: (
                    <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                        <Canvas3D model="/models/aventador/Avent.obj"/>
                    </Segment>
                ),
                key: "content"
            },
        }]
    }
    
    
    render(){
        return(
            <Accordion panels={this.panels}/>
        )
    }

}