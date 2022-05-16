import '../table.css'


import moment from 'moment';


const ApiRatesRow = ({ apiExchange }) => {
        
   
    let date = moment(apiExchange.dateTime);
    let dateComponent = date.utc().format('DD-MM-YYYY');
    let timeComponent = date.utc().format('HH:mm:ss');


    return (

<>

 <tr>

      <td className='cell'>   
    
    {dateComponent} {' '}{' '} {timeComponent} </td>
      <td className='cell'>{apiExchange.selectedCoin}</td>
      <td className='cell'>{apiExchange.amount}</td>
      <td className='cell'>{apiExchange.currencyType}</td>
      <td className='cell'>{apiExchange.curAmount}</td>
      <td className='cell'>{apiExchange.type}</td>
    </tr>
    
        
    
</>

    );
  };


  export default ApiRatesRow;