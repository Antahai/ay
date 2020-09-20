import React from 'react'

const Filter = (props) => {

    return(
     <form>
      Filter shown with name:<br/> 
        <input 
        value= {props.value}
        onChange={props.onChange}
        /> 
      </form>
    )
}

export default Filter