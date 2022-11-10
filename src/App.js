import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  // Random generated array of numbers to sort
  const [array, setArray] = useState(Array.from({length: 10}, () => Math.floor(Math.random() * 100)));
  return (
    <div className="App">
        <div id="chart-visualize" className=''>
          {array.map((value, idx) => (
            <div className="bg-blue-500" key={idx} style={{height: `${value}px`}}>
              {value}
            </div>
          ))}
        </div>
    </div>
  );
}

export default App;
