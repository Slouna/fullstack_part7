import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onReset = () => {
    setValue("")
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}


// modules can have several named exports

export const useAnecdotes =  () => {
    const [anecdotes, setAnecdotes] = useState([])

    useEffect(()=> {
         anecdoteService.getAll().then(data => setAnecdotes(data))
      }, [])

      const addAnecdote = async (anecdote) => {
        const returnedAnecdote = await anecdoteService.createNew(anecdote)
        setAnecdotes(anecdotes.concat(returnedAnecdote))
      }

      const deleteAnecdote = async (id) => {
        await anecdoteService.deleteAnecdote(id)
        setAnecdotes(anecdotes.filter(a => a.id !== id))
      }

      return({anecdotes, addAnecdote, deleteAnecdote})
}