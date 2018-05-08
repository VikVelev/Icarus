import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Segment, Header, Tab, Button, Icon } from 'semantic-ui-react'
import Canvas3D from '../../viewport/canvas3d.js'
import { fetchViewingData, fetchModelMentions, viewModel, alreadyForked, fork } from '../../../actions/model3DActions.js'
import { connect } from 'react-redux';

import CommitChain from '../../diff/commitChain.js'
import ProfilePosts from '../../profile-components/profilePosts.js'
import ErrorPage from './clientErrors.js'
import AddCommit from '../../profile-components/addCommitForm.js'

import Loading from 'react-loading-animation'
import lang from '../../../lang.js'

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        page: store.pageManagement,
        model3d: store.model3DManagement,
        lang: store.langManagement.lang
    }
})
export default class ViewModel3D extends Component {
    constructor (props) {
        super(props)

        this.props.dispatch(
            fetchViewingData(
                this.props.id, 
                this.props.user.currentlyLoggedUser.username.token
            )
        )

        this.props.dispatch(
            alreadyForked(
                this.props.id,
                this.props.user.currentlyLoggedUser.username.token,
            )
        )

        this.props.dispatch(
            fetchModelMentions(
                this.props.id,
                this.props.user.currentlyLoggedUser.username.token
            )
        )     
    }

    componentDidMount() {
        this.props.dispatch(
            viewModel(
                this.props.id,
                this.props.user.currentlyLoggedUser.username.token                
            )
        )
    }

    handleForking() {
        this.props.dispatch(
            fork(
                this.props.id,
                this.props.user.currentlyLoggedUser.username.token  
            )
        )
    }

    renderMentions() {
        return <ProfilePosts inDiff={true} posts={this.props.model3d.mentions}/>
    }

    renderCommits() {
        //Styling on the commits
        return <CommitChain commits={this.props.model3d.model[0].commits}/>
    }

    renderCurrentlyComparing(text) {

        const AddedItem = (props) => (
            <div className="lookingContainer">
                <Header>
                    {props.index + 1}. {props.title}
                </Header>
                <div id="lDetails" className="lItem">
                    {text.currentlyLooking.details}: {props.description}
                </div>
                <div id="lVersion" className="lItem">
                    {text.currentlyLooking.committedBy}: {props.committed_by.username}
                </div>
                <div id="lVersion" className="lItem">
                    {text.currentlyLooking.version} {props.version}.0
                </div>
                
            </div>
        )

        return (
            <Segment className="currentlyComparing" color="blue">
                <Header>Currently looking at:</Header>
                {this.props.model3d.comparing.length === 0 ?
                    <div className="lItem">
                        {text.currentlyLooking.nothing}
                    </div> : null}
                {this.props.model3d.comparing.map((object, i) => <AddedItem {...object} key={i} index={i}/>)}
            </Segment>
        )
    }

    panes = [
        { menuItem: lang[this.props.lang].modelViewPage.commits, render: () => <Tab.Pane>{this.renderCommits()}</Tab.Pane> },
        { menuItem: lang[this.props.lang].modelViewPage.mentions, render: () => <Tab.Pane>{this.renderMentions()}</Tab.Pane> },  
    ]

    render() {
        if(this.props.model3d.viewModelFetched && Object.keys(this.props.model3d.error).length === 0){
            let model = this.props.model3d.model[0]
            let picture = model.owners[0].profile.profile_picture
            let text = lang[this.props.lang].modelViewPage
            

            if (picture === null) {
                picture = "/img/default.png"
            }

            return (
                <div className="viewModelContainer">
                    {this.renderCurrentlyComparing(text)}
                    <Segment color="blue">
                        {/* using index [0] means that I'm getting the latest version, the API sorts them from latest to oldest commit*/}
                        { 
                            model.commits[0] !== undefined ? 
                                <Segment className="canvas3d medium" style={{width:'100%', height: "650px",padding: 0}}>
                                    <Canvas3D modelPath={model.commits[0].new_version}
                                            texturePath={model.commits[0].new_textures}
                                            diff={true}
                                        />
                                </Segment>
                            : "No commits"
                        }
                        <Segment className="uploadedBy">
                            <div style={{
                                backgroundImage: "url(" + picture + ")",
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
                                <Header size="huge">{model.title}</Header>
                                <Header size="small">{text.uploadedBy} <Link to={"/profile/" + model.owners[0].id}>{model.owners[0].username}</Link></Header>                 
                                <Header style={{ marginTop: 0 }} size="tiny">{model.viewcount} {text.views}</Header>                            
                            </div>
                            <div className="intButtons">
                                {/* Debugging purposes ===, should be !== otherwise */}
                                { model.owners[0].id !== this.props.user.currentlyLoggedUser.username.id ?
                                <Button size="big"
                                        loading={this.props.model3d.checkingFork}
                                        disabled={this.props.model3d.forked} 
                                        className="forkButton" 
                                        color="blue" 
                                        onClick={this.handleForking.bind(this)}>
                                    <Icon name="fork"/>
                                    {this.props.model3d.forked ? text.b_fork.forked : text.b_fork.fork }
                                </Button> : 
                                <Button size="big" disabled className="forkButton" color="gray">
                                    <Icon name="fork"/>
                                    {text.b_fork.yours}
                                </Button> }

                                <AddCommit trigger={
                                    <Button size="big" className="contribButton" color="green">
                                        <Icon name="plus"/>
                                        {text.b_contribute}
                                    </Button>
                                } id={model.id}/>
                            </div>
                        </Segment>
                        <Tab menu={{ stackable: true, size: "massive", color: "blue", secondary: true , pointing: true }} panes={this.panes} />
                    </Segment>
                </div>
            );
        } else if (Object.keys(this.props.model3d.error).length !== 0) {
            if (this.props.model3d.error.request.status === 0) {
                return(
                    <ErrorPage type={404}/>
                )
            } else if (this.props.model3d.error.response.status === 404) {
                return(
                    <ErrorPage type={404}/>
                )
            }
        } else {
            return (
                <div style={{height: 'auto'}}>
                    <Loading style={{marginTop: '10%'}} />
                    <p style={{textAlign: 'center', marginTop: '25px', fontFamily: 'roboto'}}>{lang[this.props.lang].loading}</p>
                </div>
            )
        }
    }
}