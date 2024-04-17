
import useQuiosco from "@/hooks/useQuiosco"

const ItemAdmin = ({accion}) =>  {
    const {accionActual, handleClickAccion} = useQuiosco();
      const {nombre,id} =accion
    return (
      <div className={`${accionActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
        <button
          type="button"
          className="text-2xl font-bold hover:cursor-pointer"
          onClick={() => handleClickAccion(id)}
        >
          {nombre}
        </button>
      </div>
    )
  }

export default ItemAdmin