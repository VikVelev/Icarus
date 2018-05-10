// If you are looking for the Diff functionality code, it's in the viewport folder, not here.
// It is abstracted into chunks all around the Model3D, Viewport THREE.js classes I made.

import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import  CommitEntry from './commitEntry.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class CommitChain extends Component {
    
    constructor(props) {
        super(props);
        this.data = []

    }

    renderPost(object, i){
        return (          
            <Segment id={object.id} key={i} className="profile-post-container">
                <CommitEntry{...object}/>
            </Segment>
        )
    }

    render(){   
        return(
            <div className="feedContainer">
                <div className="feed">
                    { 
                        Object.keys(this.props.commits).length !== 0 ?  //if
                        this.props.commits.map((object, i) => this.renderPost(object,i)) 
                        : null
                    }
                </div> 
            </div>
        )
    }
}
