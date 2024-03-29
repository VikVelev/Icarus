import React, { Component } from 'react'
import { Item, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'

import { connect } from 'react-redux'
import { addToCompare, removeFromCompare, DiffMode } from '../../actions/model3DActions' 
import lang from '../../lang.js'

@connect((store) => {
    return {
        model3d: store.model3DManagement,
        lang: store.langManagement.lang,
    }
})
export default class CommitEntry extends Component {
    // The object template for it to be accepted by the addModelToCompare function is:
    // { 
    //     mesh: smth,  (file path)
    //     textures: smth, (file path)
    //     modelId: smth,   (int)
    //     commitId: smth, (int)
    //     version: smth, (int)
    // }

    constructor(props){
        super(props)
        this.state = {
            isLatest: this.isLatest(),
            button: {
                added: this.isLatest()
            }
        }
        this.locked = false
    }

    isLatest() {
        return this.props.id === this.props.model3d.model[0].commits[0].id
    }

    renderLatest() {

        if(
            this.isLatest() 
            && !this.locked
            && this.props.model3d.rendering
            && this.props.model3d.comparing.length === 0
        ) {

            let latestCommitData = { 
                mesh: this.props.new_version,
                textures: this.props.new_textures,
                modelId: this.props.belongs_to_model,
                commitId: this.props.id,
                version: this.props.version_number,
                description: this.props.details,
                committed_by: this.props.committed_by,
                title: this.props.title,
            }
        
            this.props.dispatch(
                addToCompare(latestCommitData)
            )

            this.locked = true // This is meant to be executed only once, I couldn't think of other way to stop it
        }
    }

    compareHandler(e) {
        //Add this commit model to the canvas and set the canvas in diff mode

        if (this.props.model3d.comparing.length === 0) {
            this.props.dispatch(
                DiffMode(true)
            )
        }
        //console.log(this.props);
        let modelCommitData = { 
            mesh: this.props.new_version,
            textures: this.props.new_textures,
            modelId: this.props.belongs_to_model,
            commitId: this.props.id,
            version: this.props.version_number,
            description: this.props.details,
            committed_by: this.props.committed_by,            
            title: this.props.title,
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
        this.renderLatest()
        return(
            <div className="profilePostWrapper">
                <Item className="post">
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                        <Item.Meta as='p'>{lang[this.props.lang].commit.committedBy} <Link to={"/profile/" + this.props.committed_by.id}>{this.props.committed_by.username}</Link></Item.Meta>                        
                        <Item.Meta as='p'>Version {this.props.version_number}</Item.Meta>
                    </Item.Content>

                    <Button 
                        className={ 
                            (this.state.button.added ? "active" : "")
                             + " addContrib " 
                             + (this.state.isLatest ? "latest " : "")} 
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