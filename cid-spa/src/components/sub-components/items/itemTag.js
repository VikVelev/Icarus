import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'


export default class ItemTag extends Component {
    render(){
        if(this.props.type === "edited") {
            return (
                <Message className="edited">Edited</Message>
            )
        } else if (this.props.type === "fork"){
            return (
                <Message className="edited">Fork</Message>            
            )
        }
    }
}