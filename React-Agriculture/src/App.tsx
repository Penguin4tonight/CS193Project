import { useState } from 'react'
import { useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Papa from "papaparse";


import './App.css'
//npm install papaparse


function App() {
  //Way to store and alter the cropdata for use in the project
  const [cropdata, setcropdata] = useState<{ctype: string; begin_date: string; lifespan: string; last_date: string}[]>([]);


  //This Function provides the data from the csv file. 
  function grabData() {
    Papa.parse<{ctype: string; begin_date: string; lifespan: string; last_date: string}>("/Crop.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setcropdata(result.data)
      }
    })
  }

  //This function displays data
  function displayData() {
    console.log(cropdata);
  }
//This function adds the data to the current cropdata
  function addData() {
    let crop = {
      ctype:"pumpkin",
      begin_date:"2026/5/15",
      lifespan:"20",
      last_date:"2026/10/20",
    };
    setcropdata([...cropdata, crop])
  }
//This function provides the csv as a download
  function saveData(){
    const newdata = Papa.unparse(cropdata)
    const b = new Blob([newdata], {type: "text/csv;charset=utg-8"});
    const u = URL.createObjectURL(b);
    const a = document.createElement("a");
    a.href = u
    a.download = "Crop.csv"
    a.click()
  }
//This function grabs the current date
  function grabDate() {
    const d = new Date();
    let l = d.getFullYear() + "/" + d.getDate() + "/" + d.getMonth();
    console.log(l)
    return l
  }

  /* the return creates the design and main page displayed for the user*/ 
  return (
    <>
    <h1> Agriculture Tracking</h1>
    <button onClick={grabData} type="button">Grab Data</button>
    <button onClick={displayData} type="button"> Display Data</button>
    <button onClick={addData} type="button">Add Data</button>
    <button onClick={saveData} type="button">Save Data</button>
    <button onClick={grabDate} type="button">Grab Current Date</button>
    <table>
      <tr>
        <td>Crop Type</td>
        <td>Date of Planting</td>
        <td>Time to Expire</td>
        <td>Date of Expiration</td>
      </tr>
    </table>
    </>
  )
}

export default App
