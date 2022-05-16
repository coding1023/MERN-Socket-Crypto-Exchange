
//style
import '../table.css'

import axios from 'axios'
import {useState, useEffect} from 'react'


function Exchange({setClickedSave, dateTime,selectedCoin, setDateAndTime,setCurrencyType,setCurAmount,setFormData,amount,currency,curAmount, liveRate, setSelectedCoin}) {



  

 function clearState(){
  setClickedSave(false)
}



//coin setCoin used for select crypto 
//currencyType used for currency - usd
const [coin, setCoin] = useState("");

//store values 
const {coinName} = coin;


//on submit function 
const onSubmit= (e) => {
setClickedSave(true)
setTimeout(() => {
  clearState();
}, 2000);
//get date
  let current = Date();

    e.preventDefault()
    // let correctDateTime=`Date: ${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}/ Time: ${ current.toLocaleTimeString()}`
    setDateAndTime(current);

    const exchange = {
      dateTime: dateTime,
      selectedCoin:selectedCoin,
        amount:amount,
        currencyType: 'USD',
        curAmount: curAmount,
        type   : "Exchanged"
  }

    axios.post('http://localhost:5000/exchange', exchange)
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        console.log(exchange)

      }
      console.log(exchange)

    });
        
      


}


//change icon 
const ethereumIcon = require(`../images/ethereum.PNG`)
const bitcoinIcon  = require( `../images/bitcoin.png`)
const icons = { ethereumIcon, bitcoinIcon }



const [selected, setSelected] = useState(icons.bitcoinIcon)

const ChangeIcons = (selectedIcon) =>{

  if(selectedIcon=== 'Bitcoin') {
  setSelected(icons.bitcoinIcon)


} else if(selectedIcon=== 'Ethereum') {
  setSelected(icons.ethereumIcon)


}
else {

  setSelected('')
}


}



//setting form data passing as arg previous state, 
// key= e.target.name    value = e.target.value 

//function that sets coin type eg: bitcoin when when user will select option
const onSelect= (e)=>{
  ChangeIcons(e.target.value)
  setSelectedCoin(e.target.value)





}


//function that sets currency type eg: usd or eur when when user will select option
const onSelectCurrency= (e)=>{
  setCurrencyType(JSON.stringify( e.target.value))
  
}




//function will set exchange amount (usd amount multiplied live rate retrieved from api to get correct exchange rate)
const onChange= (e) => {
  setCurAmount(e.target.value * liveRate)

  //get form data and 
    setFormData((previousState) => ({
        ...previousState, 
        [e.target.name]: e.target.value,
       
    }))


            }

            
            

    return(
       <>
      <div className="wrapper ">
    
    
<header className="exchange-header" >Exchange</header>
<form  >
<div className="drop-list ">
<div className="from flex-div">
  <p className="form-titles">Currency from</p>
  <div className="select-box ">
    <img id='coin-icon'
      src={selected} 
      alt="coin"
    />
    
    <select  
   required   onChange={onSelect}
       
     id='coinName' name='coinName' value={coinName} className="select-vector">

    <option id='bitcoin' value={'Bitcoin'} name='Bitcoin'>Bitcoin </option>
    <option id='ethereum' value={'Ethereum'} name='Ethereum'>Ethereum </option>

    </select>
  </div>
</div>
<div className="amount-crypto-div flex-div" >
  <p className="form-titles"> Amount</p>
  <input required type="number" value={amount} id='amount' name='amount' onChange={onChange} />

</div>
<div className="equal flex-div">
  <p>=</p>
</div>

<div className="to flex-div">
  <p className="form-titles">Currency to</p>
  <div className="select-box to-box flex-div">
    <img
      src="https://cdn-icons-png.flaticon.com/512/3909/3909383.png"
      alt="flag"
    />

        <select   required 
      onChange={onSelectCurrency}
       
     id='currency' name='currency' value={currency} className="select-vector ">

    <option value='USD' name='USD'>USD </option>

    </select>

  </div>
</div>
<div className="amount-fiat-div flex-div">
  <p className="form-titles"> Amount</p>
  <input readOnly  onChange={onChange} type="text" value={curAmount}id='currencyAmount' name='currencyAmount' />
</div>

<div className="save-button-div flex-div">
  <button onClick={onSubmit} className="form-button">Save </button>
</div>
</div>
</form>
</div>

       </>
    )
}

export default Exchange;