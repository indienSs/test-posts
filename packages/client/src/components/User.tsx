import React, { useEffect, useState } from 'react'
import { Button, Card, message } from 'antd'
import axios from 'axios'
import type { User } from '../types/User'

function User() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get<User>('api/users/00000000-0000-0000-0000-000000000001');
        setUser(user.data)
      } catch (error) {
        message.error(error.message)
      }
    }
    fetchUser()
  }, [])

  return (
    <Card>
      <div>
        {`${user?.firstName} ${user?.lastName}`}
      </div>
      <div>
        {new Date(user?.birthDate).toDateString()} 
      </div>
      <div>
        {user?.about} 
      </div>
      <div>
        {user?.email} 
      </div>
      <div>
        {user?.phone} 
      </div>
      <Button type='primary'>Редактировать</Button>
    </Card>
  )
}

export default User