import {useState,useEffect} from 'react'
import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco"
import {formatearDinero} from '../helpers'
const ModalProducto = () => {
    const {producto,handleChangeModal,handleAgregarPedido,pedido} = useQuiosco();
    const[cantidad,setCantidad] =useState(1)
    const[edicion,setEdicion] = useState(false);

    useEffect(() =>{
        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const productoEdicion = pedido.find(pedidoState => pedidoState.id === producto.id);
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
        }
    },[producto,pedido])

    
  return (
    <div className="flex gap-10 flex-col-reverse md:flex-row">
        <div className="md:w-1/3">
            <Image
                width={300}
                height={400}
                alt={`Imagen producto ${producto?.nombre}`}
                src={`${producto.imagen}`}
            />
        </div>

        <div className="md:w-2/3 sm:mt-14">
            <div className="flex justify-end">
                <button
                onClick={handleChangeModal}
                >
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6">
                    <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </button>
            </div>
            <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
            <p className="mt-5 font-black text-5xl text-amber-500 text-center md:text-left">
                {formatearDinero(producto.precio)}
            </p>

            <div className='flex gap-4 mt-5 justify-center md:justify-start'>
                <button
                type='button'
                onClick={() =>{
                    if(cantidad <= 1) return;
                    setCantidad(cantidad -1)
                }}
                >
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth={1.5} stroke="currentColor" 
                    className="w-7 h-7">
                    <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>
                <p className='text-3xl'>{cantidad}</p>
                <button
                type='button'
                onClick={() =>{
                    if(cantidad >= 100) return;
                    setCantidad(cantidad +1)
                }}
                >
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-7 h-7">
                    <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>
            </div>

            <button
            type='button'
            className='bg-indigo-600 hover:bg-indigo-800 mt-5 text-white uppercase rounded px-5 py-2 font-bold w-full md:w-auto'
            onClick={() => handleAgregarPedido({...producto,cantidad})}
            >
                {edicion ? 'Guardar Cambios' : 'Añadir al Pedido'}
            </button>
        </div>
      
    </div>
  )
}

export default ModalProducto
