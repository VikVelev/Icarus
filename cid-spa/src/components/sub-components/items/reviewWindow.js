import React, { Component } from 'react'
import { Segment, Modal } from 'semantic-ui-react'
import Canvas3D from './../../viewport/canvas3d.js'

export default class ReviewWindow extends Component {

    render() {
        return (
            <Modal className="reviewWindowModal" trigger={this.props.trigger} dimmer="blurring" closeIcon>
            <Modal.Content style={{ height: '100%', width: '100%'}}>
                <Segment className="canvas3d" style={{width:'100%', height: "100%",padding: 0}}>
                    <Canvas3D modelPath={this.props.content.commit_mesh}
                              texturePath={this.props.content.commit_textures}/>
                </Segment>
            </Modal.Content>
        </Modal>
        )
    }
}