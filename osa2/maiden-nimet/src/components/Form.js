import React from 'react'

function Form(props) {
    return(
         <form>
        Find country<br/> 
          <input 
          value= {props.value}
          onChange={props.onChange}
          /> 
        </form>
  
    )
  }

  export default Form