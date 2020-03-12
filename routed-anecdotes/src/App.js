import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import  { useField } from './hooks/index'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect, useRouteMatch, useParams
} from "react-router-dom"

const Menu = (props) => {
  console.log("Menu ", props)
  const padding = {
    paddingRight: 5
  }
  const anecdote = props.anecdoteById()
    console.log("menu anecdote ", anecdote)
  return (
    <Router>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create</Link> 
        <Link style={padding} to="/about">about</Link>
      </div>
      <div> 
        <Notification notification={props.notification} />
      </div>

      <Switch>
        <Route path="/anecdotes/:id">
           <Anecdote anecdotes={props.anecdotes} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={props.addNew} setNotification={props.setNotification}
           contentA={props.contentA} authorA={props.authorA} infoA={props.infoA}
           resetA={props.resetA} /> 
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={props.anecdotes} />
        </Route>
      </Switch>
    </Router>
  )
}

const Anecdote = ({ anecdotes }) => {  
  //console.log("Anecdote 1 ", anecdotes)
  const id = useParams().id
  //console.log("Anecdote 2 ", id)
  const anecdote = anecdotes.find(n => n.id === id)
  
  if (anecdote)
     //console.log("Anecdote 3 ", anecdote)  
  return (
    <div>
       <h2>{anecdote.content}</h2>
       <div><em><b>author</b></em> {anecdote.author}</div>
       <div><em><b>more info</b></em> {anecdote.info}</div>
       <div><em><b>votes</b></em> {anecdote.votes}</div>
    </div>
  )
}

const AnecdoteList = ({anecdotes}) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    border: '30px solid green'
  }
  return (
    <div style={style}> 
        <p>{notification}</p>
       <Redirect to="/" ></Redirect>
    </div>
    
  )
}

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  
  //const contentA = props.contentA
  //const authorA = props.authorA
  //const infoA = props.infoA
  //const resetA = props.resetA
  //const contentA = useField('text')
  //const authorA = useField('text')
  //const infoA = useField('text')
  //const resetA = useField('button')
  //if(contentA.value) console.log("createNew content ", contentA.value)
  //if(authorA.value) console.log("createNew author ", authorA.value)
  //if(infoA.value) console.log("createNew info ", infoA.value)
  //if(resetA.value) console.log("createNew reset ", resetA.value)
  //const author = useField('text')
  //const info = useField('text')
  //const resetA = (e) =>{
    //form.reset()
  //  console.log("reset ")
    //useField('')
    // return(
    //<Redirect to="/create" ></Redirect>
    //)
  //}
  //const onClick = () => {

  const contentA = useField('text')
  const authorA = useField('text')
  const infoA = useField('text')
    
  

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("createNew handleSubmit e ", e.target.text)
    
    //}
    
   // console.log("createNew content ", contentA.field.value)
    //if(contentA.value){
      props.addNew({
        content: contentA.field.value,
        author: authorA.field.value,
        info: infoA.field.value,
        votes: 0
      })
      props.setNotification(`Anecdote: ${contentA.field.value} added`)
      resetA()
      setTimeout(() => props.setNotification(''), 10000) // 10 sec
    }

    const resetA = () => {
    console.log("createNew click resetA")
    //props.contentA.reset()
    //props.authorA.reset()
    //props.infoA.reset()
    contentA.reset()
    authorA.reset()
    infoA.reset()


    //App()
   
     //contentA.reset
  }
    //}
    //<input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
    //<input type={content.type}
    //             value={content.value}
    //             onChange={content.onChange}
    ///>
  //}
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentA.field}
          />
        </div>
        <div>
          author
          <input {...authorA.field} />
        </div>
        <div>
          url for more info
          <input {...infoA.field} />
        </div>
        <button>create</button>
        <input type="button" onClick={() => resetA()} value="reset" />
                
      </form>
    </div>
  )
}
//<input {...props.resetA} onClick={() => resetA()} value="reset" />
//<input {...props.resetA} onClick={() => resetA()} value="reset" />
//<input type="button" value="reset" onClick={() => click()} />
//<input type="button" value="reset" onClick={() => click()} />
//<input type="button" {...resetA} value="reset"/>
// <button type="button" onClick={() => resetA({...reset})}>resetA</button>
//<input type="submit" value="Submit" />
//<button type="button" onClick={() => reset(defaultValues)}>reset</button>
/*
 return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentA}
          />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
*/
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const [anecdo, setAnecdo] = useState('')

  //const contentA = useField('text')
  //const authorA = useField('text')
  //const infoA = useField('text')
  //const resetA = useField('button')
  
  
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  //contentA={contentA}
  //    authorA={authorA}
  //    infoA={infoA}
  //    resetA={resetA}
  //resetA={resetA}
  //contentA={contentA}
  //    authorA={authorA}
  //    infoA={infoA}
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu anecdotes={anecdotes} addNew={addNew} anecdoteById={anecdoteById} anecdo={anecdo} setAnecdo={setAnecdo} 
      notification={notification} setNotification={setNotification}
      />
      <Footer />
    </div>
  )
}

export default App;