import React, { Component } from 'react'
import { Item, Button } from 'semantic-ui-react'
import * as moment from 'moment'

import { connect } from 'react-redux'

@connect((store) => {
    return {
        model3d: store.model3DManagement
    }
})
export default class CommitEntry extends Component {
    constructor(props){
        super(props)
        this.state = {

            isLatest: false,
            button: {
                added: false
            }
        }
        this.isLatest()
    }

    isLatest() {
        if(this.props.id === this.props.model3d.model[0].commits[this.props.model3d.model[0].commits.length - 1].id) {
            this.setState({ isLatest: true })
            return true
        } else {
            return false
        }
    }

    compareHandler(e) {
        //Add this commit model to the canvas and set the canvas in diff mode
        this.setState({ button: { added: !this.state.button.added } })
    }

    render(){
<<<<<<< HEAD
        this.date_uploaded = moment(this.props.date)._d.toString().substring(0, moment(this.props.date_uploaded)._d.toString().length - 14)
=======
        this.date_uploaded = moment(this.props.date)._d.toString().substring(0, moment(this.props.date_uploaded)._d.toString().length - 14)        
>>>>>>> 5f7705a48884ab8076ce8e7faa1ed57d36e03a14
        return(
            <div className="profilePostWrapper">
                <Item className="post">
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                        <Item.Meta as='p'>Version 1</Item.Meta>
                    </Item.Content>

                    <Button 
                        className={ 
                            (this.state.button.added ? "active" : "")
                             + " addContrib " 
                             + (this.state.commitIsLatest ? "latest " : "")} 
                        onClick={this.compareHandler.bind(this)}
                        color={ this.state.button.added ? "green" : undefined }
                    >
                    {/*The actual text in this button is added with pseudo elements in css*/}
                    </Button>
                </Item>
            </div>
        )
    }

}