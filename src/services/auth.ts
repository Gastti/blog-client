import axios from "axios"
import { RegisterValues, LoginValues } from "../types"
import { baseUrl } from "./shared"


export const register = async (
  { username, firstname, lastname, email, password }: RegisterValues
) => {
  const response = await axios.post(`${baseUrl}/auth/signup`, { username, firstname, lastname, email, password })
  return response
}

export const login = async ({ email, password }: LoginValues) => {
  const response = await axios.post(`${baseUrl}/auth/signin`, { email, password })
  return response
}

export const refresh = async (refreshToken: string) => {
  const response = await axios.post(`${baseUrl}/auth/refresh`, {}, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  })
  return response
}

export const logout = () => {
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
}