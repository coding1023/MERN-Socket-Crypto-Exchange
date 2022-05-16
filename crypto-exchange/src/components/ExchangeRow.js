import '../table.css'


import moment from 'moment';


    const ExchangeRow = ({ exchange }) => {
        let date = moment(exchange.dateTime);
        let dateComponent = date.utc().format('DD-MM-YYYY');
        let timeComponent = date.utc().format('HH:mm:ss');
    
        return (

<><tr >
<td className='cell'>{dateComponent} {' '}{' '} {timeComponent} </td>
      <td className='cell'>{exchange.selectedCoin} </td>
      <td className='cell'>{exchange.amount}</td>
      <td className='cell'>{exchange.currencyType}</td>
      <td className='cell'>{exchange.curAmount}</td>
      <td className='cell'>{exchange.type}</td>

    </tr>

</>

        );
      };


      export default ExchangeRow;