import '../table.css'

import React from 'react'



import ApiRatesRow from './ApiRatesRow';
import ExchangeRow from './ExchangeRow';




const DataTable = ({apiData, dbData}) => {





  //show exchange details
  const liveApiRates = apiData
    ? Object.keys(apiData).map(key=>{
        return <ApiRatesRow apiExchange={apiData} key={key} />;
      })
    : 'noResults';



  //show api live rates details
  const usersExchanges = dbData
    ? dbData.map((obj, i) => {
        return <ExchangeRow exchange={obj} key={i} />;
      })
    : 'noResults';

    return(
        <>   
        <div className='mt-5'>
<header className='header-history'>History</header>
     
     <div className=" table-wrapper" >


<table>
  
  <thead>
    <tr>
      <th className='column-1'><i><img className="sort-icon" 
     src={`${process.env.PUBLIC_URL}/assets/images/sort-icon.png`} 
     alt="logo"/>
     </i> Date & Time </th>
      <th className='column-2'>Currency From</th>
      <th className='column-3'>Amount 1</th>
      <th className='column-4'>Currency To</th>
      <th className='column-5'>Amount 2</th>
          <th>Type</th>
    </tr>
  </thead>
 
 
 <tbody>
{liveApiRates && (
  
  <>
    {liveApiRates}</>


      )}

{usersExchanges && (
  <>
    {usersExchanges}

  </>

      )}
</tbody>
</table>
    
</div>   
</div>
</>
    )
}

export default DataTable;
