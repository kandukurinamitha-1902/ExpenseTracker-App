import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpenseTracker from './Component/ExpenseTracker/ExpenseTracker';

const App = () => {
  const ExpenseData = [{id: 1, name: "salary", amount: 25000, isBudget: true },
    {id: 2, name: "Milk Bill", amount: 500, isBudget: false },
    {id: 3, name: "Paper Bill", amount: 100, isBudget: false},
    {id: 4, name: "Gas", amount: 500, isBudget: false},
    {id: 5, name: "Current Bill", amount: 500, isBudget: false }
  ]

  const [trackData, setTrackData] = useState([]);

  useEffect (() => {  
    setTrackData(ExpenseData);  
   },[]);
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<ExpenseTracker  trackData = {trackData} setTrackData = {setTrackData}/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
};
  export default App;

