import React, { useEffect, useState } from 'react'
import { Button, Card, message } from 'antd'
import axios from 'axios'
import type { Post } from '../types/Post'

function Posts() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await axios.get<Post[]>('api/posts');
        setPosts(posts.data)
      } catch (error) {
        message.error(error.message)
      }
    }
    fetchPosts()
  }, [])

  return (
    <Card>
        {posts.map(el => {
          return (
            <Card key={el.id}>
              <div>
                {el.content}
              </div>
              <div>
                {new Date(el.createdAt).toDateString()}
              </div>
              <div>
                <Button type='primary'>Редактировать</Button>
                <Button color='danger'>Удалить</Button>
              </div>
            </Card>
          )
        })}
    </Card>
  )
}

export default Posts