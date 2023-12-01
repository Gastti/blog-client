import axios from "axios"
import { baseUrl } from "./shared"

export const getAllPosts = async () => {
  const response = await axios.get(`${baseUrl}/posts`)
  return response
}

export const getPostById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/posts/find/${id}`)
  return response
}

export const getPostsByAuthor = async (username: string) => {
  const response = await axios.get(`${baseUrl}/posts/author/${username}`)
  return response
}

export const sendNewPost = async (body: FormData, token: string) => {
  const response = await axios.post(`${baseUrl}/posts`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}

export const sendEditedPost = async (body: FormData, token: string, id: string) => {
  const response = await axios.put(`${baseUrl}/posts/${id}`, body, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  return response
}