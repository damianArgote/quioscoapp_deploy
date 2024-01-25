import {useEffect,useCallback} from 'react'
import useQuiosco from "@/hooks/useQuiosco"
import Layout from "@/layout/Layout"
import {formatearDinero} from '../helpers'

export default function Total() {
    const {pedido,nombre,setNombre,colocarOrden,total} = useQuiosco()

    const comprobarPedido = useCallback(() =>{
        return pedido.length === 0  || nombre === '' || nombre.length === 1
    },[pedido,nombre]) 

    useEffect(() =>{
        comprobarPedido()
    },[pedido,comprobarPedido])

    
    return (
        <Layout pagina="total">
            <h1 className="text-4xl font-black">Total y Confirmar</h1>
            <p className="text-2xl my-10">Confirma tu Pedido a continuacion</p>

            <form onSubmit={colocarOrden}>
                <div>
                    <label 
                    htmlFor="nombre"
                    className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
                    <input
                    id="nombre"
                    type="text"
                    className="bg-gray-200 w-full mt-3 md:w-1/3 p-2 rounded-md"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-2xl">Total a Pagar: {' '} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>

                <div className="mt-5">
                    <input
                    type="submit"
                    value="Confirmar Pedido"
                    className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} w-full lg:w-auto py-2 px-5 rounded uppercase font-bold text-white  text-center`}
                    disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}
