
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Head from './components/head.js';

import './index.css';
import 'semantic-ui-css/semantic.min.css'

class Main extends Component {
    render(){
        return(
            <Head/>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("app"))