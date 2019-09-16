import React from 'react'

// const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
const SUITS = ['c', 's', 'h', 'd'];

 class RangeViewer extends React.Component {
    constructor(props){
        super(props)
        this.state={selected:[]}
        this.generateRangeView()
    }
    handleClick = (input) =>{
        let newSelected = this.state.selected.dup.push(input)
        this.setState({selected: newSelected})
    }
    generateRangeView = () =>{
        let buttonLabelStrings = []

        for (let first=0; first< RANKS.length; first++){
            //for each column
            let suited = 'o'
            for (let last = 0; last < RANKS.length; last++) {
                if (first == last){
                    suited = 's'
                }
                // buttonLabelStrings.push(RANKS[first] + RANKS[last] + suited)
                if (first === last){
                    buttonLabelStrings.push(RANKS[first] + RANKS[last])
                } else{
                    buttonLabelStrings.push(RANKS[first] + RANKS[last] + suited)
                }
            }            
        }
        console.log("buttons are: ", buttonLabelStrings)

        
    }
    render = () =>{
        return(
            <div>RANGE VIEWER</div>
        )
    }
}

export default RangeViewer