import React from 'react'
interface prop{
  username:string,
  messg:string
}
export const Othersmessg = ({username,messg}:prop) => {
  return (
    <div className='max-w-[70%] sm:max-w-[60%] font:mono flex flex-col p-1 px-3 justify-end bg-[#332c2c41] backdrop-blur-sm rounded-md'>
        <div className='flex justify-start mb-1 text-green-300 text-lg font-semibold'>{username}</div>
        <div className='text-white break-words'>{messg}</div>
        
    </div>
  )
}
