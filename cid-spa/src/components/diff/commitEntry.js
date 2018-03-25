import React, { Component } from 'react'
import { Item, Button } from 'semantic-ui-react'
import * as moment from 'moment'

import { connect } from 'react-redux'
import { addToCompare, removeFromCompare, DiffMode } from '../../actions/model3DActions' 

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

        if (this.props.model3d.comparing.length == 0) {
            this.props.dispatch(
                DiffMode(true)
            )
        }

        let modelCommitData = { 
            mesh: this.props.new_version,
            textures: this.props.new_textures,
            modelId: this.props.belongs_to_model,
            commitId: this.props.id,
            version: this.props.version_number
        }

        if (this.state.button.added) {
            if (this.props.model3d.comparing.length === 1) {
                this.props.dispatch(
                    DiffMode(false)
                )
            }
            this.props.dispatch(
                removeFromCompare(modelCommitData)
            )
        } else {
            this.props.dispatch(
                addToCompare(modelCommitData)
            )
        }

        this.setState({ button: { added: !this.state.button.added } })
    }

    render(){
        this.date_uploaded = moment(this.props.date).format("MM.DD.YY HH:mm")
        return(
            <div className="profilePostWrapper">
                <Item className="post">
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                        <Item.Meta as='p'>Version {this.props.version_number}</Item.Meta>
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