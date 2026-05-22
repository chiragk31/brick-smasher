// File: bfsWaterJug.js
// Water Jug Problem using BFS (Shortest Solution)

class State {
    constructor(jug1, jug2, path = []) {
        this.jug1 = jug1;
        this.jug2 = jug2;
        this.path = path;
    }
}

function waterJugBFS(capacity1, capacity2, target) {
    let visited = new Set();
    let queue = [];

    queue.push(new State(0, 0, []));

    while (queue.length > 0) {
        let current = queue.shift();

        let { jug1, jug2, path } = current;

        // Check target
        if (jug1 === target || jug2 === target) {
            console.log("Solution Found:\n");

            path.forEach((step, index) => {
                console.log(`${index + 1}. ${step}`);
            });

            console.log(`\nFinal State => (${jug1}, ${jug2})`);
            return;
        }

        let stateKey = `${jug1},${jug2}`;

        if (visited.has(stateKey)) continue;

        visited.add(stateKey);

        // Possible operations

        let nextStates = [
            // Fill Jug1
            new State(
                capacity1,
                jug2,
                [...path, `Fill Jug1 => (${capacity1}, ${jug2})`]
            ),

            // Fill Jug2
            new State(
                jug1,
                capacity2,
                [...path, `Fill Jug2 => (${jug1}, ${capacity2})`]
            ),

            // Empty Jug1
            new State(
                0,
                jug2,
                [...path, `Empty Jug1 => (0, ${jug2})`]
            ),

            // Empty Jug2
            new State(
                jug1,
                0,
                [...path, `Empty Jug2 => (${jug1}, 0)`]
            ),

            // Pour Jug1 -> Jug2
            (() => {
                let transfer = Math.min(jug1, capacity2 - jug2);

                return new State(
                    jug1 - transfer,
                    jug2 + transfer,
                    [
                        ...path,
                        `Pour Jug1 -> Jug2 => (${jug1 - transfer}, ${jug2 + transfer})`
                    ]
                );
            })(),

            // Pour Jug2 -> Jug1
            (() => {
                let transfer = Math.min(jug2, capacity1 - jug1);

                return new State(
                    jug1 + transfer,
                    jug2 - transfer,
                    [
                        ...path,
                        `Pour Jug2 -> Jug1 => (${jug1 + transfer}, ${jug2 - transfer})`
                    ]
                );
            })()
        ];

        queue.push(...nextStates);
    }

    console.log("No Solution Possible");
}

// Example
waterJugBFS(4, 3, 2);