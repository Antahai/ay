import React from 'react'

const Form = (props) => {

    return(
     <form onSubmit={props.onSubmit}>

<div>
  name: <input 
  value={props.valueNewName} 
  onChange={props.onChangeNote}
  />
</div>

<div>
  tel: <input 
  value={props.valueNewNro} 
  onChange={props.onChangeNro}
  />
</div>

<div>
  <button type="submit">add</button>
</div>

</form>
    )
}

export default Form