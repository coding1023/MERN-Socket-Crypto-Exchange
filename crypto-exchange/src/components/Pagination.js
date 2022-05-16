
import React from 'react'
function Pagination() {
    
  return (
    
    <div className="pagination">
        <ul>
            
      <li className="active">1</li>
      <li>2</li>
      <li>3</li>
      <li>...</li>
      <li>15</li>
      <li> Next </li>
      <li id='arrow' className='arrow-icon'> 
      <img src={`${process.env.PUBLIC_URL}/assets/images/next-arrow.PNG`} 
      alt='arrow-icon'>

      </img> </li>
        </ul>
     
    </div>

   
  )
}

export default Pagination
