import React, { Component } from 'react'
import { ResponsiveContainer, AreaChart, Area, Brush, XAxis, YAxis, Tooltip} from 'recharts'
import { Segment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as moment from 'moment'

import  CommitEntry from './commitEntry.js'
import { fetchContributions } from '../../actions/profileActions.js'
import { changeSubpage } from '../../actions/pageActions.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class CommitChain extends Component {
    
    constructor(props) {
        super(props);
        this.data = []

    }

    renderPost(object, i){
        return (          
            <Segment id={object.id} key={i} className="profile-post-container">
                <CommitEntry{...object}/>
            </Segment>
        )
    }

    render(){   
        return(
            <div className="feedContainer">
                <div className="feed">
                    { 
                        Object.keys(this.props.commits).length !== 0 ?  //if
                        this.props.commits.map((object, i) => this.renderPost(object,i)) 
                        : null
                    }
                </div> 
            </div>
        )
    }
}
