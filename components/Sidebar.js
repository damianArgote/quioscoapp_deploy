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
      width={300} 
      height={100} 
      src="/assets/img/logo_trial.png"
      className="w-full"
      alt="imagen logo"
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
