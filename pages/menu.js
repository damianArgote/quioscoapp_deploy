import AdminLayout from "@/layout/AdminLayout";
import TablaMenu from "@/components/TablaMenu";
import useQuiosco from "@/hooks/useQuiosco";
export default function Menu() {
  const { categorias,categoriaActual, setCategoriaActual, eliminarProducto } = useQuiosco();

  const handleChange = (e) =>{
    const categoria = categorias.filter( cat => cat.id === Number(e.target.value));
    setCategoriaActual(categoria[0]);
  }

  return (
    <AdminLayout pagina="menu">
      <h1 className="text-4xl font-black">Panel de Administracion</h1>
      <p className="text-2xl my-10">Administra tu menú</p>
      <p>No hay menú</p>

      {/* Seleccionar Categoria */}
      <form className="max-w-sm">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Seleccionar categoria
        </label>
        <select
        onChange={ e => handleChange(e)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {categorias.map(categoria => (
             <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
        ))}

        </select>
      </form>
      {/* Grilla del menu */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      {categoriaActual ?
       <TablaMenu eliminarProducto={eliminarProducto} />
       : <p>No hay menú</p>
      }
        
      </div>

    </AdminLayout>
  );
}
