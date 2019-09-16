import React from 'react';
import logo from './logo.svg';
import './App.css';
import {RiverTrial} from './riverTrial'
import RangeViewer from './rangeViewer'

// function App() {
//   return (
//     <div className="App">
//       <h1>POKER CALCULATOR</h1>
//     </div>
//   );
// }
class App extends React.Component {
  constructor(props){
    super(props)
    this.trial = new RiverTrial
    this.trial.eval()
  }
  render(){
    return(
    <div className="App">
      <h1>POKER CALCULATOR</h1>
      <RangeViewer />
    </div>
    )
  }
}

export default App;
