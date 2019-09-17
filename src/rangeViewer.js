import React from 'react'
import './rangeview.css'

// const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const SUITS = ['c', 's', 'h', 'd'];

 class RangeViewer extends React.Component {
    constructor(props){
        super(props)
        this.state={selected: ""  }
        // this.generateRangeView()
    }
    handleClick = (input) =>{
        // let newSelected = this.state.selected.dup[input] = true
        // console.log(new)
        if (!this.state[input]){
            this.setState({[input]: true}, ()=>console.log(this.state))
        } else{
            this.setState({[input]: false}, ()=>console.log(this.state))
        }
    }
    generateRangeView = () =>{
        let buttonLabelStrings = []
        for (let first=0; first< RANKS.length; first++){
            let suited = 'o'
            for (let last = 0; last < RANKS.length; last++) {
                if (first == last){
                    suited = 's'
                }
                if (first === last){
                    buttonLabelStrings.push(RANKS[first] + RANKS[last])
                } else{
                    buttonLabelStrings.push(RANKS[first] + RANKS[last] + suited)
                }
            }            
        }

        this.rangeButtons = buttonLabelStrings.map(str =>{

            return (
                <button onClick={e=>this.handleClick(str)} key={str} className={ this.state[str] ? "selected" : 'unselected' }> {str}</button>
            )
        })

        
    }
    render = () =>{
        this.generateRangeView()
        return(
            <div className='range-view-container'>
                {this.rangeButtons}
            </div>
        )
    }
}

export default RangeViewer