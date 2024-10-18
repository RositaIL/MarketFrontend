import logo from "../../../data/imagen-inicio.png";
import reporteImg from "../../../data/Reporte.jpg";
import img2 from "../../../data/imagen-inicio1.png";
import { SiSpringsecurity } from "react-icons/si";
import { SlSupport } from "react-icons/sl";
import { HiBuildingStorefront } from "react-icons/hi2";

export const HomePage = () => {
  return (
    <>
      <div className="px-4 sm:px-10">
        <div className="">
          <div className="grid md:grid-cols-2 justify-center items-center gap-10">
            <div className="max-md:order-1">
              <p className="mt-4 mb-2 font-semibold text-blue-600">
                <span className="rotate-90 inline-block mr-2">|</span>{" "}
                MINIMARKET MARBELLA
              </p>
              <h1 className="md:text-4xl text-2xl font-bold mb-4 md:!leading-[55px]">
                Gestión de Inventario Eficiente
              </h1>
              <p className="mt-4 text-base leading-relaxed">
                En nuestro mini-market, contamos con un sistema avanzado de
                gestión de inventario que nos permite ofrecerte siempre
                productos frescos y disponibles. Con una organización eficiente
                de nuestro almacén, garantizamos que los artículos más
                importantes para tu hogar estén siempre en stock, listos para
                que los adquieras en cualquier momento.
              </p>
            </div>
            <div className="max-md:mt-12 h-full flex items-center justify-end">
              <img src={logo} alt="banner img" className="object-cover" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 justify-center items-center gap-10">
            <div className="max-md:mt-12 h-full">
              <img src={img2} alt="banner img" className="object-cover" />
            </div>
            <div className="max-md:order-1">
              <h1 className="md:text-4xl text-2xl font-bold mb-4 md:!leading-[55px]">
                Control Total del Almacén
              </h1>
              <p className="mt-4 text-base leading-relaxed">
                Con nuestra plataforma, controlar el inventario de tu minimarket
                nunca ha sido tan fácil. Registra productos, actualiza
                existencias, y mantén el control del movimiento de mercadería en
                tiempo real. Simplifica tus tareas diarias y toma decisiones
                inteligentes con la ayuda de informes automáticos y alertas
                personalizadas.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 sm:px-10 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="md:text-center max-w-2xl mx-auto">
              <h2 className="md:text-3xl text-3xl font-bold mb-6">
                Seguimiento Detallado del Inventario
              </h2>
              <p>
                Con nuestro sistema de inventario digitalizado, llevamos un
                control detallado de cada producto que entra y sale de nuestro
                almacén. Esto nos permite garantizar que siempre contamos con
                los productos más frescos y de mejor calidad para ti.
              </p>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-14">
              <div>
                <HiBuildingStorefront className="w-8 h-8 fill-blue-600 mb-4 inline-block" />
                <h3 className="text-xl font-semibold mb-2">Alamacen</h3>
                <p>
                  Garantizar un abastecimiento adecuado y mejorar la rotación de
                  tus productos.
                </p>
              </div>
              <div>
                <SiSpringsecurity className="w-8 h-8 fill-blue-600 mb-4 inline-block" />
                <h3 className="text-xl font-semibold mb-2">Seguridad</h3>
                <p>
                  Tus datos están protegidos por las últimas medidas de
                  seguridad.
                </p>
              </div>
              <div>
                <SlSupport className="w-8 h-8 fill-blue-600 mb-4 inline-block" />
                <h3 className="text-xl font-semibold mb-2">Atención</h3>
                <p>atención al cliente para todas sus consultas.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="md:text-center max-w-2xl mx-auto">
            <h2 className="md:text-4xl text-3xl font-bold mb-6">
              Abastecimiento inteligente
            </h2>
            <p>
              Utilizamos tecnología de punta para gestionar nuestro inventario y
              satisfacer tus necesidades diarias
            </p>
          </div>
          <div className="mt-14">
            <div className="grid md:grid-cols-2 items-center gap-16">
              <div>
                <img
                  src={reporteImg}
                  className="w-full object-contain rounded-md shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]"
                />
              </div>
              <div className="max-w-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Reportes Detallados de Inventario
                </h3>
                <p>
                  Nuestro sistema no solo gestiona el inventario en tiempo real,
                  sino que también genera reportes detallados que te permiten
                  visualizar el estado de los productos en el almacén. Nuestros
                  reportes te brindan información clave para optimizar la toma
                  de decisiones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
