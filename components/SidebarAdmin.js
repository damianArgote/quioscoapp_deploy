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
        width={300}
        height={100}
        src="/assets/img/logo_trial.png"
        alt="imagen logotipo"
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
