import React from 'react';
import './App.css';
import { RiverTrial } from './riverTrial';
import RangeViewer from './rangeViewer';
import HandViewer from './HandViewer';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.trial = new RiverTrial();
    this.state = { handEQ: '', villainEQ: '', heroHand: [], villainRange: [], board: [] };
    // this.trial.eval();
  }
  runTrial = () => {
    let {heroHand, villainRange, board} = this.state
    console.log('running trial')
    console.log('heroHAnd: ', this.state.heroHand)
    console.log('villainRange: ', this.state.villainRange)
    console.log('board: ', this.state.board)
    this.trial = new RiverTrial();
    // let hand = ['As', 'Ah', 'Kc', '3c', '2c', '7d', 'Th'];
    // let range = [
    //   ['As', 'Ah', '5c', '3c', '2c', '7d', 'Th'],
    //   ['As', 'Ah', 'Ac', '3c', '2c', '7d', 'Th']
    // ];
    let trials = 0
    let handsWon = 0
    for (let i=0; i < villainRange.length; i++){
      let trial = new RiverTrial(heroHand, villainRange[i]);
      console.log("TRIAL HAND: ", villainRange[i])
      const res = trial.runTrial()
      console.log("res is: ", res)
      trials +=1
      if (res === 'hand1'){
        handsWon +=1
      }
    }
    console.log("RESULTS~!!!: ", trials, handsWon)


    // let trial = new RiverTrial(hand, range);
    // const handEQ = trial.runTrial();
    // this.setState({ handEQ: handEQ, villainEQ: 1 - handEQ });
  };
  updateHeroHand = (handArray) => {
    this.setState({ heroHand: handArray })
  };
  updateBoard = (boardArray) => {
    this.setState({ board: boardArray })
  };
  updateRange = (range) => {
    this.setState({ villainRange: range });
  };
  render() {
    return (
      <div>
        <h1>POKER CALCULATOR</h1>
        <div className='App'>
          <div className='opp-range'>
            <h3>Opponent's range</h3>
            <RangeViewer updateRange={this.updateRange} />
          </div>
          <div className='hero-hand'>
            <h3>My hand</h3>
            <HandViewer max={2} updateHand={this.updateHeroHand} />
            <h3>Board</h3>
            <HandViewer max={5} updateHand={this.updateBoard}/>
            <div className='results'>
              <button onClick={this.runTrial}>Evaluate:</button>
              <h4>My hand: _{this.state.handEQ}</h4>
              <h4>Villain Range: ___{this.state.villainEQ}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
