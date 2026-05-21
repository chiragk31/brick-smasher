// File: app.js

const NQueenSolver = require("./solver");

// Change board size here
const n = 8;

console.log(`Solving ${n}-Queen Problem...\n`);

const queenSolver = new NQueenSolver(n);

if (queenSolver.solve()) {
    queenSolver.printBoard();
} else {
    console.log("No solution exists.");
}