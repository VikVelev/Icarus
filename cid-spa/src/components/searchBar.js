import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

import { Redirect } from 'react-router-dom'

export default class SearchBar extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            isFetching: false,
            multiple: false,
            currentlyClicked: 0x000,
            type: "",
            clicked: false,
            search: true,
            searchQuery: null,
            value: [],
            options: this.getOptions(),
        }
    }

    // componentDidMount() {
    //     this.state = {
    //         isFetching: false,
    //         multiple: false,
    //         currentlyClicked: 0x000,
    //         clicked: false,
    //         search: true,
    //         searchQuery: null,
    //         value: [],
    //         options: this.getOptions(),
    //     }
    // }

    getOptions(){
        let options = []
        // console.log(this.props.models, this.props.users)
        if(this.props.models.length > 0) {
            this.props.models.forEach((element)=>{
                options.push({
                    key: element.id,
                    text: element.title,
                    icon: {
                        name: "cubes"
                    },
                    value: element.id,
                    onClick: () => {
                        this.setState({ type: "model", currentlyClicked: element.id, clicked: true })
                    }
                })
            })
        }

        if(this.props.users.length > 0) {
            this.props.users.forEach((element)=>{
                options.push({
                    key: element.id,
                    text: element.username,
                    icon: {
                        name: "user"
                    },
                    value: element.id,
                    onClick: () => {
                        this.setState({ type: "user", currentlyClicked: element.id, clicked: true })
                    }
                })
            })
        }
        
        return options
    }

    handleChange = (e, { value }) => {
        this.setState({ value })
    }

    clickUserCallback() {
        this.setState({ clicked: false })
        return <Redirect to={"/profile/" + this.state.currentlyClicked}/> 
    }

    clickModelCallback() {
        this.setState({ clicked: false })
        return <Redirect to={"/model/" + this.state.currentlyClicked}/> 
    }

    handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

    render() {
        return (
            <div style={{ width: '100%', fontSize: '0.9em' }}>
                <Dropdown
                    fluid
                    selection
                    search
                    scrolling
                    multiple={false}
                    options={this.state.options}
                    icon="search"
                    name='content'
                    placeholder='Type to start searching...'
                    onChange={this.handleChange}
                    onSearchChange={this.handleSearchChange}
                    disabled={this.state.isFetching}
                    loading={this.props.isFetching}
                />

                {
                    this.state.type === "user" 
                    && this.state.clicked 
                    && this.state.currentlyClicked !== 0x000 ? 
                        this.clickUserCallback()
                    : null 
                }
                {
                    this.state.type === "model" 
                    && this.state.clicked 
                    && this.state.currentlyClicked !== 0x000 ? 
                    this.clickModelCallback()
                    : null 
                }
                
            </div>      
        )
    }
}
