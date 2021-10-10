//import logo from './logo.svg';
//import './App.css';
//
//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//
//export default App;

import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you have watched {props.hours} of anime</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href="https://github.com/a-brxs">A-brxs</a>
    </div>
  )
}

const App = () => {
  const name = 'Alfonso'
  const hours = 2743
  console.log('App constant called')
  return [
    <h1>Greetings</h1>,
    <Hello name="Maya" hours={26 + 10} />,
    <Footer />
  ]
}


export default App