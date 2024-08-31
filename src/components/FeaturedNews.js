import React from 'react'

export default function FeaturedNews() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Noticias Destacadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={`/placeholder.svg?height=200&width=400`} alt={`Noticia ${item}`} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">Título de la Noticia {item}</h3>
              <p className="text-gray-700">Breve descripción de la noticia. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a href="#" className="mt-4 inline-block text-blue-600 hover:underline">Leer más</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}