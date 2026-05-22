// File: dfsWaterJug.js
// Water Jug Problem using DFS

let visited = new Set();

function waterJugDFS(jug1, jug2, capacity1, capacity2, target, path) {

    if (jug1 === target || jug2 === target) {
        console.log("Solution Found:\n");

        path.forEach((step, index) => {
            console.log(`${index + 1}. ${step}`);
        });

        console.log(`\nFinal State => (${jug1}, ${jug2})`);
        return true;
    }

    let stateKey = `${jug1},${jug2}`;

    if (visited.has(stateKey)) {
        return false;
    }

    visited.add(stateKey);

    let states = [];

    // Fill Jug1
    states.push([
        capacity1,
        jug2,
        `Fill Jug1 => (${capacity1}, ${jug2})`
    ]);

    // Fill Jug2
    states.push([
        jug1,
        capacity2,
        `Fill Jug2 => (${jug1}, ${capacity2})`
    ]);

    // Empty Jug1
    states.push([
        0,
        jug2,
        `Empty Jug1 => (0, ${jug2})`
    ]);

    // Empty Jug2
    states.push([
        jug1,
        0,
        `Empty Jug2 => (${jug1}, 0)`
    ]);

    // Pour Jug1 -> Jug2
    let transfer1 = Math.min(jug1, capacity2 - jug2);

    states.push([
        jug1 - transfer1,
        jug2 + transfer1,
        `Pour Jug1 -> Jug2 => (${jug1 - transfer1}, ${jug2 + transfer1})`
    ]);

    // Pour Jug2 -> Jug1
    let transfer2 = Math.min(jug2, capacity1 - jug1);

    states.push([
        jug1 + transfer2,
        jug2 - transfer2,
        `Pour Jug2 -> Jug1 => (${jug1 + transfer2}, ${jug2 - transfer2})`
    ]);

    for (let [newJug1, newJug2, action] of states) {

        if (
            waterJugDFS(
                newJug1,
                newJug2,
                capacity1,
                capacity2,
                target,
                [...path, action]
            )
        ) {
            return true;
        }
    }

    return false;
}

// Example
waterJugDFS(0, 0, 4, 3, 2, []);