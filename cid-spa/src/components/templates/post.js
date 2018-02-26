import React, { Component } from 'react'
import { Accordion, Item, Segment } from 'semantic-ui-react'

class PostTemplate extends Component {
    render () {
        return(
            <Item className="post">
                <Item.Image size='medium' src={this.props.image} style={{
                    padding: '20px'    
                }} />

                <Item.Content>

                    <Item.Header style={{ fontSize: '1.3em' }}>Cute Dog</Item.Header>
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
                    <Segment style={{width:'100%', height: "500px"}}>
                    what
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