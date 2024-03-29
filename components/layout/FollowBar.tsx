import useUsers from '@/hooks/useUsers'
import React from 'react'
import Avatar from '../Avatar';
import { ClipLoader } from 'react-spinners';

const FollowBar = () => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
      return (
        <div className='flex items-center lg:block justify-center w-full'>
          <ClipLoader color='lightblue' size={30} />
        </div>
      )
  }

  return (
    <div className='px-6 py-4 hidden lg:block lg:col-span-1'>
      <div className="bg-neutral-900 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        <div className='flex flex-col gap-6 mt-4'>
          {
            users.map((user: Record<string, any>) => (
              <div  key={user.id} className="flex flex-row gap-3 mt-4">
                <Avatar userId={user.id} />
                <div className="flex flex-col ">
                  <p className='text-white font-semibold text-sm'>{user.name}</p>
                  <p className='text-neutral-400 text-sm'>@{user.username}</p>
                </div>
              </div>
            )
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FollowBar
