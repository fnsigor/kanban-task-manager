import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { AuthContext } from '../../context/AuthContext'

function Register() {


	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const { createUser, error: authError, loading } = useAuthentication()

	const handleSubmit = async (e) => {

		e.preventDefault()

		setError('')

		const user = {
			username,
			email,
			password
		}


		if (password !== confirmPassword) {
			setError('As senhas precisam ser iguais!')
			return;
		}

		const response = await createUser(user)

		console.log(response)

	}

	const { user } = useContext(AuthContext)
	const navigate = useNavigate();


	useEffect(() => {
		if (user) {
			navigate("/home");
		}
	}, [user])

	useEffect(() => {
		if (authError) {
			setError(authError)
		}
	}, [authError])



	return (
		<div className="registerLoginForm">
			<h2> cadastre-se</h2>

			<form onSubmit={handleSubmit}>

				<label htmlFor="username">
					<span>Nome: </span>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						name="username"
						id='username'
						required
						placeholder="Nome do usuário" />
				</label>

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

				<label htmlFor="ConfirmPassword">
					<span>Confirmação de senha: </span>
					<input
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						name="ConfirmPassword"
						id='ConfirmPassword'
						required
						placeholder="Confirme sua senha" />
				</label>

				{!loading && <button className="btn purpleButton">Cadastrar</button>}

				{loading && <button className="btn" disabled>Aguarde...</button>}

				{error && <p className="error">{error}</p>}



			</form>

		</div >
	)
}

export default Register