
import AdminLayout from "@/layout/AdminLayout";
import FormularioProducto from "@/components/FormularioProducto";
export default function NuevoPlato() {


  return (
    <AdminLayout pagina="nuevo-plato">
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Agrega un nuevo plato al menú</p>
    <FormularioProducto/>
    </AdminLayout>
  );
}
