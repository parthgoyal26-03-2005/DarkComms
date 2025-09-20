

interface prop {
  username: string,
  messg: string
}
export const Mymessg = ({ username, messg }: prop) => {
  return (
    <div className='max-w-[70%] sm:max-w-[60%] h-auto bg-[#afc0ae49] backdrop-blur-sm font:mono p-1 flex flex-col justify-start  text-white rounded-md'>
      <div className='flex justify-start mb-1 text-lg text-green-300 font-semibold'>
        {username}</div>
      <div className='break-words '>{messg}</div>

    </div>
  )
}
