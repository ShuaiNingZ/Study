import React, {Component} from 'react';
import Head from "../layout/Head/Head";
import Main from "../layout/Main/Main";
// import logo from './logo.svg';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>这是 home 首页面!!!</h2>
                <Head></Head>
                {/*<oldimg src={logo} className="App-logo" alt="logo"/>*/}
                {/*<oldimg src={require('./logo.svg').default} className="App-logo" alt=""/>*/}
                <h1>Hello World</h1>
                <Main></Main>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </div>
        );
    }
}

export default Home;