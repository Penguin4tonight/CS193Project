import { useState } from 'react'
import Papa from "papaparse";
import { differenceInDays} from "date-fns";


import './App.css'
//npm install papaparse
//npm install "date-fns"


function App() {
  //Way to store and alter the cropdata for use in the project
  const [cropdata, setcropdata] = useState<{Crop_type: string; begin_date: string; lifespan: string; Germination: string; Vegetative_Growth: string; Reproductive_Growth: String; Fruit_Development: string; Maturity: string}[]>([]);
  
  //This Function provides the data from the csv file. 
  function grabData() {
    Papa.parse<{Crop_type: string; begin_date: string; lifespan: string; Germination: string; Vegetative_Growth: string; Reproductive_Growth: String; Fruit_Development: string; Maturity: string}>("/Crop.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setcropdata(result.data)
      }
    })
  }

  //This function displays data to the console
  function displayData() {
    console.log(cropdata);
  }
//This tests the ability to add data to the Crop.csv and see if it actually works
  function addData() {
    let crop = {
      Crop_type:"Sweet Potato",
      begin_date:"2026/5/15",
      lifespan:"20",
      Germination: "1",
      Vegetative_Growth: "3",
      Reproductive_Growth: "4",
      Fruit_Development: "7",
      Maturity: "15",
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
    //let l = d.getFullYear() + "/" + d.getDate() + "/" + d.getMonth();
    //console.log(l)
    console.log(d)
    return d
  }

//This function gets all of the remaining lifespans of the crops in cropdata
  function remainingTime() {
    let remainingLife = []
    for (const crop of cropdata) {
      let begin_date = crop["begin_date"]
      let lifespan = Number(crop["lifespan"])
      let bg_date = begin_date.split("/");
      let year = Number(bg_date[0])
      let month = Number(bg_date[1])-1
      let day = Number(bg_date[2])
      let start_date = new Date(year,month,day)
      console.log(start_date)
      let day_difference = differenceInDays(grabDate(),start_date)
      let remaining_life = lifespan - day_difference
      remainingLife.push(remaining_life)
      console.log(remaining_life)
    }
    console.log(remainingLife)
    return remainingLife

  }

  //This function takes the current date and the stages of the crops to find their current stage
  function getStages() {
    let stage = []
    for(const crop of cropdata) {
      let begin_date = crop["begin_date"];
      let lifespan = Number(crop["lifespan"])
      let bg_date = begin_date.split("/")
      let year = Number(bg_date[0])
      let month = Number(bg_date[1])-1 //Do -1 because the Date constructor uses zero indexing: 0-11
      let day = Number(bg_date[2])
      let start_date = new Date(year,month,day)
      let Germination_time = Number(crop["Germination"]);
      let Vegetative_time = Number(crop["Vegetative_Growth"])
      let Fruit_time = Number(crop["Fruit_Development"])
      let Maturity_time = Number(crop["Maturity"])
      let day_difference = differenceInDays(grabDate(), start_date)
      console.log("The following number is for " + crop["Crop_type"])
      console.log(day_difference)
      if(day_difference > lifespan ) {
        stage.push("Expired")
      }
      else if(day_difference > Maturity_time) {
        stage.push("Mature")
      }
      else if(day_difference > Fruit_time) {
        stage.push("Fruiting")
      }
      else if (day_difference > Vegetative_time) {
        stage.push("Vegetative_Growth")
      }
      else if(day_difference > Germination_time) {
        stage.push("Germinating")
      }
      else{
        stage.push("Still a seed")
      }

    }
    console.log(stage)
    return stage
  }

  function handleSubmit(formData: FormData) {
    let crop = {
      Crop_type:String(formData.get("crop_type")),
      begin_date:String(formData.get("begin_date")),
      lifespan:String(formData.get("life_span")),
      Germination: String(formData.get("Germination")),
      Vegetative_Growth: String(formData.get("Vegetative_Growth")),
      Reproductive_Growth: String(formData.get("Reproductive_Growth")),
      Fruit_Development: String(formData.get("Fruit_Development")),
      Maturity: String(formData.get("Maturity")),
    };
    setcropdata([...cropdata, crop])
  }

  /* the return creates the design and main page displayed for the user*/ 
  return (
    <>
    <h1> Agriculture Tracking</h1>
    <button onClick={grabData} type="button">Grab Data</button>
    {/*<button onClick={displayData} type="button"> Display Data</button>*/}
    {/*<button onClick={addData} type="button">Add Data</button>*/}
    <button onClick={saveData} type="button">Save Data</button>
    {/*<button onClick={grabDate} type="button">Grab Current Date</button>*/}
    {/*<button onClick={remainingTime} type="button"> Get Remaining Time </button>*/}
    {/*<button onClick={getStages} type="button">Get Stages</button>*/}
    <form action={handleSubmit}>
      <input placeholder="Crop_type_here" name="crop_type"></input>
      <input placeholder="Begin_date_here" name="begin_date"></input>
      <input placeholder="Life_span_here" name="life_span"></input>
      <input placeholder="Germination_span_here" name="Germination"></input>
      <input placeholder="Vegetative_Growth_here" name="Vegetative_Growth"></input>
      <input placeholder="Reproductive_Growth_here" name="Reproductive_Growth"></input>
      <input placeholder="Fruit_Development_here" name="Fruit_Development"></input>
      <input placeholder="Maturity_here" name="Maturity"></input>
      <button className="submitbutton"> Add Data</button>
    </form>
    <table>
      <thead>
        <tr>
          <td>Crop Type</td>
          <td>Date of Planting</td>
          <td>Time to Expire</td>
          <td>Current Stage</td>
          <td>Remaining Time</td>
        </tr>
      </thead>
      <tbody>
        {cropdata.map((crop, index) => (
          <tr key = {crop.Crop_type}>
            <td>{crop.Crop_type}</td>
            <td>{crop.begin_date}</td>
            <td>{crop.lifespan}</td>
            <td>{getStages()[index]}</td>
            <td>{remainingTime()[index]}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default App
