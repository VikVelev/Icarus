
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Head from './components/navbar.js';
import Footer from './components/footer.js';

import './index.css';

class Main extends Component {
    render(){
        return(
            <div className="main">
                <Head/>
                {/* Head contains both the nav bar and the content */}
                <Footer/>
            </div>
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("app"))