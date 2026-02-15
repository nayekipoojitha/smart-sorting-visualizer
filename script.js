let arr = [];
const SIZE = 20;
const SPEED = 100;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateArray() {
    arr = [];
    const container = document.getElementById("array");
    container.innerHTML = "";

    for (let i = 0; i < SIZE; i++) {
        let value = Math.floor(Math.random() * 200) + 20;
        arr.push(value);

        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
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
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                bars[j].style.height = arr[j] + "px";
                bars[j + 1].style.height = arr[j + 1] + "px";
            }

            await sleep(SPEED);
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
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await mergeSort(l, m);
    await mergeSort(m + 1, r);
    await merge(l, m, r);
}

async function merge(l, m, r) {
    const bars = document.getElementsByClassName("bar");
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
        bars[k].style.backgroundColor = "green";
        await sleep(SPEED);

        if (left[i] <= right[j]) {
            arr[k] = left[i++];
        } else {
            arr[k] = right[j++];
        }

        bars[k].style.height = arr[k] + "px";
        bars[k].style.backgroundColor = "steelblue";
        k++;
    }

    while (i < left.length) {
        arr[k] = left[i++];
        bars[k].style.height = arr[k] + "px";
        k++;
    }

    while (j < right.length) {
        arr[k] = right[j++];
        bars[k].style.height = arr[k] + "px";
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
            [arr[i], arr[j]] = [arr[j], arr[i]];
            bars[i].style.height = arr[i] + "px";
            bars[j].style.height = arr[j] + "px";
        }

        bars[j].style.backgroundColor = "steelblue";
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    bars[i + 1].style.height = arr[i + 1] + "px";
    bars[high].style.backgroundColor = "steelblue";

    return i + 1;
}

generateArray();
