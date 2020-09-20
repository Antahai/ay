import React from 'react'

const Note = (props) => {
    return (
      <div key={props.id}><strong>{props.name}</strong>, tel: {props.tel}</div>
    )
  }

const Book = (props) => {
const personsToShow = props.person
    return(
        <div>
            {personsToShow.map(person => 
            <Note key={person.id} name={person.name} tel={person.tel} />
            )}
      </div>
    )
}

export default Book