const VALUES = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
};

const HAND_STRENGTHS = {
  quads: 1,
  'full house': 2,
  flush: 3,
  straight: 4,
  '3 of a kind': 5,
  '2 pair': 6,
  pair: 7,
  'high card': 8
};

export class RiverTrial {
  constructor(hand1, hand2) {
    this.hand1 = ['As', 'Ah', 'Kc', '3c', '2c', '7d', 'Th'];
    this.hand2 = [
      ['As', 'Ah', '5c', '3c', '2c', '7d', 'Th'],
      ['As', 'Ah', 'Ac', '3c', '2c', '7d', 'Th']
    ];
    this.pairsHashHand1 = {};
    this.pairsHashHand2 = {};
    this.suitsHashHand1 = {};
    this.suitsHashHand2 = {};
    this.runTrial();
  }
  runTrial = () => {
    // aggregate results and return them
    let h1Victories = 0;
    let totalTrials = 0;
    for (let i = 0; i < this.hand2.length; i++) {
        this.resetHashes()
      if (this.eval(this.hand1, this.hand2[i]) === 'hand1') {
        h1Victories += 1;
        totalTrials += 1;
      } else {
        totalTrials += 1;
      }
    }

    console.log('h1v, total trials: ', h1Victories, totalTrials);
  };
  resetHashes = ()=>{
      this.pairsHashHand1 = {};
      this.pairsHashHand2 = {};
      this.suitsHashHand1 = {};
      this.suitsHashHand2 = {};
      this.sortedH1 = []
      this.sortedH2 = []
  }
  eval(hand1, hand2) {
    const hand1type = this.getHandStrength(hand1, 1);
    const hand2type = this.getHandStrength(hand2, 2);

    let winner, winnerHand;
    if (HAND_STRENGTHS[hand1type] < HAND_STRENGTHS[hand2type]) {
      winner = 'hand1';
      
      winnerHand = this.hand1;
    } else if (HAND_STRENGTHS[hand1type] > HAND_STRENGTHS[hand2type]) {
      winner = 'hand2';
      winnerHand = this.hand2;
    }
    if (winner) {
      console.log(winner);
      return winner;
    } else {
      winner = this.breakTie(hand1, hand2, hand1type);
      return winner;
    }
  }
  breakTie(hand1, hand2, handType) {
    this.sortedH1 = hand1.sort((a, b) => VALUES[a[0]] - VALUES[b[0]]).reverse();
    this.sortedH2 = hand2.sort((a, b) => VALUES[a[0]] - VALUES[b[0]]).reverse();

    for (let i = 0; i < this.sortedH1.length; i++) {
      this.pairsHashHand1[this.sortedH1[i][0]] =
        this.pairsHashHand1[this.sortedH1[i][0]] + 1 || 1;
      this.pairsHashHand2[this.sortedH2[i][0]] =
        this.pairsHashHand2[this.sortedH2[i][0]] + 1 || 1;
      this.suitsHashHand1[this.sortedH1[i][1]] =
        this.suitsHashHand1[this.sortedH1[i][1]] + 1 || 1;
      this.suitsHashHand2[this.sortedH2[i][1]] =
        this.suitsHashHand2[this.sortedH2[i][1]] + 1 || 1;
    }

    if (handType === 'high card') {
      return this.evalHighCard();
    } else if (handType === 'pair') {
      return this.evalPairs();
    } else if (handType === '2 pair') {
      return this.evalTwoPairs();
    } else if (handType === '3 of a kind') {
      return this.evalTrips();
    } else if (handType === 'straight') {
      return this.evalStraight();
    } else if (handType === 'flush') {
      return this.evalFlush();
    } else if (handType === 'full house') {
      return this.evalFullHouse();
    } else if (handType === 'quads') {
      return this.evelQuads();
    }
  }
  evalHighCard = () => {
    for (let i = 0; i < 7; i++) {
      if (VALUES[this.sortedH1[i][0]] > VALUES[this.sortedH2[i][0]]) {
        return 'hand1';
      } else if (VALUES[this.sortedH1[i][0]] < VALUES[this.sortedH2[i][0]]) {
        return 'hand2';
      }
    }
    return 'tie';
  };
  evalPairs = () => {
    let p1, p2;

    Object.keys(this.pairsHashHand1).forEach((key) => {
      if (this.pairsHashHand1[key] == 2) {
        p1 = key;
      }
    });
    Object.keys(this.pairsHashHand2).forEach((key) => {
      if (this.pairsHashHand1[key] == 2) {
        p2 = key;
      }
    });
    if (VALUES[p1] > VALUES[p2]) {
      return 'hand1';
    } else if (VALUES[p1] < VALUES[p2]) {
      return 'hand2';
    }
    for (let i = 0; i < 7; i++) {
      if (VALUES[this.sortedH1[i][0]] > VALUES[this.sortedH2[i][0]]) {
        return 'hand1';
      } else if (VALUES[this.sortedH1[i][0]] < VALUES[this.sortedH2[i][0]]) {
        return 'hand2';
      }
    }
    return 'tie';
  };
  evalTwoPairs = () => {
    return;
  };
  evalTrips = () => {
    return;
  };
  evalStraight = () => {
    return;
  };
  evalFlush = () => {
    return;
  };
  evalFullHouse = () => {
    return;
  };
  evalQuads = () => {
    return;
  };
  getHandStrength(hand) {
    // console.log('hand is: ', hand);
    const pairsHash = {};
    const suitsHash = {};
    const ranks = [];
    let values = [];
    for (var card_idx = 0; card_idx < hand.length; card_idx++) {
      pairsHash[hand[card_idx][0]] = pairsHash[hand[card_idx][0]] + 1 || 1;
      suitsHash[hand[card_idx][1]] = suitsHash[hand[card_idx][1]] + 1 || 1;
      ranks.push(hand[card_idx].rank);
      let val = VALUES[hand[card_idx].rank];
      if (!values.includes(val)) values.push(val);
    }
    // return
    values = values.sort((a, b) => a - b).reverse();

    if (Object.values(pairsHash).includes(4)) return 'quads';
    if (
      Object.values(pairsHash).includes(3) &&
      Object.values(pairsHash).includes(2)
    )
      return 'full house';
    if (
      Object.values(suitsHash).sort((a, b) => a - b)[
        Object.values(suitsHash).length
      ] >= 5
    )
      return 'flush';
    if (
      Object.values(suitsHash)
        .sort()
        .reverse()[0] >= 5
    )
      return 'flush';

    // somtimes makes straights out of 4 straights
    for (var start = 0; start < values.length - 4; start++) {
      if (this.checkStraight(values.slice(start, start + 5)) === true)
        return 'straight';
    }

    if (Object.values(pairsHash).includes(3)) return '3 of a kind';
    if (this.checkTwoPair(Object.values(pairsHash))) return '2 pair';
    if (Object.values(pairsHash).includes(2)) return 'pair';
    return 'high card';
  }
  checkStraight(valArr) {
    for (let i = 0; i < valArr.length; i++) {
      if (valArr[0] - valArr[i] != i) return false;
    }
    return true;
  }
  checkTwoPair(pairsHashArr) {
    for (let i = 0; i < pairsHashArr.length - 1; i++) {
      if (pairsHashArr[i] === 2) {
        for (let j = i + 1; j < pairsHashArr.length; j++) {
          if (pairsHashArr[j] === 2) return true;
        }
      }
    }
    return false;
  }
}
