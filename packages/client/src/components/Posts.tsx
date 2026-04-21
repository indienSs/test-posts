import React, { useEffect, useState } from 'react'
import { Card, message } from 'antd'
import axios from 'axios'
import type { Post } from '../types/Post'

function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await axios.get('api/posts');
        setPosts(posts.data)
      } catch (error) {
        message.error(error.message)
      }
    }
    fetchPosts()
  }, [])

  return (
    <Card>
        Posts
    </Card>
  )
}

export default Posts