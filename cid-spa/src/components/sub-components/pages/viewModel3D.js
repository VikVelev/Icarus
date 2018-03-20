import React, { Component } from 'react'
import { Segment, Header, Tab } from 'semantic-ui-react'
import Canvas3D from '../../viewport/canvas3d.js'
import { fetchViewingData } from '../../../actions/model3DActions.js'
import { connect } from 'react-redux';

import CommitChain from '../../diff/commitChain.js'
import ProfilePosts from '../../profile-components/profilePosts.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        page: store.pageManagement,
        model3d: store.model3DManagement,
    }
})
export default class ViewModel3D extends Component {
    //TODO FIX inconsistencies with Post profile link
    constructor (props) {
        super(props)
        this.props.dispatch(fetchViewingData(this.props.id, this.props.user.currentlyLoggedUser.username.token))
    }

    renderMentions() {
        return <ProfilePosts inProfile={false} posts={this.props.model3d.model.mentions}/>
    }

    renderCommits() {
        return <CommitChain commits={this.props.model3d.model[0].commits}/>
    }

    panes = [
        { menuItem: 'Commits', render: () => <Tab.Pane>{this.renderCommits()}</Tab.Pane> },
        { menuItem: 'Mentions', render: () => <Tab.Pane>{this.renderMentions()}</Tab.Pane> },  
    ]

    render() {
        if(this.props.model3d.fetched){
            return (
                <div className="viewModelContainer">
                    <Segment color="blue">
                        <Segment className="canvas3d medium" style={{width:'100%', height: "650px",padding: 0}}>
                            <Canvas3D modelPath={
                                this.props.model3d.model[0].commits[this.props.model3d.model[0].commits.length - 1].new_version
                                }/>
                        </Segment>
                        <Segment className="uploadedBy">
                            <div style={{
                                backgroundImage: "url(" + this.props.model3d.model[0].owners[0].profile.profile_picture + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                backgroundColor: '#ccc',
                                borderRadius: "5px",
                                margin: '5px',
                                height: '100px',
                                width: '100px',
                                marginRight: '20px',
                            }}> 
                            </div>
                            <div>
                                <Header size="huge">{this.props.model3d.model[0].title}</Header>
                                <Header size="small">Uploaded by <a>{this.props.model3d.model[0].owners[0].username}</a></Header>                            
                            </div>
                        </Segment>
                        <Tab menu={{ stackable: true, size: "massive", color: "blue", secondary: true , pointing: true }} panes={this.panes} />
                    </Segment>
                </div>
            );
        } else {
            //TODO Add fancy animations
            return (
                <div>Loading...</div>
            )
        }
    }
}