import React, { Component } from 'react'

import { Segment, Image, Header, Tab } from 'semantic-ui-react'

import ProfileModelsFeed from '../../profile-components/profileModels.js'
import InDevelopment from '../indev.js'

export default class Profile extends Component {

    panes = [
        { menuItem: '3D Models', render: () => <Tab.Pane><ProfileModelsFeed/></Tab.Pane> },
        { menuItem: 'Contributions', render: () => <Tab.Pane><InDevelopment/></Tab.Pane> },
        { menuItem: 'Favorites', render: () => <Tab.Pane><InDevelopment/></Tab.Pane> },
      ]

    constructor(props){
        super(props)

        this.userData = props.userData
        this.userData = {
            image: "/img/man.jpg",
            first_name: "Viktor",
            last_name: "Velev",
            username: "VikVelev",
            description: "Dolor et elit velit sunt Lorem dolor ullamco nisi amet occaecat labore non nisi ex. Laboris enim tempor in Lorem eiusmod amet elit pariatur dolor Lorem do eiusmod sint magna. Nostrud fugiat anim anim quis ea ipsum nulla laborum. Anim cupidatat occaecat proident mollit proident adipisicing magna et esse laboris enim. In enim commodo cupidatat magna anim nostrud ipsum. Nulla ex dolor deserunt nisi.",            
        }

    }

    render(){
        return(
            <Segment  color="blue" className="userContainer" style={{
                height: 'auto',
                marginTop: '5px',
                marginLeft: '20%',
                marginRight: '20%',  
            }}> 

            <Segment className="userHeader" style={{ display: 'flex' }}>
                <div className="profileImage">
                    <Image src={this.userData.image} size="medium" circular style={{objectFit: "cover"}}/>
                </div>
                <div className="profileDetails">
                    <Header size="huge">{this.userData.first_name} {this.userData.last_name}</Header>
                    <Header size="medium">@{this.userData.username}</Header>
                    {this.userData.description}
                </div>
            </Segment>
            <Tab menu={{ stackable: true, size: "massive", color: "blue", secondary: true , pointing: true }} panes={this.panes} />
            </Segment>
        )
    }
}