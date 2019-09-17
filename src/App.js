import React from 'react';
import './App.css';
import { RiverTrial } from './riverTrial';
import RangeViewer from './rangeViewer';
import HandViewer from './HandViewer';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.trial = new RiverTrial();
    // this.trial.eval();
  }
  render() {
    return (
      <div>
        <h1>POKER CALCULATOR</h1>
        <div className='App'>
          <div className='opp-range'>
            <h3>Opponent's range</h3>
            <RangeViewer />
          </div>
          <div className='hero-hand'>
            <h3>My hand</h3>
            <HandViewer max={2}/>
            <h3>Board</h3>
            <HandViewer max={5}/>
            <div className="results">
              <button>Evaluate:</button>
              <h4>My hand: ___</h4>
              <h4>Villain Range: ___</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
