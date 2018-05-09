import React, { Component } from 'react'
import { Item, Segment, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'
import 'moment/locale/bg'

import Canvas3D from '../../viewport/canvas3d.js'
import DeleteModal from '../deleteModal.js'
import { connect } from 'react-redux'

import lang from '../../../lang.js'

@connect((store)=> {
    return {
        profile: store.profileManagement,
        lang: store.langManagement.lang
    }
})
export default class ContribPost extends Component {
    constructor(props){
        super(props)

        moment.locale(this.props.lang)
        this.state = {
            rendering: false,
            deleting: false,
            deleted: false,
        }
    }
    
    mountCanvas = () => {
        if (this.state.rendering){
            return(
                <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                    <Canvas3D modelPath={this.props.new_version} 
                              texturePath={this.props.new_textures}/>
                </Segment>
            )
        } else {
            return null
        }
    }

    startDeleting(){
        this.setState({
            deleting: true,
        })
    }

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    callbackDeleted() {
        this.props.dispatch({ type: "DELETE_REFRESH" })
        this.setState({
            deleted: true,
            deleting: false,            
        })
    }

    contribPost() {
        this.date_uploaded = moment(this.props.date).format("DD.MM.YY HH:mm:SS")
        let text = lang[this.props.lang].commit
        return(
            <Segment className={this.props.className}>
            <div className="profilePostWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        <Item.Meta as='p'>{this.date_uploaded}</Item.Meta>
                        <Item.Meta as='p'>
                            {text.belongsTo}:{" "}
                        <Link to={"/model/" + this.props.belongs_to_model.id}>
                            {this.props.belongs_to_model.title}
                        </Link>
                        </Item.Meta>                        
                        <Item.Meta as='p'>{text.version} {this.props.version_number}</Item.Meta>
                    </Item.Content>

                    <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header content={text.menu.manage}/>
                            <DeleteModal type="commit" {...this.props} trigger={<Dropdown.Item onClick={this.startDeleting.bind(this)}> {text.menu.delete} </Dropdown.Item>}/>
                            <Dropdown.Header content={text.menu.versionControl}/>
                            <Dropdown.Item disabled> {text.menu.viewModel} </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Item>
                {this.props.profile.deletedCommit && this.state.deleting ? this.callbackDeleted() : null}
                {this.mountCanvas()}
            </div>
            </Segment>
        )
    }

    render(){
        return(
            this.state.deleted ? null : this.contribPost()
        )
    }

}