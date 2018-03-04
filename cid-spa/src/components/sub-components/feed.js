import React, { Component } from 'react'

import Post from './post'
import { Segment } from 'semantic-ui-react';


export default class Feed extends Component {
    
    renderLoop(){
        //for something in something render
        return (                
            <Segment  id={this.props.elId} className="post-container" style={{
                marginTop: '5px',
                marginLeft: '20%',
                marginRight: '20%',}}>
                <Post {...this.props}/>
            </Segment>
        )
    }

    render(){
        return(
            <div className="feed">
                {this.renderLoop()}
            </div> 
            )
        }
    }
