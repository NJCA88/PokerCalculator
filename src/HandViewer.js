import React from 'react';

// const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const SUITS = ['c', 's', 'h', 'd'];

class HandViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
    // this.generateRangeView()
  }
  handleClick = (input) => {
    // let newSelected = this.state.selected.dup[input] = true
    // console.log(new)

    if (!this.state[input]) {
        if (this.state.selected === 2) {
            return;
        }
        this.setState({ [input]: true, selected: this.state.selected + 1 });
    } else {
      this.setState({ [input]: false , selected: this.state.selected - 1});
    }
  };
  generateRangeView = () => {
    let buttonLabelStrings = [];
    for (let suit = 0; suit < SUITS.length; suit++) {
      for (let rank = 0; rank < RANKS.length; rank++) {
        // do stuff
        buttonLabelStrings.push(RANKS[rank] + SUITS[suit]);
      }
    }
    // console.log("buttons are: ", buttonLabelStrings)

    this.rangeButtons = buttonLabelStrings.map((str) => {
      return (
        <button
          onClick={(e) => this.handleClick(str)}
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
    return <div className='hand-view-container'>{this.rangeButtons}</div>;
  };
}

export default HandViewer;
