
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MainNavbar from './components/navbar.js';
import Content from './components/content.js';
import MainFooter from './components/footer.js';

import './index.css';

class Main extends Component {
    render(){
        return(
            <div className="main">
                <MainNavbar/>
                <Content/>
                <MainFooter/>
            </div>
        );
    }
}

ReactDOM.render( <Main/>, document.getElementById("app"))