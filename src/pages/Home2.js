import React from 'react'

const Header = ({ navItems }) => (
  <header className="bg-gray-800 text-white">
    <nav className="container mx-auto px-6 py-3">
      <ul className="flex justify-between items-center">
        {navItems.map((item, index) => (
          <li key={index}>
            <a href={item.url} className="hover:text-gray-300 transition-colors">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
)

export default function Home({ headerItems }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header navItems={headerItems} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Bienvenido a Reserva de Salas de Música UDP</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`https://via.placeholder.com/400x200?text=Imagen+${item}`}
                  alt={`Imagen ${item}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">Título de la sección {item}</h2>
                  <p className="text-gray-600">Breve descripción o información relevante sobre esta sección.</p>
                  <a href="#" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Más información
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Reserva de Salas de Música UDP. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

Home.defaultProps = {
  headerItems: [
    { title: 'Login', url: '/login' },
    { title: 'Salas de ensayo', url: '/salas-ensayo' },
    { title: 'Bandas UDP', url: '/bandas-udp' },
    { title: 'Verificador Integrante', url: '/verificador-integrante' },
    { title: 'Calendario salas', url: '/calendario-salas' },
  ],
}