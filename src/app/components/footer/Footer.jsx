function Footer() {
  return (
    <footer className="bg-white rounded-lg dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Contacto
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Trabaja con nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Aviso legal
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
              Canal de Denuncias Laboral-Profesional
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
          </a>
          . Todos los derechos reservados
        </span>
      </div>
    </footer>
  );
}

export default Footer;
