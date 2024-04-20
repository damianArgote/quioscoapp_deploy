import {useState,useEffect,createContext} from 'react';
import {mutate} from 'swr';
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import axios from 'axios';


const QuioscoContext = createContext();

const QuioscoProvider = ({children}) =>{

    const router = useRouter();
    /* useState */
    const[categorias,setCategorias] = useState([])
    const[categoriaActual,setCategoriaActual] = useState({});
    const[producto,setProducto] = useState({})
    const[modal,setModal] = useState(false)
    const[pedido,setPedido] = useState([])
    const[nombre,setNombre] = useState('')
    const[total,setTotal] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true);
    const[acciones,setAcciones] = useState([]);
    const[accionActual,setAccionActual] = useState();


    const obtenerCategorias = async () =>{
        const data = await axios('/api/categorias');
        setCategorias(data.data);
    }

    const obtenerAcciones = async () =>{
        setAcciones([
            {
                nombre:'Ver Ordenes',
                id:1,
                url:'admin'
            },
            {
                nombre:'Ver Menú',
                id:2,
                url:'menu'
            },
            {
                nombre:'Agregar al Menú',
                id:3,
                url:'nuevo-plato'
            }
        ]);
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    /* useEffect */
    useEffect(() =>{
        obtenerCategorias();
        obtenerAcciones();
    },[]);

    useEffect(() => {
      setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        setAccionActual(acciones[0])
      }, [acciones])
    
    useEffect(() =>{
        const nuevoTotal = pedido.reduce((total,producto) => (producto.precio  * producto.cantidad) + total,0)
        setTotal(nuevoTotal)
    },[pedido])

    /* Enventos */
    const handleClickCategoria = id =>{
        const categoria = categorias.filter( cat => cat.id === id);
       setCategoriaActual(categoria[0]);
       setIsNavVisible(!isNavVisible);
       router.push('/')
    }

    const handleClickAccion = id =>{
        const accion = acciones.filter( acc => acc.id === id);
       setAccionActual(accion[0]);
       setIsNavVisible(!isNavVisible);
       router.push(`/${accion[0].url}`)
    }

    const handleChangeModal = () =>{
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId,...producto}) =>{

        if(pedido.some(productoState => productoState.id === producto.id)){

            const pedidoActualizado = pedido.map( productoState => productoState.id === producto.id ? producto : productoState);

            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')

        }else{
            setPedido([...pedido,producto]);
            toast.success('Agregado al Pedido')
        }
        setModal(false)
        
    }

    const handleEditarCantidades = id =>{
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)

    }

    const handleEliminarProducto =id =>{
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)

    }

    const colocarOrden = async (e) =>{
        e.preventDefault()

        try {
            await axios.post('/api/ordenes',{
                pedido,
                nombre,
                total,
                fecha:Date.now().toString()
            });
            
            //reset app
            setCategoriaActual(categorias[0]);
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')
            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error) {
            console.log(error);
        }
       
    }

    const eliminarProducto = async (id) =>{
        try {
            const response = await axios.post('/api/deleteProducto',{id});
            toast.success('Se elimino el producto')
            return response.data;
            
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            toast.error('Error al eliminar el producto')
        }
    }

    const nuevoProducto = async (producto) =>{
        try {

            const response = await axios.post('/api/createProducto',producto);
            obtenerCategorias();
            toast.success('Guardado Correctamente')
            return response.data.producto
            
        } catch (error) {
            console.error('Error al crear el producto:', error);
            toast.error('Error al crear el producto')
        }
    }

    return (
        <QuioscoContext.Provider
        value={{
            categorias,
            categoriaActual,
            producto,
            pedido,
            modal,
            nombre,
            handleSetProducto,
            handleClickCategoria,
            handleChangeModal,
            handleAgregarPedido,
            handleEditarCantidades,
            handleEliminarProducto,
            setNombre,
            colocarOrden,
            total,
            isNavVisible,
            setIsNavVisible,
            acciones,
            accionActual,
            handleClickAccion,
            setCategoriaActual,
            eliminarProducto,
            nuevoProducto
        }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext