import React from 'react';
import './rangeview.css';

// const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = ['c', 's', 'h', 'd'];

class RangeViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.generateRangeView()
    this.handleClick = this.handleClick.bind(this)
  }
  getRange = () => {
    let range = [];
    let keys = Object.keys(this.state);
    console.log(this.state)
    console.log("keys to the truck: ", keys)
    // let keys = ['KJo', "TT"]
    for (let i = 0; i < keys.length; i++) {
      if (this.state[keys[i]]) {
        range.push(this.state(keys[i]));
      }
    }
    console.log('getRange range: ', range)
    return range;
  };
  handleClick = (input) => {
    if (!this.state[input]) {
      this.setState(
        { [input]: this.getCombos(input) }, ()=>
        {   console.log("state: ", this.state);
            this.props.updateRange(this.getRange())}
      );
    } else {
      this.setState(
        { [input]: false },
        this.props.updateRange(this.getRange())
      );
    }
  };

  getCombos = (hand) => {
    const combos = [];
    if (hand.length == 2) {
      //pair
      for (let s1 = 0; s1 < 4; s1++) {
        for (let s2 = s1; s2 < 4; s2++) {
          if (s1 == s2) continue;
          combos.push(hand[0] + SUITS[s1] + hand[1] + SUITS[s2]);
        }
      }
    } else if ( hand[2] === 'o') {
      for (let s1 = 0; s1 < 4; s1++) {
        for (let s2 = 0; s2 < 4; s2++) {
          if (s1 == s2) continue;
          combos.push(hand[0] + SUITS[s1] + hand[1] + SUITS[s2]);
        }
      }
    } else{
        //suited
        for (let s1 = 0; s1 < 4; s1++) {
            combos.push(hand[0] + SUITS[s1] + hand[1] + SUITS[s1]);
        }

    }
    console.log('getCombos combos: ', combos)
    return combos;
  };
  generateRangeView = () => {
    let buttonLabelStrings = [];
    for (let first = 0; first < RANKS.length; first++) {
      let suited = 'o';
      for (let last = 0; last < RANKS.length; last++) {
        if (first == last) {
          suited = 's';
        }
        if (first === last) {
          buttonLabelStrings.push(RANKS[first] + RANKS[last]);
        } else {
          buttonLabelStrings.push(RANKS[first] + RANKS[last] + suited);
        }
      }
    }

    this.rangeButtons = buttonLabelStrings.map((str) => {
      return (
        <button
          onClick={(e) => this.handleClick(str)}
          key={str}
          className={this.state[str] ? 'selected' : 'unselected'}
        >
          {' '}
          {str}
        </button>
      );
    });
  };
  render = () => {
    this.generateRangeView();
    return <div className='range-view-container'>{this.rangeButtons}</div>;
  };
}

export default RangeViewer;
