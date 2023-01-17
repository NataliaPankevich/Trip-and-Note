import './App.css';
import React from 'react';
import {
  useState,
  useEffect,  
} from "react";
import { RoutingBlock} from './routing/RoutingBlock';
import { Context } from "./components/context/Context";
import { Context1} from "./components/context/Context";
import { Context2 } from "./components/context/Context";
import { Context3 } from "./components/context/Context";



function App() {

  const [user, setUser] = useState({
    name: "",  
    email: "",
    residence: "",  
    password: "",  
    trips:[],
  });

  const [tripIndex, setTripIndex] = useState(()=>{
    let saved = localStorage.getItem("tripIndex");
    return  saved || ""
  });
  const [noteIndex, setNoteIndex] = useState(()=>{
    let saved = localStorage.getItem("noteIndex");
    return  saved || ""
  });

  const [pageTitle, setPageTitle] = useState("My trips")

  return (
    <div className="App">
      
      <Context.Provider   value={[user, setUser]} >
        <Context1.Provider   value={[tripIndex, setTripIndex]} >
          <Context2.Provider   value={[noteIndex, setNoteIndex]} >
            <Context3.Provider   value={[pageTitle, setPageTitle]} >
        
       <RoutingBlock/>  

            </Context3.Provider> 
          </Context2.Provider>   
        </Context1.Provider> 
      </Context.Provider>
        
      
    </div>
  );
}

export default App;
