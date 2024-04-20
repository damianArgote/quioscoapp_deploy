import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`${!alerta.error ? 'bg-sky-700' : 'bg-red-500'} rounded-md text-white font-bold text-lg text-center p-3 mb-6`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta