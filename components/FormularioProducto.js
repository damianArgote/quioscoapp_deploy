import { useState } from "react";
import useQuiosco from "@/hooks/useQuiosco";
import Alerta from "./Alerta";
const FormularioProducto = () => {
  const { categorias } = useQuiosco();

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [alerta,setAlerta] = useState('');

  const onChangeImagen = (e) => {

    if (e.target.files[0]) {
      setImagen(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setShowPreview(true);
    }else{
        setShowPreview(false)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(nombre);
    console.log(precio);
    console.log(categoriaId);
    console.log(imagen);
    //validar
    if([nombre,precio,categoriaId].includes('') || !imagen){
        //alerta
        setAlerta('Todos los campos son obligatorios')
        return;
    }
    setAlerta('')
    //guardar db

    //resetear formulario
    setNombre('')
    setPrecio('')
    setCategoriaId('')
    setImagen(null)
    setShowPreview(false)
    setPreview(null)
  };

  const alert = alerta;
  return (
    <form className="w-full p-5 shadow-md" onSubmit={handleSubmit}>
        {
            alert && <Alerta alerta={alerta}/>
        }
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-3/6 px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Nombre del Plato
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          ></input>
          {/* <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p> */}
        </div>

        <div className="w-full md:w-1/6 px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Precio
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number"
            onChange={(e) => setPrecio(e.target.value)}
            value={precio}
          />
        </div>
        <div className="w-full md:w-2/6 px-3 mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Seleccionar categoria
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setCategoriaId(e.target.value)}
            value={categoriaId}
          >
             <option value="">
                - Seleccionar -
              </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full px-3">
          <div className="flex flex-col-reverse md:flex-row items-center space-x-6">
            {showPreview && (
              <div className="shrink-0">
                <img
                  className="h-16 w-16 object-cover rounded-full"
                  src={preview}
                  alt="Vista previa de producto"
                />
              </div>
            )}

            <label className="w-full uppercase  text-gray-700 text-xs font-bold mb-2">
              <input
                type="file"
                className="block w-full text-sm text-gray-700 cursor-pointer
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:cursor-pointer
                    file:bg-gray-900 file:text-white
                    hover:file:bg-gray-600"
                onChange={(e) => onChangeImagen(e)}
              />
            </label>
          </div>
        </div>
        <input
          className="bg-sky-700 px-4 py-2 text-white rounded-md fotn-bold uppercase shadow-md w-full md:w-auto mt-10 cursor-pointer"
          type="submit"
          value="Guardar"
        />
      </div>
    </form>
  );
};

export default FormularioProducto;
