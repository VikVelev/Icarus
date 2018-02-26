import React, { Component } from 'react'

import Post from './post'
import { Segment, ItemGroup } from 'semantic-ui-react';

function Repeat(props) {
    let items = [];
    
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }

    return <ItemGroup relaxed className="feed" style={{marginTop: '30px', marginBottom: '30px'}}>{items}</ItemGroup>;
  }

export default class Feed extends Component {

    render(){
        return(
            //This repeat is just a simulation of a real loop.
            <Repeat numTimes={this.props.times ? this.props.times : 10}>         
                {(index) => (
                    <Segment key={index}id={this.props.elId} className="post-container" style={{
                            marginTop: '5px',
                            marginLeft: '20%',
                            marginRight: '20%',  
                    }}>
                        <Post {...this.props}/>
                    </Segment> 
                )}
            </Repeat>
        );
    }
}