import React, { useState } from 'react'

interface ICredentials {
  email: string;
  password: string;
}

export function Login() {
  const [credentials, setCredentials] = useState<ICredentials>({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log(credentials)
      const response = await fetch('http://localhost:3000/api/v1/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log(data)
      }

    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    console.log(e.currentTarget.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        onChange={handleChange}
      />
      <button type='submit'>Iniciar Sesión</button>
    </form>
  )
}
