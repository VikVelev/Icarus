
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Content from './components/content.js';

import './index.css';
import 'semantic-ui-css/semantic.min.css'

class Main extends Component {
    render(){
        return(
            <Content/>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("app"))