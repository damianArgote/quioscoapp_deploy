import Image from "next/image"
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";
const TablaMenu = ({eliminarProducto}) => {

  const { categoriaActual} = useQuiosco();

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-16 py-3">
            <span className="sr-only">Image</span>
          </th>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3">
            Precio
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
      {
        categoriaActual?.productos?.map(producto =>(
          <tr
          key={producto.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="p-4">
            <Image src={`${producto.imagen}`} 
              alt={`Imagen producto ${producto.nombre}`}
              width={100}
              height={150}
              className="rounded-md"
            />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {producto.nombre}
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {formatearDinero(producto.precio)}
          </td>
          <td className="px-6 py-4">
            <a
              href="#"
              className="font-medium text-red-600 dark:text-red-500 hover:underline"
              onClick={() => eliminarProducto(producto.id)}
            >
              Eliminar
            </a>
          </td>
        </tr>
        ))
      }
      </tbody>
    </table>
  );
};

export default TablaMenu;
