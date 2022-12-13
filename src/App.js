import './App.css';
import {useState} from 'react';

function App() {

  const ARRAY_SIZE = 50;

  const [array, setArray] = useState(Array.from({length: ARRAY_SIZE}, () => Math.floor(Math.random() * 500)));
  const [delay, setDelay] = useState(1000)
  const [timeToExecute, setTimeToExecute] = useState('0.0s')
  const [numberOfSwaps, setNumberOfSwaps] = useState(0)
  const [numberOfSortedElements, setNumberOfSortedElements] = useState(0)
  const [arraySize, setArraySize] = useState(ARRAY_SIZE)
  const [isSorting, setIsSorting] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [sortName, setSortName] = useState('')

  console.log('Page Refreshed')


  const barSelectColor = 'bg-blue-800'
  const barRegularColor = 'bg-blue-500'
  const pivotColor = 'bg-red-500'
  const memoryColor = 'bg-yellow-500'

  const resetStats = () => {
    setNumberOfSwaps(0)
    setNumberOfSortedElements(0)
    setTimeToExecute('0.0s')
    setIsSorted(false)
    setSortName('')
    setIsSorting(false)
  }

  const timer = (delay) => {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  const setBarColor = async(elem1, elem2, removeColor, setColor) => {
    elem1.classList.add(setColor)
    elem1.classList.remove(removeColor)
    elem2.classList.remove(removeColor)
    elem2.classList.add(setColor)
  }

  const animateMove = async(elem1, elem2, distance) => {

    var transRegex = /\.*translate\((.*)px\)/i;
    let elem1Id = elem1.getAttribute('name')
    let elem2Id = elem2.getAttribute('name')

    let transformElem1 = transRegex.exec(elem1.style.transform) ? parseInt(transRegex.exec(elem1.style.transform)[1]) : 0
    let transformElem2 = transRegex.exec(elem2.style.transform) ? parseInt(transRegex.exec(elem2.style.transform)[1]) : 0

    console.log(transformElem1, transformElem2, distance + transformElem1, distance + transformElem2)

    elem1.style.transform = `translate(${Math.abs(distance + transformElem2)}px)`
    elem2.style.transform = `translate(${distance + transformElem1}px)`
    elem1.setAttribute('name', elem2Id)
    elem2.setAttribute('name', elem1Id)

    // console.log(elem1.id)
    // console.log(elem2.id)

  }

  const checkIfSorted = () => {
    for(let i = 0; i < array.length - 1; i++) {
      if(array[i] > array[i + 1]) {
        setIsSorted(false)
        return
      }
    }
    setIsSorted(true)
  }

  const bubbleSort = async() => {
    let copyArray = array
    resetStats()
    setIsSorting(true)
    setSortName('Bubble Sort')
    let start = new Date().getTime()

    for(let i = 0; i < copyArray.length; i++) {
      let maxIdx = 0;

      for(let j = 1; j < copyArray.length-i; j++){

        // let chart = document.get

        let maxBar = document.getElementsByName('array'+maxIdx.toString())[0]
        let compareBar = document.getElementsByName('array'+j.toString())[0]

        // console.log(maxBar)
        // console.log(compareBar)
        
        let distance = maxBar.offsetLeft - compareBar.offsetLeft

        setBarColor(maxBar, compareBar, barRegularColor, barSelectColor)

        if(copyArray[maxIdx] > copyArray[j]){
          // console.log({
          //   maxBarIdx: maxIdx,
          //   maxBarVal: copyArray[maxIdx],
          //   compareBarIdx: j,  
          //   compareBarVal: copyArray[j],
          //   array: copyArray
          // })
          let temp = copyArray[maxIdx]

          copyArray[maxIdx] = copyArray[j]
          copyArray[j] = temp

          // animateMove(maxBar, compareBar, distance)

          setArray( copyArray.map(value => value))
          setNumberOfSwaps(prevNumberOfSwaps => prevNumberOfSwaps + 1)
          
        } 
        maxIdx = j

        if(delay !== 0) 
          await timer(delay)
        
        setBarColor(maxBar, compareBar, barSelectColor, barRegularColor)
      }
      setNumberOfSortedElements(prevNumberOfSortedElements => prevNumberOfSortedElements + 1)
    }
    setTimeToExecute((new Date().getTime() - start)/1000 + 'Seconds')
    setIsSorting(false)

    checkIfSorted()
    
    setArray(copyArray)
  }

  const getDelayValue = async(e) => {
      console.log(e.target.value)
      setDelay(e.target.value*1000)
  }

  const alexSort = async(e) => {

    let copyArray = array
    let swaps = 0
    let sortedElements = 0

    resetStats()
    setIsSorting(true)
    setSortName('Alex Sort')

    let start = new Date().getTime()

    for(let i = 0; i < copyArray.length; i++) { 

      if(copyArray.length/2 - i + 1 === 0) {
        break;
      }

      for(let j = 0; j < copyArray.length/2; j++){
        // Left pointer 
        let leftBar = document.getElementsByName('array'+j.toString())[0]
        let leftCompare = document.getElementsByName('array'+(j+1).toString())[0]

        setBarColor(leftBar, leftCompare, barRegularColor, barSelectColor)

        if(copyArray[j] > copyArray[j+1]) {
          let temp = copyArray[j]
          copyArray[j] = copyArray[j+1]
          copyArray[j+1] = temp
        }


        // Right pointer
        let rightBar = document.getElementsByName('array'+(copyArray.length - j).toString())[0]
        let rightCompare = document.getElementsByName('array'+(copyArray.length - j - 1).toString())[0]

        setBarColor(rightBar, rightCompare, barRegularColor, barSelectColor)

        if(copyArray[copyArray.length - j] < copyArray[copyArray.length - j - 1]) {
          let temp = copyArray[copyArray.length - j]
          copyArray[copyArray.length - j] = copyArray[copyArray.length - j - 1]
          copyArray[copyArray.length - j - 1] = temp
        }

        
        if(delay >= 0) {
          await timer(delay)
          
          setNumberOfSwaps(prevNumberOfSwaps => prevNumberOfSwaps + 1)
        } 
        setBarColor(leftBar, leftCompare, barSelectColor, barRegularColor)
        setBarColor(rightBar, rightCompare, barSelectColor, barRegularColor)
      }
      if(delay >= 0) {
        setNumberOfSortedElements(prevNumberOfSortedElements => prevNumberOfSortedElements + 1)
      } else {
        sortedElements++
      }
    }

    setTimeToExecute((new Date().getTime() - start)/1000 + 'Seconds')
    setArray(copyArray)
    setIsSorting(false)

    if(delay === 0) {
      setNumberOfSwaps(swaps)
      setNumberOfSortedElements(sortedElements)
    }


    checkIfSorted()
  }

  const changeArraySize = async(e) => {
    let value = e.target.value

    if(isNaN(value) || value < 1) {
      return
    }

    setArraySize(parseInt(value))
    document.getElementById('generateArr').click()
  }

  const quickSort = async(e) => {

    resetStats()
    setIsSorting(true)
    setSortName('Quick Sort')

    let start = new Date().getTime()
    await quickSortHelper(array, 0, array.length-1)
    setTimeToExecute((new Date().getTime() - start)/1000 + 'Seconds')
    checkIfSorted()
    setIsSorting(false)
  }

  const partition = async(array, start, end) => {

    let pivot = array[end]

    const pivotBar = document.getElementsByName('array'+end.toString())[0]
    setBarColor(pivotBar, pivotBar, barRegularColor, pivotColor)

    let i = start - 1

    for(let j = start; j < end; j++) {
      const compareBar = document.getElementsByName('array'+j.toString())[0]
      setBarColor(compareBar, compareBar, barRegularColor, barSelectColor)
      const memoryBar = document.getElementsByName('array'+(i+1).toString())[0]
      setBarColor(memoryBar, memoryBar, barRegularColor, memoryColor)

      if(array[j] < pivot) {
        i++
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp

        setArray(array.map(value => value))
        setNumberOfSwaps(prevNumberOfSwaps => prevNumberOfSwaps + 1)
      }

      if(delay !== 0) {
        await timer(delay)
      }

      setBarColor(compareBar, compareBar, barSelectColor, barRegularColor)
      setBarColor(memoryBar, memoryBar, memoryColor, barRegularColor)
    }

    let temp = array[i+1]
    array[i+1] = array[end]
    array[end] = temp

    setBarColor(pivotBar, pivotBar, pivotColor, barRegularColor)

    return i+1
  }

  const quickSortHelper = async(array, start, end) => {
    if(start < end) {
      let pivot = await partition(array, start, end)
      
      await quickSortHelper(array, start, pivot-1)
      await quickSortHelper(array, pivot+1, end)
    } 

    setArray(array)
  }

  const generateArray = () => setArray(Array.from({length: arraySize}, () => Math.floor(Math.random() * 500)))

  return (
    <div className="bg-slate-800 text-white h-screen relative">
      <header>
        <h1 className="text-4xl text-center font-bold">Visualizer Sorting and Search Algorithms</h1>
      </header>
      <main className="flex flex-col items-center">
        <div className="flex flex-row">
          <button className="disabled:bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isSorting ? true : false} id='generateArr' onClick={generateArray}>Generate New Array</button>
          <button className="disabled:bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isSorting ? true : false} onClick={bubbleSort}>Bubble Sort</button>
          <button className="disabled:bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isSorting ? true : false}>Merge Sort</button>
          <button className="disabled:bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isSorting ? true : false} onClick={quickSort}>Quick Sort</button>
          <button className="disabled:bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isSorting ? true : false}>Heap Sort</button>
          <button className="disabled:bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isSorting ? true : false}>Insertion Sort</button>
          <button className="disabled:bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isSorting ? true : false}>Selection Sort</button>
          <button className="disabled:bg-transparent bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isSorting ? true : false} onClick={alexSort}>Alex's sort</button>
          <br/>
          
        </div>
        <div className='mt-6'>
            <input className='accent-blue-500' type="range" id='delayValue' value={delay/1000} min='-0.1' max='10' step='0.1'  onChange={getDelayValue} />
            <label htmlFor="delayValue" className='m-4'>{delay/1000}s</label>
            <input type="text" className='rounded-md bg-inherit border-4 border-blue-500 w-32 hover:bg-blue-700 transition-all duration-300 text-center' id='arraySize' onChange={changeArraySize} value={arraySize}/>
            <label htmlFor="arraySize" className='m-4'>Array Size</label>
          </div>
      </main>

      <div className="flex flex-row justify-center">
        <span className='text-5xl absolute left-1/2 bottom-56 -translate-x-1/2'>Sort Name: {sortName}</span>
        <span className='text-5xl absolute left-1/2 bottom-44 -translate-x-1/2'>Time to Execute: {timeToExecute}</span>
        <span className='text-5xl absolute left-1/2 bottom-32 -translate-x-1/2'>Number of Swaps: {numberOfSwaps}</span>
        <span className='text-5xl absolute left-1/2 bottom-20 -translate-x-1/2'>Number sorted: {numberOfSortedElements}</span>
        <span className='text-5xl absolute left-1/2 bottom-8 -translate-x-1/2'>Sorted Correctly: {isSorted ? "True" : "False"}</span>
      </div>

            
      <div id="chart-border" className='w-screen border-2 border-blue-500 grid grid-flow-col-dense p-4 justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {array.map((value, idx) => (
          <div name={'array'+idx} className=" bg-blue-500 rounded-b text-center text-xl transition-all duration-300" key={idx} style={{height: `${value}px`, width: `${2100/arraySize}px`}}>
            {/* <span className='justify-center'>{value}</span> */}
          </div>
        ))}
      </div>
      <footer className="absolute bottom-0 left-0 right-0 text-center">
        <p className="absolute left-0 right-0 bottom-0 text-md text-gray-500">Created by Alex Rosales</p>
      </footer>
    </div>
  );
}

export default App;
