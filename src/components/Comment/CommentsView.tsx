import React, { useEffect } from 'react'
import useAxios from '../../hooks/useAxios'

export default function CommentsView() {
  const api = useAxios()

  const fetchComments = async () => {
    const response = await api.get('/comments/650df73cee230be718cc53d4')
    console.log(response)
    if (response.status === 200) return response
  }

  useEffect(() => {
    fetchComments()
  }, [])
  return (
    <div>CommentsView</div>
  )
}
