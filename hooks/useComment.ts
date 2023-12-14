import type { Comment } from '../interfaces'
import React, { useState } from 'react'
import useSWR from 'swr'

export default function useComments() {
  const [text, setText] = useState('')

  const { data: comments, mutate } = useSWR<Comment[]>(
    '/api/comment',
    { fallbackData: [] }
  )

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setText('')
      await mutate()
    } catch (err) {
      console.log(err)
    }
  }

  const onDelete = async (comment: Comment) => {

    try {
      await fetch('/api/comment', {
        method: 'DELETE',
        body: JSON.stringify({ comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await mutate()
    } catch (err) {
      console.log(err)
    }
  }

  return { text, setText, comments, onSubmit, onDelete }
}
