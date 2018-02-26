import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react'

export default class Profile {
    
    constructor(props){
        super(props)
        
        this.userId = props.userId
        this.modelFeed = props.modelFeed
        this.favoritesFeed = props.favoritesFeed
    }

    render(){
        return(
            <Segment className="profilePage"></Segment>
        )
    }

}