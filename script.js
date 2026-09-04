let arr = [];

const SIZE = 20;
const SPEED = 100;
const MAX_VALUE = 250;
const CHART_HEIGHT = 320;


// ---------- Utility ----------

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Convert actual value into bar height
function getBarHeight(value) {
    return (value / MAX_VALUE) * CHART_HEIGHT;
}


// ---------- Generate Array ----------

function generateArray() {
    arr = [];

    const container = document.getElementById("array");

    container.innerHTML = "";

    for (let i = 0; i < SIZE; i++) {

        // Generate number between 20 and 219
        let value = Math.floor(Math.random() * 200) + 20;

        arr.push(value);

        const bar = document.createElement("div");

        bar.classList.add("bar");

        // Convert value into visual height
        bar.style.height = getBarHeight(value) + "px";

        // Show actual value when mouse is over bar
        bar.title = value;

        container.appendChild(bar);
    }

    document.getElementById("time").innerText = "";
}


// ---------- Bubble Sort ----------

async function bubbleSort() {

    const bars = document.getElementsByClassName("bar");

    let start = performance.now();

    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {

            // Highlight elements being compared
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            if (arr[j] > arr[j + 1]) {

                // Swap array values
                [arr[j], arr[j + 1]] =
                    [arr[j + 1], arr[j]];

                // Update bar heights
                bars[j].style.height =
                    getBarHeight(arr[j]) + "px";

                bars[j + 1].style.height =
                    getBarHeight(arr[j + 1]) + "px";

                // Update tooltip values
                bars[j].title = arr[j];
                bars[j + 1].title = arr[j + 1];
            }

            await sleep(SPEED);

            // Return color to normal
            bars[j].style.backgroundColor = "steelblue";
            bars[j + 1].style.backgroundColor = "steelblue";
        }
    }

    let end = performance.now();

    document.getElementById("time").innerText =
        `Bubble Sort Time: ${(end - start).toFixed(2)} ms`;
}


// ---------- Merge Sort ----------

async function mergeSortWrapper() {

    let start = performance.now();

    await mergeSort(0, arr.length - 1);

    let end = performance.now();

    document.getElementById("time").innerText =
        `Merge Sort Time: ${(end - start).toFixed(2)} ms`;
}


async function mergeSort(l, r) {

    if (l >= r) {
        return;
    }

    const m = Math.floor((l + r) / 2);

    await mergeSort(l, m);

    await mergeSort(m + 1, r);

    await merge(l, m, r);
}


async function merge(l, m, r) {

    const bars = document.getElementsByClassName("bar");

    let left = arr.slice(l, m + 1);

    let right = arr.slice(m + 1, r + 1);

    let i = 0;
    let j = 0;
    let k = l;


    while (i < left.length && j < right.length) {

        bars[k].style.backgroundColor = "green";

        await sleep(SPEED);


        if (left[i] <= right[j]) {

            arr[k] = left[i];

            i++;

        } else {

            arr[k] = right[j];

            j++;
        }


        bars[k].style.height =
            getBarHeight(arr[k]) + "px";

        bars[k].title = arr[k];

        bars[k].style.backgroundColor = "steelblue";

        k++;
    }


    while (i < left.length) {

        arr[k] = left[i];

        bars[k].style.height =
            getBarHeight(arr[k]) + "px";

        bars[k].title = arr[k];

        i++;
        k++;
    }


    while (j < right.length) {

        arr[k] = right[j];

        bars[k].style.height =
            getBarHeight(arr[k]) + "px";

        bars[k].title = arr[k];

        j++;
        k++;
    }
}


// ---------- Quick Sort ----------

async function quickSortWrapper() {

    let start = performance.now();

    await quickSort(0, arr.length - 1);

    let end = performance.now();

    document.getElementById("time").innerText =
        `Quick Sort Time: ${(end - start).toFixed(2)} ms`;
}


async function quickSort(low, high) {

    if (low < high) {

        let p = await partition(low, high);

        await quickSort(low, p - 1);

        await quickSort(p + 1, high);
    }
}


async function partition(low, high) {

    const bars = document.getElementsByClassName("bar");

    let pivot = arr[high];

    bars[high].style.backgroundColor = "purple";

    let i = low - 1;


    for (let j = low; j < high; j++) {

        bars[j].style.backgroundColor = "red";

        await sleep(SPEED);


        if (arr[j] < pivot) {

            i++;

            // Swap values
            [arr[i], arr[j]] =
                [arr[j], arr[i]];


            // Update bars
            bars[i].style.height =
                getBarHeight(arr[i]) + "px";

            bars[j].style.height =
                getBarHeight(arr[j]) + "px";


            // Update tooltip values
            bars[i].title = arr[i];
            bars[j].title = arr[j];
        }


        bars[j].style.backgroundColor = "steelblue";
    }


    // Put pivot in correct position
    [arr[i + 1], arr[high]] =
        [arr[high], arr[i + 1]];


    bars[i + 1].style.height =
        getBarHeight(arr[i + 1]) + "px";

    bars[high].style.height =
        getBarHeight(arr[high]) + "px";


    bars[i + 1].title = arr[i + 1];
    bars[high].title = arr[high];


    bars[high].style.backgroundColor = "steelblue";


    return i + 1;
}


// ---------- Generate Initial Array ----------

generateArray();