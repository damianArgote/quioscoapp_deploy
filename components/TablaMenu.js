import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";
import Alerta from "./Alerta";

const TablaMenu = ({ eliminarProducto }) => {
  const { categoriaActual, alerta } = useQuiosco();
  const fetcher = () =>
    axios(`/api/categorias/${categoriaActual.id}/productos`).then(
      (datos) => datos.data
    );
  const { data: productos, mutate } = useSWR(
    `/api/categorias/${categoriaActual.id}/productos`,
    fetcher,
    { refreshInterval: 100 }
  );

  const handleEliminar = (id) => {
    eliminarProducto(id);
    mutate();
  };

  const msg = alerta.msg;

  return (
    <>
      {msg && <Alerta alerta={alerta} />}
      {
        productos?.length > 0 ?
        (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              Imagen
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr
              key={producto.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <Image
                  src={`${producto.imagen}`}
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
                  onClick={() => handleEliminar(producto.id)}
                >
                  Eliminar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        )
        :
        (
          <p className="text-center text-xl font-bold uppercase p-5">No hay productos para esta categoria</p>
        )
      }
    </>
  );
};

export default TablaMenu;
