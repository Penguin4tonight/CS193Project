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
  const [cropdata, setcropdata] = useState<{name: string; begin_date: string; lifespan: string; last_date: string}[]>();


  //This Function provides the data from the csv file. 
  function grabData() {
    Papa.parse<{name: string; begin_date: string; lifespan: string; last_date: string}>("/Crop.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setcropdata(result.data)
      }
    })
  }

  return (
    <>
    <h1> Agriculture Tracking</h1>
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
