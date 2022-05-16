import "../toolbar.css";

import React from "react";
//link will replace anchor tags


//component
const Toolbar = ({ setSearchText }) => {
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };



  //display toolbar
return (
<div className="wrapper ">
<header className="exchange-header" >Exchange</header>

<form action="#">
<div className="drop-list ">
<div className="from flex-div">
  <p className="form-titles">Currency from</p>
  <div className="select-box ">
    <img
      src={`${process.env.PUBLIC_URL}/assets/images/bitcoin.png`} 
      alt="flag"
    />
    
    <select className="select-vector">
    <option>Bitcoin </option>{" "} 
    </select>
  </div>
</div>
<div className="amount-crypto-div flex-div" >
  <p className="form-titles"> Amount</p>
  <input type="text" value="1" />
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
        <select className="select-vector">

      {" "}
      <option>USD</option>{" "}
    </select>
   
  </div>
</div>
<div className="amount-fiat-div flex-div">
  <p className="form-titles"> Amount</p>
  <input type="text" value="$48.300,00" />
</div>

<div className="save-button-div flex-div">
  <button className="form-button">Save </button>
</div>
</div>
</form>
</div>
);
};

export default Toolbar;
