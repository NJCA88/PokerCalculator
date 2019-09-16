import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RiverTrial } from './riverTrial';
import RangeViewer from './rangeViewer';
import HandViewer from './HandViewer';

// function App() {
//   return (
//     <div className="App">
//       <h1>POKER CALCULATOR</h1>
//     </div>
//   );
// }
class App extends React.Component {
  constructor(props) {
    super(props);
    this.trial = new RiverTrial();
    this.trial.eval();
  }
  render() {
    return (
      <div className='App'>
        <div className='opp-range'>
          <h1>POKER CALCULATOR</h1>
          <h3>Opponent's range</h3>
        <RangeViewer />
        </div>
        <div className='hero-hand'>
          <h3>My hand</h3>
          <HandViewer />
        </div>
      </div>
    );
  }
}

export default App;
