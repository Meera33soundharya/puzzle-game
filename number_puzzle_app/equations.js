const equations = [
    "3+4-2=5",  // 7 chars? User said 8. Let's fix.
    "10+5=15",  // 6 
    "3*4+2=14", // 8 chars (Matches user example)
    "9*2-8=10", // 8 chars
    "50/5-2=8", // 8 chars
    "12+5+3=20",// 9 chars?
    "10-3+0=7"  // 8 chars
];
// Ensure standard 8 char length if possible for grid consistency, or handle dynamic length.
// Use strictly 8 char equations for safety with the 8-col grid.

const validEquations = [
    "10+20=30",
    "3*4+2=14",
    "40/5+1=9",
    "56/8-2=5",
    "20-5-8=7",
    "9+9-8=10"
];

// Reassigning to the variable user's script expects
const equationsSource = validEquations;
// For valid variable name in app.js, user used 'equations'
// I will just use 'equations' and overwrite the example top list with the valid 8-char ones.

window.equations = [
    "10+20=30",
    "3*4+2=14",
    "40/5+1=9",
    "56/8-2=5",
    "20-5-8=7",
    "9+9-8=10"
];
