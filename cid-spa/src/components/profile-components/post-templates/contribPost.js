import React, { Component } from 'react'
import { Item, Segment, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'
import Canvas3D from '../../viewport/canvas3d.js'
import { connect } from 'react-redux'

import lang from '../../../lang.js'

@connect((store)=> {
    return {
        lang: store.langManagement.lang
    }
})
export default class ContribPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
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

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    render(){
        this.date_uploaded = moment(this.props.date).format("DD.MM.YY HH:mm:SS")
        let text = lang[this.props.lang].commit
        return(
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
                            <Dropdown.Item disabled> {text.menu.delete} </Dropdown.Item>
                            <Dropdown.Header content={text.menu.versionControl}/>
                            <Dropdown.Item disabled> {text.menu.viewModel} </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Item>
                {this.mountCanvas()}
            </div>
        )
    }

}