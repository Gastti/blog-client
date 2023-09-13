import axios from "axios"
import { RegisterEntry } from "../types"

const ENDPOINT = 'https://blog-api-nqc2.onrender.com/api/v1/auth/signup'

export const register = async (
  { username, firstname, lastname, email, password }: RegisterEntry
) => {
  const response = await axios.post(ENDPOINT, { username, firstname, lastname, email, password })
  if (response.status !== 200) {
    console.log('Manejar este error')
  }

  return response
}