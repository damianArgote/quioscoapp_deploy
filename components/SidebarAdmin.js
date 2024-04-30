import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";
import ItemAdmin from "./ItemAdmin";
const SidebarAdmin = () => {

    const {acciones,isNavVisible,setIsNavVisible} = useQuiosco();

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
        fill
        className="w-full h-full"
        onClick={toggleNavVisibility}
      />

      <nav
        className={`mt-10 md:w-auto ${
          isNavVisible ? "" : "hidden"
        } md:block transition-all duration-300 ease-in-out`}
      >
        {acciones.map((accion) => (
          <ItemAdmin key={accion.id} accion={accion} />
        ))}
      </nav>
    </>
  );
};

export default SidebarAdmin;
