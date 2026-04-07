// Game connection
// Access the global equations variable
const equationsList = window.equations || [
    "10+20=30",
    "3*4+2=14"
];

let target = equationsList[Math.floor(Math.random() * equationsList.length)];
console.log("Target equation:", target);

let currentGuess = "";
let attempts = 0;
const maxAttempts = 6;
const wordLength = 8; // Fixed length for grid

const gameBoard = document.getElementById('game-board');
const keyboard = document.getElementById('keyboard');

// Listen for on-screen keyboard
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        handleInput(e.target.textContent);
    }
});

// Listen for physical keyboard
document.addEventListener('keydown', (e) => {
    let key = e.key;
    if (key === 'Enter') key = 'ENTER';
    if (key === 'Backspace') key = '⌫';

    if ("0123456789+-*/=ENTER⌫".includes(key)) {
        handleInput(key);
    }
});

function handleInput(key) {
    if (key === 'ENTER') {
        submitGuess();
    } else if (key === '⌫') {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            updateGridPreview();
        }
    } else {
        if (currentGuess.length < wordLength) {
            currentGuess += key;
            updateGridPreview();
        }
    }
}

// Initial Grid Creation (Empty rows)
function createEmptyGrid() {
    for (let i = 0; i < maxAttempts; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.id = `row-${i}`;
        for (let j = 0; j < wordLength; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            row.appendChild(tile);
        }
        gameBoard.appendChild(row);
    }
}

function updateGridPreview() {
    const row = document.getElementById(`row-${attempts}`);
    const tiles = row.children;
    for (let i = 0; i < wordLength; i++) {
        tiles[i].textContent = currentGuess[i] || "";
    }
}

function submitGuess() {
    if (currentGuess.length !== wordLength) {
        alert("Equation must be 8 characters!");
        return;
    }

    // Basic Maths Validation
    if (!isValidEquation(currentGuess)) {
        alert("Invalid equation!");
        return;
    }

    const feedback = checkGuess(currentGuess);
    displayFeedback(feedback);

    if (currentGuess === target) {
        setTimeout(() => alert("You Win!"), 100);
    } else {
        attempts++;
        currentGuess = "";
        if (attempts >= maxAttempts) {
            setTimeout(() => alert(`Game Over! Equation: ${target}`), 100);
        }
    }
}

function isValidEquation(eq) {
    if (!eq.includes('=')) return false;
    const parts = eq.split('=');
    if (parts.length !== 2) return false;
    try {
        // Safe chars only for eval
        if (/[^0-9+\-*/]/.test(parts[0]) || /[^0-9+\-*/]/.test(parts[1])) return false;
        // eslint-disable-next-line no-eval
        return eval(parts[0]) == eval(parts[1]);
    } catch {
        return false;
    }
}

function checkGuess(guess) {
    const feedback = [];
    const targetArr = target.split('');
    const guessArr = guess.split('');
    const usedIndices = new Set();

    // Initialize feedback array
    for (let i = 0; i < wordLength; i++) feedback.push('black');

    // Green Pass
    for (let i = 0; i < wordLength; i++) {
        if (guessArr[i] === targetArr[i]) {
            feedback[i] = 'green';
            usedIndices.add(i);
        }
    }

    // Purple Pass
    for (let i = 0; i < wordLength; i++) {
        if (feedback[i] !== 'green') {
            const char = guessArr[i];
            // Find if this char exists elsewhere in target and hasn't been matched
            // Simple approach: count occurrences? 
            // Better: find first unused index in target with this char
            let foundIndex = -1;
            for (let j = 0; j < wordLength; j++) {
                if (!usedIndices.has(j) && targetArr[j] === char) {
                    foundIndex = j;
                    break;
                }
            }

            if (foundIndex !== -1) {
                feedback[i] = 'purple';
                usedIndices.add(foundIndex);
            }
        }
    }
    return feedback;
}

function displayFeedback(feedback) {
    const row = document.getElementById(`row-${attempts}`);
    const tiles = row.children;
    for (let i = 0; i < wordLength; i++) {
        tiles[i].classList.add(feedback[i]);
    }
}

createEmptyGrid();
