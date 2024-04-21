
import AdminLayout from "@/layout/AdminLayout";
import FormularioCategoria from "@/components/FormularioCategoria";
export default function NuevaCategoria() {

  return (
    <AdminLayout pagina="nueva-categoria">
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Agrega un nuevo plato al menú</p>
      <FormularioCategoria/>

    </AdminLayout>
  );
}
