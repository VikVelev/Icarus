
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Content from './components/content.js';
import cidReducers from './reducers/main.js'

import './index.css';
import 'semantic-ui-css/semantic.min.css'

let store = createStore(cidReducers)

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