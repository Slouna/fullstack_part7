import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { TextField, Button } from '@mui/material'

const LoginForm =  (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(username)

      blogService.setToken(user.token)
      props.setUser(user)
      props.setSuccess(true)
      props.setMessage(`${user.name} logged in`)
      setTimeout(() => {props.setMessage(null)}, 5000)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      props.setSuccess(false)
      props.setMessage('Wrong username or password')
      setTimeout(() => {props.setMessage(null)}, 5000)

    }
  }


  return(
    <div>
      <h2>Login page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label= "Username"
            value={props.username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label= "Password"
            type='password'
            value={props.password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" variant='contained' style={{ marginTop: 10 }}>login</Button>
      </form>
    </div>
  )

}

export default LoginForm