import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  console.log("hooks index type", type)
  
  const onChange = (event) => {
  	console.log("hooks index onChange1", event.target)
  	console.log("hooks index onChange2", event.target.value)
    setValue(event.target.value)
  }
  //const onClick = (event) => {
  const reset = () => {
  	console.log("hooks index onClick1")
  	setValue('')
    //setValue(event.target.value)
  }
  //const undo = () => {
    //dispatch({ type: 'undo' })
   // type: 'reset'
  //}

  return {
    field: {type,
    value,
    onChange },
    reset: reset
   // undo
    //reset
  }
  //const onClick = (event) => {
  //	console.log("hooks index onclick", event.target.value)
  //  setValue(event.target.value)
  //}

  //return {
  //  type,
  //  value,
  //  onClick
  //}
}

export default useField;