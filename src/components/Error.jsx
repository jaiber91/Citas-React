import React from 'react'

//Mensaje: es un prop que viene desde form
export const Error = ({mensaje}) => {
  return (
    <div className='bg-red-700 text-white text-center p-3 uppercase font-bold rounded-md'>
        <p>{mensaje}</p>
    </div>
  )
}
