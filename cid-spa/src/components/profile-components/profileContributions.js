import React, { Component } from 'react'
import {LineChart,ResponsiveContainer, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts'
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import ContribPost from './post-templates/contribPost.js'
import { fetchContributions } from '../../actions/profileActions.js'
import { changeSubpage } from '../../actions/pageActions.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement
    }
})
export default class ProfileContributionsFeed extends Component {
    
    constructor(props) {
        super(props);
        this.props.dispatch(fetchContributions(this.props.user.currentlyLoggedUser.username.id, this.props.user.currentlyLoggedUser.username.token), changeSubpage("profile_contributions"))
        this.props.dispatch(changeSubpage("profile_contributions"))
    }

    renderPost(object, i){
        return (          
            <Segment id={object.id} key={i} className="profile-post-container">
                <ContribPost {...object}/>
            </Segment>
        )
    }

    isFetched() {
        return 
    }

    renderStatistics() {
        const data = [
            {name: 'Mon', uv: 4000, pv: 9000},
            {name: 'Tue', uv: 3000, pv: 7222},
            {name: 'Wed', uv: 2000, pv: 6222},
            {name: 'Thu', uv: 1223, pv: 5400},
            {name: 'Fri', uv: 1890, pv: 3200},
            {name: 'Sat', uv: 2390, pv: 2500},
            {name: 'Sun', uv: 3490, pv: 1209},
        ];

        let height = '50%'
        let width = '100%'
        
        return (
            <ResponsiveContainer width='100%' height="100%">
                <AreaChart data={data} syncId="anyId"
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
                    <Brush />
                </AreaChart>
            </ResponsiveContainer>
        );
    }

    render(){
        return(
            <div className="feedContainer">
                <Segment className="contribStatistics" style={{height: "300px"}}>
                    { 
                        Object.keys(this.props.profile.contributions).length !== 0 ? 
                        this.renderStatistics()
                        : "Empty" 
                    }
                </Segment>
                <div className="feed">
                    { 
                        Object.keys(this.props.profile.contributions).length !== 0 ? 
                        this.props.profile.contributions.map((object, i) => this.renderPost(object,i)) 
                        : null
                    }
                </div> 
            </div>
        )
    }
}
