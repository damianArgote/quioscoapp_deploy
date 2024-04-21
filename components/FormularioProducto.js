import { useState, useEffect, useRef } from "react";
import useQuiosco from "@/hooks/useQuiosco";
import Alerta from "./Alerta";
import axios from 'axios';
const FormularioProducto = () => {
  const { categorias, nuevoProducto } = useQuiosco();
  const inputFileRef = useRef(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [imagen,setImagen] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenId, setImagenId] = useState("");
  const [preview, setPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [alerta,setAlerta] = useState({});

  useEffect(() =>{

    if(imagen && imagenId){
      //guardo en DB
      nuevoProducto({nombre,precio,imagen,categoriaId,imagenId});
      //resetear formulario
      setNombre('')
      setPrecio('')
      setCategoriaId('')
      setImagen('');
      setImagenFile(null)
      setShowPreview(false)
      setPreview(null)
      setAlerta({})
      setImagenId("");
      
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    }

  },[imagen,imagenId])

  const onChangeImagen = (e) => {

    if (e.target.files[0]) {
      setImagenFile(e.target.files[0]);
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

  const handleUploadImage = async () =>{
    const formData = new FormData();
    formData.append('file',imagenFile);
    try {
      setAlerta({msg:'Procesando...',error:false})
      const {data} = await axios.post('/api/upload',formData);
      setImagen(data.imageUrl);
      setImagenId(data.imageUrlPublicId);
        
    } catch (error) {
      console.log(error);
      setAlerta({msg:'Hubo un error',error:true})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //validar
    if([nombre,precio,categoriaId].includes('') && !imagenFile){
        //alerta
        setAlerta({msg:'Todos los campos son obligatorios',error:true})
        return;
    }
    setAlerta({})
    //subo imagen a claudinary
    handleUploadImage();
  };

  const mensaje = alerta.msg;
  return (
    <form className="w-full p-5 shadow-md" onSubmit={handleSubmit}>
        {
            mensaje && <Alerta alerta={alerta}/>
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
                ref={inputFileRef}
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
