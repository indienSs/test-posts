import React, { useEffect, useState } from 'react'
import { Card, message } from 'antd'
import axios from 'axios'
import type { User } from '../types/User'

function User() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get('api/users/00000000-0000-0000-0000-000000000001');
        setUser(user.data)
      } catch (error) {
        message.error(error.message)
      }
    }
    fetchUser()
  }, [])

  return (
    <Card>
        User
    </Card>
  )
}

export default User