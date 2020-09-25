import React from 'react'

function ShowListOfCountries(props){
      

    return(
      (props.showCountry.length < 11 && props.showCountry.length > 1 ) &&
        props.showCountry.map(country => 
        <div key = {country.name}>
          <h3 >{country.name} 
            <form onSubmit={props.onSubmit} style={{display: "inline"}}>
              <button 
                type = "button" 
                onClick={props.onClick} 
                value={country.name}>
                  Show
              </button>
            </form> 
          </h3>
        </div>
      )
    )
  }

  export default ShowListOfCountries