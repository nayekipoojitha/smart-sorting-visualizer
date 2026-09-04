let arr=[];
const SIZE=20;
const SPEED=100;
const MAX_VALUE=250;
const CHART_HEIGHT=320;
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}
function getBarHeight(value){
    return(value/MAX_VALUE)*CHART_HEIGHT;
}
function generateArray(){
    arr=[];
    const container=document.getElementById("array");
    container.innerHTML="";
    for(let i=0;i<SIZE;i++){
        let value=Math.floor(Math.random()*200)+20;
        arr.push(value);
        const bar=document.createElement("div");
        bar.classList.add("bar");
        bar.style.height=getBarHeight(value)+"px";
        bar.title=value;
        container.appendChild(bar);
    }
    document.getElementById("time").innerText="";
}
async function bubbleSort(){
    const bars=document.getElementsByClassName("bar");
    let start=performance.now();
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-i-1;j++){
            bars[j].style.backgroundColor="red";
            bars[j+1].style.backgroundColor="red";
            if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
                bars[j].style.height=getBarHeight(arr[j])+"px";
                bars[j+1].style.height=getBarHeight(arr[j+1])+"px";
                bars[j].title=arr[j];
                bars[j+1].title=arr[j+1];
            }
            await sleep(SPEED);
            bars[j].style.backgroundColor="steelblue";
            bars[j+1].style.backgroundColor="steelblue";
        }
    }
    let end=performance.now();
    document.getElementById("time").innerText=`Bubble Sort Time: ${(end-start).toFixed(2)} ms`;
}
async function mergeSortWrapper(){
    let start=performance.now();
    await mergeSort(0,arr.length-1);
    let end=performance.now();
    document.getElementById("time").innerText=`Merge Sort Time: ${(end-start).toFixed(2)} ms`;
}
async function mergeSort(l,r){
    if(l>=r){
        return;
    }
    const m=Math.floor((l+r)/2);
    await mergeSort(l,m);
    await mergeSort(m+1,r);
    await merge(l,m,r);
}
async function merge(l,m,r){
    const bars=document.getElementsByClassName("bar");
    let left=arr.slice(l,m+1);
    let right=arr.slice(m+1,r+1);
    let i=0;
    let j=0;
    let k=l;
    while(i<left.length&&j<right.length){
        bars[k].style.backgroundColor="green";
        await sleep(SPEED);
        if(left[i]<=right[j]){
            arr[k]=left[i];
            i++;
        }else{
            arr[k]=right[j];
            j++;
        }
        bars[k].style.height=getBarHeight(arr[k])+"px";
        bars[k].title=arr[k];
        bars[k].style.backgroundColor="steelblue";
        k++;
    }
    while(i<left.length){
        arr[k]=left[i];
        bars[k].style.height=getBarHeight(arr[k])+"px";
        bars[k].title=arr[k];
        i++;
        k++;
    }
    while(j<right.length){
        arr[k]=right[j];
        bars[k].style.height=getBarHeight(arr[k])+"px";
        bars[k].title=arr[k];
        j++;
        k++;
    }
}
async function quickSortWrapper(){
    let start=performance.now();
    await quickSort(0,arr.length-1);
    let end=performance.now();
    document.getElementById("time").innerText=`Quick Sort Time: ${(end-start).toFixed(2)} ms`;
}
async function quickSort(low,high){
    if(low<high){
        let p=await partition(low,high);
        await quickSort(low,p-1);
        await quickSort(p+1,high);
    }
}
async function partition(start,end){
    const bars=document.getElementsByClassName("bar");
    let pivot=arr[start];
    bars[start].style.backgroundColor="purple";
    let i=start;
    let j=end;
    while(i<j){
        while(i<end&&arr[i]<=pivot){
            i++;
        }
        while(j>start&&arr[j]>pivot){
            j--;
        }
        if(i<j){
            [arr[i],arr[j]]=[arr[j],arr[i]];
            bars[i].style.height=getBarHeight(arr[i])+"px";
            bars[j].style.height=getBarHeight(arr[j])+"px";
            bars[i].title=arr[i];
            bars[j].title=arr[j];
            await sleep(SPEED);
        }
    }
    [arr[start],arr[j]]=[arr[j],arr[start]];
    bars[start].style.height=getBarHeight(arr[start])+"px";
    bars[j].style.height=getBarHeight(arr[j])+"px";
    bars[start].title=arr[start];
    bars[j].title=arr[j];
    bars[start].style.backgroundColor="steelblue";
    return j;
}
generateArray();
