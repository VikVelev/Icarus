import React, { Component } from 'react'
import { Segment, Header, Tab } from 'semantic-ui-react'
import Canvas3D from '../../viewport/canvas3d.js'
import { fetchViewingData } from '../../../actions/model3DActions.js'
import { connect } from 'react-redux';

@connect((store) => {
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        page: store.pageManagement,
        model3d: store.model3DManagement,
    }
})

export default class ViewModel3D extends Component {

    constructor (props) {
        super(props)

        //Fetch this id
        this.props.dispatch(fetchViewingData(this.props.id, this.props.user.currentlyLoggedUser.username.token))
        console.log(this.props)
    }



    panes = [
        { menuItem: 'Commits', render: () => <Tab.Pane>Something</Tab.Pane> },
        { menuItem: 'Mentions', render: () => <Tab.Pane>Something</Tab.Pane> },  
    ]

    render() {
        if(this.props.model3d.fetched){
            return (
                <div className="viewModelContainer">
                    <Segment color="blue">
                        <Segment className="canvas3d medium" style={{width:'100%', height: "650px",padding: 0}}>
                            <Canvas3D modelPath={
                                this.props.model3d.model[0].commits[this.props.model3d.model[0].commits.length-1].new_version
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
            return (
                <div>Loading...</div>
            )
        }
    }
}