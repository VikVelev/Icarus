import React, { Component } from 'react'
import { Segment, Header, Form, Button, Message, Dropdown, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';

import { addPost, fetchAll3DModels } from '../actions/profileActions.js'

import Loading from 'react-loading-animation'

export default class SearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isFetching: false,
            multiple: false,
            search: true,
            searchQuery: null,
            value: [],
            options: this.getOptions(),
        }
    }
    
    getOptions(){
        let options = []

        if(this.props.models.length > 0) {
            this.props.models.forEach((element)=>{
                options.push({
                    key: element.id,
                    text: element.title,
                    icon: {
                        name: "cubes"
                    },
                    value: element.id
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
                    value: element.id
                })
            })
        }
        
        return options
    }

    handleChange = (e, { value }) => {
        this.setState({ value })
    }

    handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

    render() {

        const { options, isFetching, value } = this.state

        return (
            <Dropdown
                fluid
                selection
                search
                scrolling
                multiple={false}
                options={options}
                name='content'
                placeholder='Type to start searching...'
                onChange={this.handleChange}
                onSearchChange={this.handleSearchChange}
                disabled={isFetching}
                loading={isFetching}
            />
        )
    }
}
