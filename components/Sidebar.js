import Image from "next/image"
import useQuiosco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {
    const {categorias,isNavVisible,setIsNavVisible} = useQuiosco();
    

    const toggleNavVisibility = () => {
      setIsNavVisible(!isNavVisible);
    };



  return (
    <>
      <Image
        width={200}
        height={150}
        src="/assets/img/gestion-pedidos.svg"
        alt="imagen logotipo"
        layout="responsive"
        className="w-full h-full"
        onClick={toggleNavVisibility}
      />
    
      <nav className={`mt-10 md:w-auto ${isNavVisible ? '' : 'hidden'} md:block transition-all duration-300 ease-in-out`}>
        {categorias.map(categoria => (
            <Categoria
                key={categoria.id}
                categoria={categoria}
            />
        ))}
    </nav>
    
    
    </>
  )
}

export default Sidebar
