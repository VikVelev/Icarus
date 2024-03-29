import React, { Component } from 'react'
import { ResponsiveContainer, AreaChart, Area, Brush, XAxis, YAxis, Tooltip} from 'recharts'
import { Segment, Header, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import * as moment from 'moment'

import Loading from 'react-loading-animation'
import ContribPost from './post-templates/contribPost.js'
import { fetchContributions } from '../../actions/profileActions.js'
import { changeSubpage } from '../../actions/pageActions.js'
import { fetchMyRevisions } from '../../actions/revisionActions.js'
import lang from '../../lang.js'

@connect((store)=>{
    return {
        user: store.userManagement,
        profile: store.profileManagement,
        rev: store.revisionManagement,
        lang: store.langManagement.lang,
    }
})
export default class ContributionsFeed extends Component {
    
    constructor(props) {
        super(props);
        this.data = []
        this.props.profile.contributions = {}

        this.commits = this.props.commits

        if (props.isChain === undefined) {
            this.commits = {}

            if (props.id === undefined) {

                this.props.dispatch(
                    fetchContributions(
                        this.props.user.currentlyLoggedUser.username.id, 
                        this.props.user.currentlyLoggedUser.username.token
                    )
                )

                this.props.dispatch(
                    fetchMyRevisions(
                        this.props.user.currentlyLoggedUser.username.token
                    )
                )

            } else {

                this.props.dispatch(
                    fetchContributions(
                        this.props.id, 
                        this.props.user.currentlyLoggedUser.username.token
                    )
                )
                
            }
            this.props.dispatch(changeSubpage("profile_contributions"))
        }

    }

    renderPost(object, i){
        return (
            <ContribPost key={i} className="profile-post-container contribPost" {...object}/>
        )
    }

    dataProcessing(data) {

        let wholeYear = []

        for (let w = 0; w < parseInt(moment().format("W"), 10); w++) {

            wholeYear[w] = []
            let days = 7

            if (w === parseInt(moment().format("W"), 10) - 1) {
                days = parseInt(moment().format("E"), 10)
            }
            
            for (let d = 0; d < days; d++) {
                if(moment(((w + 1) + "-" + (d + 1)).toString(), 'W-E').toDate() === "Invalid Date") {
                    continue;
                }
                let currentDay = moment(((w + 1) + "-" + (d + 1)).toString(), 'W-E')
                wholeYear[w].push({ name: currentDay.format("MM.DD"), commits: 0 })
                
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
                if(moment(((w + 1) + "-" + (d + 1)).toString(), 'W-E').toDate() === "Invalid Date") {
                    continue;
                }
                wholeYearNormalized.push(wholeYear[w][d])
                
            }
        }

        return wholeYearNormalized;
    }

    renderStatistics() {
        // Using already existing data if there is.
        if (this.data.length === 0 && this.props.isChain === undefined){
            this.data = this.dataProcessing(this.props.profile.contributions)
        }

        //Gotta put some data processing in the backend
        //Or implement a worker (but I prefer synchronious stuff and the performance hit isn't that huge)

        // if this is not rendered on a profile page, but on a model page.
        if (this.props.isChain === undefined) {
            return (
                <div>
                    <Header size="huge">{lang[this.props.lang].profilePage.contrib.activity}</Header>
                    <div className="contribStatistics" style={{height: "300px", marginBottom: '50px'}}>
                        <ResponsiveContainer width='100%' height="100%">
                            <AreaChart data={this.data} syncId="anyId"
                                    margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <Tooltip/>
                                <Area type='monotone' dataKey='commits' stroke='#82ca9d' fill='#82ca9d' />
                                {/*7 because I want the last week stats to be by default*/}
                                <Brush startIndex={this.data.length < 7 ? 0 : this.data.length - 7}/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            );
        }
    }

    renderPending(){
        if (this.props.isChain === undefined) {
            return (
                <div>
                    <Header size="huge">Pending</Header>
                    {/*TODO: Implement this + a API query for every user's revisions*/}
                    {/*TODO: Revamp post so it works here.*/}
                    {this.props.rev.postedRevisions.map((object, i) => this.renderPost(object,i))}
                    </div>
            );
        }
    }

    render(){   
        return(
            <div className="feedContainer">
                    { 
                        Object.keys(this.props.profile.contributions).length !== 0 ? 
                        this.renderStatistics()
                        : null
                    }
                    {
                        Object.keys(this.props.rev.postedRevisions).length !== 0 ?
                        null //this.renderPending() // TODO: FINISH THIS
                        : null
                    }
                <div className="feed">
                    { 
                        Object.keys(this.props.profile.contributions).length !== 0 ? //if
                            this.props.profile.contributions.map((object, i) => this.renderPost(object,i)) 
                        : Object.keys(this.commits).length !== 0 ?  //else if
                            this.commits.map((object, i) => this.renderPost(object,i))
                        : this.props.profile.contributions.length === 0 && this.props.profile.fetched ? //else if
                        <Message info >
                            {lang[this.props.lang].profilePage.contrib.nothing}
                        </Message> 
                        :
                        <Loading/> 
                    }
                </div> 
            </div>
        )
    }
}
