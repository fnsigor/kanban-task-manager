import React, { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const { login, error: authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')

    const user = {
      email,
      password
    }


    const response = await login(user)

    console.log(response)

  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  const { user } = useAuthValue()
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user])

  return (

    <div className="registerLoginForm" >

    
        <h2>Entrar</h2>
    

      <form onSubmit={handleSubmit}>

        <label htmlFor="email">
          <span>E-mail: </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id='email'
            required
            placeholder="E-mail do usuário" />
        </label>

        <label htmlFor="password">
          <span>Senha: </span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id='password'
            required
            placeholder="Insira sua usuário" />
        </label>



        {!loading && <button className="btn purpleButton">Entrar</button>}

        {loading && <button className="btn" disabled>Aguarde...</button>}

        {error && <p className="error">{error}</p>}

      </form>
    </div>
  )
}

export default Login