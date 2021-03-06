const Adagrams = {
  letters: ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'D', 'D', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'F', 'F', 'G', 'G', 'G', 'H', 'H', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'J', 'K', 'L', 'L', 'L', 'L', 'M', 'M', 'N', 'N', 'N', 'N', 'N', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'P', 'P', 'Q', 'R', 'R', 'R', 'R', 'R', 'R', 'S', 'S', 'S', 'S', 'T', 'T', 'T', 'T', 'T', 'T', 'U', 'U', 'U', 'U', 'V', 'V', 'W', 'W', 'X', 'Y', 'Y', 'Z'],
  //concept for letterScores taken from Kate in Time!
  letterScores: {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4, 
    Z: 10
  },
  drawLetters() {
    let hand = [];
    const randLetters = [];
    let i = 0;
    while (i < 10) {
      //Partially taken from kennytm's answer to stackoverflow q @ https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
      let randLetter = this.letters[this.letters.length * Math.random() << 0];

      while (randLetters.includes(randLetter)) {
        randLetter = this.letters[this.letters.length * Math.random() << 0];
      };
      randLetters.push(randLetter);
      hand.push(randLetter);
      i++;
    };
    return hand;
  },
  usesAvailableLetters(word, lettersInHand) {
    const letters = word.toUpperCase().split('');

    const filteredLetters = [];
    letters.forEach(letter => {
      lettersInHand.forEach(handLetter => {
        if (letter === handLetter) {
          filteredLetters.push(letter);
          lettersInHand.splice(lettersInHand.indexOf(handLetter), 1);
        }
      });
    });
    return (letters.length === filteredLetters.length);
  },
  scoreWord(word) {
    const letters = word.toUpperCase().split('');
    let score = 0;

    letters.forEach(letter => score += this.letterScores[letter]);
    
    if (letters.length >= 7 && letters.length <= 10) {
      score += 8;
    }
    return score;
  },
  tiebreaker(winningWord, word) {
    if (word.length === 10 && winningWord.length === 10) {
      return word;
    } else if (winningWord.length === 10 && word.length !== 10) {
      return winningWord;
    } else if (word.length === 10 && winningWord.length === 10) {
      return winningWord;
    } else if (word.length < winningWord.length) {
      return word;
    }
  },
  highestScoreFrom(words) {
    let winningWord = '';
    let winningScore = 0;

    //dictionary that calcs and stores words and their scores
    const scoredWordsDictionary = {};

    words.forEach(word => {
      scoredWordsDictionary[word] = this.scoreWord(word);
    });

    Object.keys(scoredWordsDictionary).forEach(word => {
      if (scoredWordsDictionary[word] > winningScore) {
        winningScore = scoredWordsDictionary[word];
        winningWord = word;
      } else if (scoredWordsDictionary[word] === winningScore
        ) {
        winningWord = this.tiebreaker(winningWord, word)
      }
    });
 
    return { word: winningWord, score: winningScore };
  }
};

// Do not remove this line or your tests will break!
export default Adagrams;