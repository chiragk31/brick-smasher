// File: solver.js

class NQueenSolver {
    constructor(size) {
        this.size = size;
        this.board = Array.from({ length: size }, () =>
            Array(size).fill(0)
        );
    }

    isSafe(row, col) {

        // Check left side of row
        for (let i = 0; i < col; i++) {
            if (this.board[row][i] === 1) {
                return false;
            }
        }

        // Check upper diagonal
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (this.board[i][j] === 1) {
                return false;
            }
        }

        // Check lower diagonal
        for (let i = row, j = col; i < this.size && j >= 0; i++, j--) {
            if (this.board[i][j] === 1) {
                return false;
            }
        }

        return true;
    }

    solve(col = 0) {

        // All queens placed
        if (col >= this.size) {
            return true;
        }

        // Try each row
        for (let row = 0; row < this.size; row++) {

            if (this.isSafe(row, col)) {

                // Place queen
                this.board[row][col] = 1;

                // Recur for next column
                if (this.solve(col + 1)) {
                    return true;
                }

                // Backtrack
                this.board[row][col] = 0;
            }
        }

        return false;
    }

    printBoard() {
        console.log("\nN-Queen Solution:\n");

        for (let i = 0; i < this.size; i++) {
            let row = "";

            for (let j = 0; j < this.size; j++) {
                row += this.board[i][j] === 1 ? " Q " : " . ";
            }

            console.log(row);
        }
    }
}

module.exports = NQueenSolver;