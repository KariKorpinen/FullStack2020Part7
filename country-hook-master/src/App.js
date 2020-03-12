import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  
  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  console.log("useCountry ", name)
  const [country, setCountry] = useState(null)
  //const [country, setCountry] = useState({found: true})
  //setCountry({ found: true})
  //if (name==="") {
  //   return "empty"
  //}
    console.log("useCountry2 ",`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    const address = `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
    useEffect(() => {
      const fetchData = async (name) => {
        try{
          const result = await axios.get(address)
          console.log("useCountry3 ", result.status)
          console.log("useCountry4 ", result)
          //if(result.status===200){
          setCountry({data: result.data[0], found: true})
        }
        catch(e) {
          setCountry({found: false})
        }   
      }
      fetchData(name)
    //},[name, country]
    },[name]
  )
//}
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App