import React, { Component } from 'react'
import { ResponsiveContainer, AreaChart, Area, Brush, XAxis, YAxis, Tooltip} from 'recharts'
import { Segment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as moment from 'moment'

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
        this.data = []
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

    dataProcessing(data) {
        const week = [
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat',
            'Sun',
        ]

        let wholeYear = []

        for (let w = 0; w < parseInt(moment().format("W"), 10); w++) {

            wholeYear[w] = []
            let days = 7
            if (w === parseInt(moment().format("W"), 10) - 1) {
                days = parseInt(moment().format("E"), 10)
            }
            for (let d = 0; d < days; d++) {
                if(moment(((w + 1) + "-" + (d+1)).toString(), 'W-E').toDate() === "Invalid Date") {
                    continue;
                }
                let currentDay = moment(((w + 1) + "-" + (d+1)).toString(), 'W-E')
                wholeYear[w].push({ name: week[d] + "\n" + currentDay.format("MM.DD"), commits: 0 })
                
            }
        }

        for (let i = 0; i < data.length; i++) {            
            wholeYear[parseInt(moment(data[i].date).format("W"), 10) - 1][parseInt(moment(data[i].date).format("E"), 10) - 1].commits++  
        }

        let wholeYearNormalized = []
        for (let w = 0; w < parseInt(moment().format("W"), 10); w++) {
            let days = 7
            if (w === parseInt(moment().format("W"), 10) - 1) {
                days = parseInt(moment().format("E"), 10)
            }
            for (let d = 0; d < days; d++) {
                if(moment(((w + 1)+ "-" + (d + 1)).toString(), 'W-E').toDate() === "Invalid Date") {
                    continue;
                }
                wholeYearNormalized.push(wholeYear[w][d])
                
            }
        }

        return wholeYearNormalized;
    }

    renderStatistics() {
        if (this.data.length === 0 ){
            this.data = this.dataProcessing(this.props.profile.contributions)
        }

        //Gotta put some data processing in the backend
        
        return (
            <ResponsiveContainer width='100%' height="100%">
                <AreaChart data={this.data} syncId="anyId"
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='commits' stroke='#82ca9d' fill='#82ca9d' />
                    {/*7 because I want the last week stats to be by default*/}
                    <Brush startIndex={this.data.length < 7 ? 0 : this.data.length-7}/>
                </AreaChart>
            </ResponsiveContainer>
        );
    }

    render(){
        return(
            <div className="feedContainer">
                <Header size="huge">Activity</Header>
                <div className="contribStatistics" style={{height: "300px", marginBottom: '50px'}}>
                    { 
                        Object.keys(this.props.profile.contributions).length !== 0 ? 
                        this.renderStatistics()
                        : "Empty" 
                    }
                </div>
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
