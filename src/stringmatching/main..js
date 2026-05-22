// String Matching using Naive Pattern Searching Algorithm

function stringMatch(text, pattern) {
    let n = text.length;
    let m = pattern.length;
    let found = false;

    for (let i = 0; i <= n - m; i++) {
        let j;

        for (j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) {
                break;
            }
        }

        // If pattern matched completely
        if (j === m) {
            console.log(`Pattern found at index ${i}`);
            found = true;
        }
    }

    if (!found) {
        console.log("Pattern not found");
    }
}

// Example Usage
const text = "AABAACAADAABAABA";
const pattern = "AABA";

stringMatch(text, pattern);