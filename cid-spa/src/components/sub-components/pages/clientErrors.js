
import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'

export default class ErrorPage extends Component {

    // If you want to add more errors with links, the links must be last and separated by '\n'

    errors = {
        "404" : "Sorry, what you are looking for doesn't exist.",
        "401" : "You are not authorized. This isn't supposed to happen. \n Please submit a bug report describing the issue to the GitHub repo: \n https://github.com/VikVelev/CiD-Platform/issues",
        "400" : "Error. This isn't supposed to happen. \n Please submit a bug report describing the issue to the github repo: \n https://github.com/VikVelev/CiD-Platform/issues",
        "500" : "Server Error. This isn't supposed to happen. \n Please submit a bug report describing the issue to the github repo: \n https://github.com/VikVelev/CiD-Platform/issues",                
    }

    additionalInfo(text) {
        if (text.split ('https://')[0] !== text ) {
            return text.split ('\n').map ((item, i) => {
                if (i === text.split('\n').length - 1) {
                    return(<a href={item} key={i}>{item}</a>)
                }
                return <p key={i}>{item}</p>
            });
        } else {
            return text.split ('\n').map ((item, i) => <p key={i}>{item}</p>);
        }
    }

    render(){
        return(
            <div className={"errorPage " + this.props.type}>
                <Header className="errorHeader" size="huge">{this.props.type}</Header>
                <div className="errorText">{this.additionalInfo(this.errors[this.props.type])}</div>
            </div>
        )
    }
}