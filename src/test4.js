// sorting.js

// --------------------
// Bubble Sort
// --------------------
function bubbleSort(arr) {
    let n = arr.length;
    let result = [...arr]; // avoid mutating original array

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                // swap
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }

        // optimization: stop if already sorted
        if (!swapped) break;
    }

    return result;
}

// --------------------
// Merge Sort
// --------------------
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// --------------------
// Example Usage
// --------------------
const array = [64, 34, 25, 12, 22, 11, 90];

console.log("Original:", array);

console.log("Bubble Sort:", bubbleSort(array));
console.log("Merge Sort:", mergeSort(array));