const VALUES = {

    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    T: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
};

const HAND_STRENGTHS = {
    'quads': 1,
    'full house': 2,
    'flush': 3,
    'straight': 4,
    "3 of a kind": 5,
    "2 pair": 6,
    "pair": 7,
    "high card": 8,
};

export class RiverTrial{

    constructor(hand1, hand2){
        this.hand1 = ['As', 'Ah', '5c', '3c', '2c', '7d', 'Th']
        this.hand2 = ['As', 'Kh', '5c', '3c', '2c', '7d', 'Th'];
    }
    eval(){
        const hand1 = (this.getHandStrength(this.hand1))
        const hand2 = (this.getHandStrength(this.hand2))
        let winner, winnerHand
        HAND_STRENGTHS[hand1] < HAND_STRENGTHS[hand2] ? winner = 'hand1' : winner = 'hand2';
        HAND_STRENGTHS[hand1] < HAND_STRENGTHS[hand2] ? winnerHand = this.hand1 : winnerHand = this.hand2;
        
        console.log("winner is: ", winner, "with: ", winnerHand)

    }
    getHandStrength(hand) {
        console.log('hand is: ', hand)
        const pairsHash = {};
        const suitsHash = {};
        const ranks = [];
        let values = [];
        for (var card_idx = 0; card_idx < hand.length; card_idx++) {
            pairsHash[hand[card_idx][0]] =
                pairsHash[hand[card_idx][0]] + 1 || 1;
            suitsHash[hand[card_idx][1]] =
                suitsHash[hand[card_idx][1]] + 1 || 1;
            ranks.push(hand[card_idx].rank);
            let val = (VALUES[hand[card_idx].rank]);
            if (!values.includes(val)) values.push(val)
        }
        console.log("suits hash is: ", suitsHash)
        // return
        values = values.sort((a, b) => a - b).reverse()


        if (Object.values(pairsHash).includes(4)) return "quads"
        if (Object.values(pairsHash).includes(3) && Object.values(pairsHash).includes(2)) return "full house"
        if (Object.values(suitsHash).sort((a, b) => a - b)[Object.values(suitsHash).length] >= 5) return "flush"
        if (Object.values(suitsHash).sort().reverse()[0] >= 5) return "flush"

        // somtimes makes straights out of 4 straights
        for (var start = 0; start < (values.length - 4); start++) {
            if (this.checkStraight(values.slice(start, start + 5)) === true) return "straight"
        }

        if (Object.values(pairsHash).includes(3)) return "3 of a kind"
        if (this.checkTwoPair(Object.values(pairsHash))) return "2 pair"
        if (Object.values(pairsHash).includes(2)) return "pair";
        return "high card"
    }
    checkStraight(valArr) {
        for (let i = 0; i < valArr.length; i++) {
            if (valArr[0] - valArr[i] != i) return false
        }
        return true
    }
    checkTwoPair(pairsHashArr) {
        for (let i = 0; i < pairsHashArr.length - 1; i++) {
            if (pairsHashArr[i] === 2) {
                for (let j = i + 1; j < pairsHashArr.length; j++) {
                    if (pairsHashArr[j] === 2) return true
                }
            }
        }
        return false
    }



}