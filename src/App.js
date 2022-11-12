import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [array, setArray] = useState(Array.from({length: 10}, () => Math.floor(Math.random() * 100)));
  const [delay, setDelay] = useState(1000)

  const barSelectColor = 'bg-blue-800'
  const barRegularColor = 'bg-blue-500'

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
    let elem1Id = elem1.getAttribute('name')
    let elem2Id = elem2.getAttribute('name')

    // console.log(elem1Id)
    // console.log(elem2Id)

    elem1.style.transform = `translate(${Math.abs(distance)}px)`
    elem2.style.transform = `translate(-40px)`
    elem1.setAttribute('name', elem2Id)
    elem2.setAttribute('name', elem1Id)

    // console.log(elem1.id)
    // console.log(elem2.id)

  }

  const bubbleSort = async() => {
    let copyArray = array

    for(let i = 0; i < copyArray.length; i++) {
      let maxIdx = 0;

      for(let j = 1; j < copyArray.length; j++){

        // let chart = document.get

        let maxBar = document.getElementsByName('array'+maxIdx.toString())[0]
        let compareBar = document.getElementsByName('array'+j.toString())[0]

        console.log(maxBar)
        console.log(compareBar)
        
        let distance = maxBar.offsetLeft - compareBar.offsetLeft

        setBarColor(maxBar, compareBar, barRegularColor, barSelectColor)

        if(copyArray[maxIdx] > copyArray[j]){
          console.log({
            maxBarIdx: maxIdx,
            maxBarVal: copyArray[maxIdx],
            compareBarIdx: j,  
            compareBarVal: copyArray[j],
            array: copyArray
          })
          let temp = copyArray[maxIdx]

          copyArray[maxIdx] = copyArray[j]
          copyArray[j] = temp

          animateMove(maxBar, compareBar, distance)

          // setArray( copyArray.map(value => value))
          
        } 
        maxIdx = j

        await timer(delay)
        
        setBarColor(maxBar, compareBar, barSelectColor, barRegularColor)
      }
    }
    
    setArray(copyArray)
  }

  const getDelayValue = async(e) => {
      console.log(e.target.value)
      setDelay(e.target.value*1000)
  }

  return (
    <div className="bg-slate-800 text-white h-screen relative">
      <header>
        <h1 className="text-4xl text-center font-bold">Visualizer Sorting and Search Algorithms</h1>
      </header>
      <main className="flex flex-col items-center">
        <div className="flex flex-row">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => setArray(Array.from({length: 10}, () => Math.floor(Math.random() * 100)))}>Generate New Array</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={bubbleSort}>Bubble Sort</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Merge Sort</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Quick Sort</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Heap Sort</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Insertion Sort</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Selection Sort</button>
          <br/>
          <div>
            <input className='accent-blue-500' type="range" id='delayValue' value={delay/1000} min='0' max='10' step='0.1'  onChange={getDelayValue} />
            <label htmlFor="delayValue" className='m-4'>{delay/1000}s</label>
          </div>
        </div>
      </main>
            
      <div id="chart-border" className='border-2 border-blue-500 grid grid-flow-col-dense space-x-4 p-4 justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {array.map((value, idx) => (
          <div name={'array'+idx} className="bg-blue-500 rounded-b w-6 text-center text-xl transition-all duration-300" key={idx} style={{height: `${value}px`}}>
            <span className='justify-center'>{value}</span>
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
