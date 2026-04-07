const ROWS = 6;
const COLS = 5;

let currentRow = 0;
let currentCol = 0;
let board = [];
let answer = "";

const boardDiv = document.getElementById("board");
const keyboardDiv = document.getElementById("keyboard");

// STEP 1: Fetch words from backend
fetch("/api/words")
    .then(res => res.json())
    .then(words => {
        answer = words[Math.floor(Math.random() * words.length)].toUpperCase();
        initGame();
    });

// STEP 2: Initialize game board & keyboard
function initGame() {

    for (let r = 0; r < ROWS; r++) {
        let row = [];
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";

        for (let c = 0; c < COLS; c++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            rowDiv.appendChild(tile);
            row.push(tile);
        }

        boardDiv.appendChild(rowDiv);
        board.push(row);
    }

    "QWERTYUIOPASDFGHJKLZXCVBN".split("").forEach(k => {
        let btn = document.createElement("button");
        btn.textContent = k;
        btn.className = "key";
        btn.onclick = () => handleKey(k);
        keyboardDiv.appendChild(btn);
    });
}

// STEP 3: Keyboard handling
document.addEventListener("keydown", e => {
    if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
    if (e.key === "Enter") submitGuess();
    if (e.key === "Backspace") removeLetter();
});

function handleKey(letter) {
    if (currentCol < COLS) {
        board[currentRow][currentCol].textContent = letter;
        currentCol++;
    }
}

function removeLetter() {
    if (currentCol > 0) {
        currentCol--;
        board[currentRow][currentCol].textContent = "";
    }
}

// STEP 4: Submit guess
function submitGuess() {
    if (currentCol !== COLS) return;

    let guess = board[currentRow].map(t => t.textContent).join("");

    for (let i = 0; i < COLS; i++) {
        let tile = board[currentRow][i];
        tile.classList.add("flip");

        if (guess[i] === answer[i]) tile.classList.add("correct");
        else if (answer.includes(guess[i])) tile.classList.add("present");
        else tile.classList.add("absent");
    }

    if (guess === answer) {
        setTimeout(() => alert("🎉 You Win!"), 500);
        return;
    }

    currentRow++;
    currentCol = 0;

    if (currentRow === ROWS) {
        setTimeout(() => alert("❌ Game Over! Word: " + answer), 500);
    }
}
