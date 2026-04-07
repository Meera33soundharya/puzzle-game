class WordleSolver {
  constructor(wordList) {
    this.wordList = wordList;
  }

  solve(secretWord) {
    let possibleWords = [...this.wordList];
    const guesses = [];
    let feedback = '';

    while (feedback !== 'ggggg') {
      const guess = this.getBestGuess(possibleWords);
      guesses.push(guess);
      feedback = this.getFeedback(secretWord, guess);

      possibleWords = this.filterWordList(possibleWords, guess, feedback);
    }

    return guesses;
  }

  getBestGuess(possibleWords) {
    // For simplicity, we just pick the first word from the list.
    // A real solver would have a more sophisticated strategy.
    return possibleWords[0];
  }

  getFeedback(secretWord, guess) {
    let feedback = '';
    for (let i = 0; i < 5; i++) {
      if (secretWord[i] === guess[i]) {
        feedback += 'g'; // green
      } else if (secretWord.includes(guess[i])) {
        feedback += 'y'; // yellow
      } else {
        feedback += 'b'; // black (or grey)
      }
    }
    return feedback;
  }

  filterWordList(wordList, guess, feedback) {
    return wordList.filter(word => {
      for (let i = 0; i < 5; i++) {
        if (feedback[i] === 'g' && word[i] !== guess[i]) {
          return false;
        } else if (feedback[i] === 'y') {
          if (!word.includes(guess[i]) || word[i] === guess[i]) {
            return false;
          }
        } else if (feedback[i] === 'b' && word.includes(guess[i])) {
          // This is a simplification. A real solver would need to handle duplicate letters.
          return false;
        }
      }
      return true;
    });
  }
}

const wordList = [
  'aback', 'abase', 'abate', 'abbey', 'abhor', 'abide', 'abled', 'abode', 'abort', 'about',
  'above', 'abuse', 'abyss', 'acorn', 'acrid', 'actor', 'acute', 'adage', 'adapt', 'adept',
  'admin', 'admit', 'adobe', 'adopt', 'adore', 'adorn', 'adult', 'affix', 'afire', 'afoot',
  'afoul', 'after', 'again', 'agape', 'agate', 'agent', 'agile', 'aging', 'aglow', 'agony',
  'agree', 'ahead', 'aider', 'aisle', 'alarm', 'album', 'alert', 'algae', 'alibi', 'alien',
  'align', 'alike', 'alive', 'allay', 'alley', 'allot', 'allow', 'alloy', 'aloof', 'aloud',
  'alpha', 'altar', 'alter', 'amass', 'amaze', 'amber', 'amble', 'amend', 'amiss', 'amity',
  'among', 'ample', 'amply', 'amuse', 'angel', 'anger', 'angle', 'angry', 'angst', 'anime',
  'ankle', 'annex', 'annoy', 'annul', 'anode', 'antic', 'anvil', 'aorta', 'apart', 'aphid',
  'aping', 'apnea', 'apple', 'apply', 'apron', 'aptly', 'arbor'
];

const solver = new WordleSolver(wordList);
const secretWord = 'apple';
const guesses = solver.solve(secretWord);

console.log(`The secret word was: ${secretWord}`);
console.log(`The solver found the word in ${guesses.length} guesses:`);
console.log(guesses.join(' -> '));
