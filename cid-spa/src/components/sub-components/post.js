import React, { Component } from 'react'
import { Item, Segment, Dropdown } from 'semantic-ui-react'

import * as moment from 'moment'

import { Link } from 'react-router-dom'
import Canvas3D from '../viewport/canvas3d.js'
//import { getModelbyID } from '../../actions/profileActions.js';
import { connect } from 'react-redux';

@connect((store) => {
    return {
        profile: store.profileManagement,
        page: store.pageManagement,
        user: store.userManagement,
    }
})
export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            rendering: false,
            inProfile: false,
        }

        if(this.props.inProfile !== undefined) {
            this.state.inProfile = this.props.inProfile
        }
    }

    mountCanvas = () => {
        if (this.state.rendering){
            if(this.props.page.currentModel !== undefined){
                return(
                    <Segment className="canvas3d" style={{width:'100%', height: "500px",padding: 0}}>
                        <Canvas3D modelPath={this.props.content.new_version}/>
                    </Segment>
                )
            } else {
                return null
            }
        } else {
            return null
        }
    }

    clickHandler() {
        this.setState({ rendering: !this.state.rendering })
    }

    render(){
        this.date_posted = moment(this.props.date_posted).fromNow()
        return(
            <div className="postWrapper">
                <Item className="post" onClick={this.clickHandler.bind(this)}>
                    <Item.Image size='small' style={{
                        backgroundImage: "url(" + this.props.image + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundColor: '#ccc',
                        borderRadius: "5px",
                        margin: '5px',
                        marginRight: '20px',
                    }}/>
                    
                    <Item.Content>
                        <Item.Header style={{ fontSize: '1.3em' }}>{this.props.title}</Item.Header>
                        { !this.state.inProfile ? 
                            <Item.Meta>Posted by {<Link to={"/profile/" + this.props.posted_id}>{this.props.posted_by}</Link>}</Item.Meta>
                        : null }
                        <Item.Meta as='p'>{this.date_posted}</Item.Meta>
                        <Item.Description>
                            <p>{this.props.description}</p>
                        </Item.Description>
                    </Item.Content>
                    { !this.state.inProfile ? 
                    <Dropdown icon="ellipsis horizontal" button className='modelPostSettings icon'>
                        <Dropdown.Menu>
                            <Dropdown.Header content='Interact'/>
                            
                            <Dropdown.Item as={Link} to={"model/" + this.props.content.belongs_to_model}> View </Dropdown.Item>                         
                            <Dropdown.Header content='Version Control'/>
                            <Dropdown.Item disabled> Commit Chain </Dropdown.Item>                                                                 
                        </Dropdown.Menu>
                    </Dropdown> : null }
                </Item>

                {this.mountCanvas()}


            </div>
        )
    }

}