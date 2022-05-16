

//style imports
import "./App.css";

import "./table.css"
import "./footer.css"
import React, {useState, useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';
//components
import Toolbar from "./components/Toolbar";
import DataTable from "./components/DataTable";
import Exchange from './components/Exchange'
import Feedback from "./components/Feedback";
import Pagination from "./components/Pagination";
// import io from 'socket.io-client'; 
import socketClient from 'socket.io-client';


function App() {

  //live rate 
  const [ liveRate, setLiveRate] = useState([]);

  //crypto
  const [selectedCoin, setSelectedCoin] = useState([]);

//data from api
  const [apiData, setApiData]= useState([])
//exchanges from user 
  const [dbData, setDbData]= useState([])
  


//get date
const[dateAndTime, setDateAndTime]= useState(0)

const dateTime=dateAndTime;
  //data from form includes inputs values, current date, type of transaction
  const [formData, setFormData] = useState({
    amount : "",
   
    type: ""   
})
//variables initialized in order to store data from toolbar used by user
const {amount,type} = formData

const[curAmount, setCurAmount]= useState(0)
const [currencyType, setCurrencyType] = useState([]);


const {currencyAmount}= curAmount;
const {currency} = currencyType;


  
 //live rate coin
 const [chosenLiveRateCoin , setChosenLiveRateCoin]= useState('bitcoin')

 //display feedback
 const [clickedSave, setClickedSave] = useState(false)
 
 

//url - crypto name param
const url= `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoin}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false`

//socket conn
const socket = socketClient("http://localhost:5000");


//get data from url -- set live rate
useEffect(()=> {
  if(selectedCoin){
    axios.get(url).then((response)=> {
      let rawData= response.data;
       Object.keys(rawData).map(key => {
           
        return  setLiveRate(Number(rawData[key].usd))
      
          })

    }).catch((error =>{
      console.log(error)
    })
    
    )
  

  }
 

},[selectedCoin])


//data from user exchanges
  useEffect(()=> {
    socket.on('exchangesData', data=> {
     return setDbData(data)
      
    })
  
    return () => {
      socket.off("exchangesData");

      }
   }, [])
  
//socket function on conn

  
  // get api data
  setTimeout(() => {

    const urlLive= `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${chosenLiveRateCoin}&order=market_cap_desc&per_page=2&page=1&sparkline=false
    `
    
    axios.get(urlLive).then((response)=> {
      let rawData= response.data;
       Object.keys(rawData).map(key => {
        socket.emit('apiRequest', {
            dateTime : new Date(),
            selectedCoin : rawData[key].name,
             amount: 1,
              currencyType: 'USD',
             curAmount: rawData[key].current_price,
               type   : "Live Price"
  
           })
           return setApiData(
              {dateTime : new Date(),
              selectedCoin : rawData[key].name,
               amount: 1,
                currencyType: 'USD',
               curAmount: rawData[key].current_price,
               type  : "Live Price"}
           
    )
      
            
          })
//on api req
          socket.on('apiRequest', data=> {
            
            return setApiData(data)
            
           })
           //chanfe id bitcoin to eth
           function changeCoin(){
            if(chosenLiveRateCoin === 'bitcoin' ){
              setChosenLiveRateCoin('ethereum') 
             }else{
          
            setChosenLiveRateCoin('bitcoin')
       
        
          } 
            
 
           }
           changeCoin()
           console.log(chosenLiveRateCoin)
         
           return () => {
            socket.off("apiRequest");
      
            }
    })
    
    
   
  }, 12000)
  




  return (


    
    <>
        


  <Routes>
  <Route path="/" element={<><Exchange dateTime={dateTime} setClickedSave={setClickedSave}
   currencyType={currencyType} setDateAndTime={setDateAndTime}
  setCurrencyType={setCurrencyType}
  setCurAmount={setCurAmount} setFormData={setFormData} amount={amount} 
  currency={currency} curAmount={curAmount}
   liveRate={liveRate} setSelectedCoin={setSelectedCoin}
   date
    selectedCoin={selectedCoin} /><DataTable apiData={apiData} dbData={dbData}  />
    <Pagination />
    { clickedSave ? <Feedback/> : null }</>} 
    
    
    />

      </Routes>
      
      

    </>
  );
}

export default App;
