
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import Content from './components/content.js';
import store from './store'

import './index.css';
import 'semantic-ui-css/semantic.min.css'


class Main extends Component {
    render(){
        return(
            <Provider store={store}>
                <Content/>
            </Provider>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("app"))