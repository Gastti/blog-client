import axios from "axios"
import { RegisterValues, LoginValues } from "../types"
import { ENDPOINT } from "./endpoints"


export const register = async (
  { username, firstname, lastname, email, password }: RegisterValues
) => {
  const response = await axios.post(`${ENDPOINT}/auth/signup`, { username, firstname, lastname, email, password })
  return response
}

export const login = async ({ email, password }: LoginValues) => {
  const response = await axios.post(`${ENDPOINT}/auth/signin`, { email, password })
  return response
}

export const refreshSession = async (refreshToken: string) => {
  console.log(refreshToken)
  const response = await axios.post(`${ENDPOINT}/auth/refresh`, {}, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  })
  return response
}

export const logout = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
}