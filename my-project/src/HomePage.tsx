'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone, Mail, Clock, MapPin, ChevronDown } from "lucide-react"

export default function Component() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault()
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href')
      if (href?.startsWith('#')) {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => link.addEventListener('click', handleScroll))

    return () => links.forEach(link => link.removeEventListener('click', handleScroll))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`px-4 lg:px-6 h-20 flex items-center fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <Link className="flex items-center justify-center" href="#">
          <span className="sr-only">Inicio</span>
          <span className="h-10 w-10 text-3xl">🦷</span>
          <span className="ml-2 text-2xl font-bold text-primary">Clínica Dental</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary hidden sm:inline-block" href="#ayuda">
            Ayuda
          </Link>
          <Link className="text-sm font-medium hover:text-primary hidden sm:inline-block" href="#seguridad">
            Seguridad
          </Link>
          <Link className="text-sm font-medium hover:text-primary hidden sm:inline-block" href="#acerca">
            Acerca de
          </Link>
          <Button className="hidden sm:inline-flex" variant="outline" onClick={() => router.push('/login')}>
            Entrar
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="sm:hidden" size="icon" variant="outline">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link className="text-sm font-medium hover:text-primary" href="#ayuda">
                  Ayuda
                </Link>
                <Link className="text-sm font-medium hover:text-primary" href="#seguridad">
                  Seguridad
                </Link>
                <Link className="text-sm font-medium hover:text-primary" href="#acerca">
                  Acerca de
                </Link>
                <Button onClick={() => router.push('/login')}>Entrar</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center" style={{backgroundImage: 'url("/placeholder.svg?height=600&width=1200")'}}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Bienvenido a nuestra Clínica Dental
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Cuidamos de tu sonrisa con la mejor atención y tecnología de vanguardia
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={() => router.push('/login')}>Agendar Cita</Button>
                <Button variant="outline">Conoce Nuestros Servicios</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100" id="ayuda">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Ayuda</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <Phone className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Contacto Telefónico</h3>
                <p className="text-gray-500">Llámanos para resolver tus dudas o agendar una cita.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Mail className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Correo Electrónico</h3>
                <p className="text-gray-500">Escríbenos y te responderemos a la brevedad.</p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Clock className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Horario de Atención</h3>
                <p className="text-gray-500">Conoce nuestros horarios de atención.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32" id="seguridad">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Seguridad de la información</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Protección de Datos</h3>
                <p className="text-gray-500">Tu información personal está segura con nosotros. Utilizamos las últimas tecnologías de encriptación.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Confidencialidad</h3>
                <p className="text-gray-500">Garantizamos la confidencialidad de tus registros médicos y toda la información relacionada con tu tratamiento.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100" id="acerca">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Acerca del proyecto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Nuestra Misión</h3>
                <p className="text-gray-500">Brindar atención dental de calidad, accesible y centrada en el paciente.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Nuestro Equipo</h3>
                <p className="text-gray-500">Contamos con profesionales altamente calificados y comprometidos con tu salud bucal.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Tecnología</h3>
                <p className="text-gray-500">Utilizamos equipos de última generación para diagnósticos precisos y tratamientos efectivos.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white">
        <div className="container px-4 py-12 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><Phone className="h-5 w-5 mr-2" /> +1 234 567 890</li>
                <li className="flex items-center"><Mail className="h-5 w-5 mr-2" /> info@clinicadental.com</li>
                <li className="flex items-center"><MapPin className="h-5 w-5 mr-2" /> 123 Calle Principal, Ciudad</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Servicios</h3>
              <ul className="space-y-2">
                <li>Limpieza Dental</li>
                <li>Ortodoncia</li>
                <li>Implantes</li>
                <li>Blanqueamiento</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:underline">Inicio</Link></li>
                <li><Link href="#ayuda" className="hover:underline">Ayuda</Link></li>
                <li><Link href="#seguridad" className="hover:underline">Seguridad</Link></li>
                <li><Link href="#acerca" className="hover:underline">Acerca de</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary"><span className="sr-only">Facebook</span>📘</a>
                <a href="#" className="hover:text-primary"><span className="sr-only">Twitter</span>🐦</a>
                <a href="#" className="hover:text-primary"><span className="sr-only">Instagram</span>📷</a>
                <a href="#" className="hover:text-primary"><span className="sr-only">LinkedIn</span>💼</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>© 2024 Clínica Dental. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}