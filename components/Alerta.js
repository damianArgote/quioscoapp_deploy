import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className=' bg-red-500 rounded-md text-white font-bold text-lg text-center p-3 mb-6'>
        {alerta}
    </div>
  )
}

export default Alerta