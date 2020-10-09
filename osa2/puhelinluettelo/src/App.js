import { render } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/filter'
import Form from './components/form'
import Notification from './components/notification'
import phonebookService from './services/personsData'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNro, setNewNro ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ deleteId, setDeleteId ] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  

  
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  console.log(persons.length)
  
// --------NEW BOOKING -------------------------//
  const addNewName = (event) => {
    event.preventDefault()

  const names = persons.map(person => {
    return person.name
  })
   const isAlready = names.includes(newName)
   // if name already exists, will ask to change number
   if (isAlready) { 
    if(window.confirm(`Name ${newName} already exists, do you want to update the number?`)){
      const idToUpdate = persons.find(x=> x.name === newName)
      
      const phoneBookObject = {
        name: newName,
        number: newNro,
        id: idToUpdate.id
        
      } 
      const personIdToUpdate = persons.find(x=> x.name === newName).id

      // UPDATE NUMBER
      phonebookService
      .update(personIdToUpdate, phoneBookObject)
      .then(()=>{
      const personsIndex = persons.findIndex((obj => obj.id === personIdToUpdate))
      const personsToChange = persons
      personsToChange[personsIndex].number = newNro
      setPersons(personsToChange)
    })
    .then(setAlertMessage(newName + '´s number is now updated!'))
      
    } 
    // if name is new -> 
   } else if(newName === ''){setErrorMessage('Name is missing')
   } else if(newNro === ''){setErrorMessage('Number is missing')
   
   } else {

    const phoneBookObject = {
      name: newName,
      number: newNro,
    }

    phonebookService
      .create(phoneBookObject)
      .then(returnedData => {
        setPersons(persons.concat(returnedData))
      }
      ).then(setAlertMessage(newName + ' is now added to phone Bookkel'))
      .catch(error => {
        setErrorMessage(error.response.data.error)
      })
      
   }
   // reset states
   setNewName('')
   setNewNro('')
   setTimeout(() => { setErrorMessage(null)}, 4000)
   setTimeout(() => { setAlertMessage(null)}, 4000)
  }
  // --------DELETE BOOKING -------------------------//
  const handleDelete = (event) => {
    event.preventDefault()
    const personToKill = persons.find(x=> x.id === deleteId).name

    if(window.confirm('Kill ' + personToKill + '?')){
      
       phonebookService
       .deleteData(deleteId).then(returnedBooking => {
        setPersons(persons.map(booking => booking.id !== personToKill ? booking : returnedBooking))
       })
       .then
          (()=>{
            setAlertMessage( personToKill + ' is removed from phoneboo succesfully!')
             setTimeout(()=> {
             setAlertMessage(null)
             },4000)}
         )
       .then(()=>{setPersons(persons.filter (n=> n.id !== deleteId))})
       .catch(error => {
         setErrorMessage(personToKill + ' is already removed from phonebook')
         setTimeout(()=> {
           setErrorMessage(null)
         },4000)
         })
       }
 

 
      // const personsAfterDie = persons.filter(person => {
        //return person.id !== deleteId
        
    }
      // setPersons(personsAfterDie)
  
  
  const Note = (props) => {
      return (
        <div key={props.id}>
          <form onSubmit = {handleDelete}>
          <strong>
            {props.name}
          </strong>
          , tel: {props.tel}
          <input type = 'hidden' name = 'id' value = {props.id}/>
           <button
           onMouseOver = {()=> setDeleteId(props.id)}
            type = 'submit'
           >Delete</button>
          </form>
        </div>
      )
    }
  
  const Book = (props) => {
  const personsToShow = props.person
      return(
          <div>
              {personsToShow.map(person => 
              <Note key={person.id} name={person.name} tel={person.number }id = {person.id} />
              )}
        </div>
      )
  }

  const handleFilterChange = (eventFilter) => {
    setFilter(eventFilter.target.value)
    // console.log(eventFilter.target.value)
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNroChange = (eventNro) => { 
    setNewNro(eventNro.target.value)
  }
  const personsToShow = filter
  ? persons.filter (persons => persons.name.toLowerCase().includes(filter.toLowerCase())) 
  : persons


  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} type="greenAlert"/>
      <Notification message={errorMessage} type="redAlert"/>
      <Filter value = {filter} onChange={handleFilterChange} />
      <h2>Add a new name</h2>
      <Form 
        onSubmit={addNewName}
        valueNewName={newName} 
        onChangeNote={handleNoteChange}
        valueNewNro={newNro}
        onChangeNro={handleNroChange}
      />
      <h2>Numbers</h2>
      <Book person={personsToShow} />
      <p>{persons.length === 0 && '...loading'}</p>
    </div>
  )

}

export default App