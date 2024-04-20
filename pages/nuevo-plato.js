import useSWR from "swr";
import axios from "axios";
import AdminLayout from "@/layout/AdminLayout";
import FormularioProducto from "@/components/FormularioProducto";
export default function NuevoPlato() {
  //const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
  //const { data, error, isLoading } = useSWR('/api/ordenes', fetcher,{refreshInterval: 100})

  return (
    <AdminLayout pagina="nuevo-plato">
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Agrega un nuevo plato al menú</p>
    <FormularioProducto/>
      {/* {data && data.length ? data.map(orden =>(
                <Orden
                key={orden.id} orden={orden}
                />
            )) : (
                <p>No hay ordenes pendientes</p>
            )} */}
    </AdminLayout>
  );
}
