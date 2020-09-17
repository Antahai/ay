import React from 'react'

function Course  ({courses}) {

    const totalCourses = courses.map((course) => {
    return course.parts.reduce((acc,nro) => { return  nro.exercises + acc },0) 
    })
    
    const total = totalCourses.reduce((acc,nro) => {return nro + acc })
    
    console.log('total: ', total)
    return (
      <div>
        <ul>
          {courses.map((course) => {
            return (
    
              <div key = {course.id}> 
                <h2>{course.name}</h2>
                {course.parts.map((part) => { 
                  return (
                    <p key={course.id + "." + part.id}> {part.name} {part.exercises}</p>
                    )})}
               </div>
            )}
          )}
        </ul>
      <p><strong>Total of {total} exercises</strong></p>
    
      </div>
    
    )
    }

    export default Course