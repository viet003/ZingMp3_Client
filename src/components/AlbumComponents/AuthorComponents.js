import React from 'react'
import { ItemsAuthorComponents } from "../"


const AuthorComponents = ({ items }) => {

  console.log(items)

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-gray-600 font-semibold text-[20px]'>Nghệ Sĩ Tham Gia</h1>
      <div className='grid grid-cols-4 gap-10'>
        {
          items?.map((el, index) => (
            <ItemsAuthorComponents item={el} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default AuthorComponents
