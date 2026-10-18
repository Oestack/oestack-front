import { Gauge, MessageCircle, Search, Smartphone } from 'lucide-react'
import landingImage from '../assets/landing.png'
import landingImageTwo from '../assets/landing2.png'
import ServiceCard from '../components/service-card.jsx'
import WebsiteBenefits from '../components/website-benefits.jsx'

const websiteBenefits = [
  {
    title: 'Diseño adaptable',
    description: 'Tu sitio se adapta a celulares, tablets y computadoras para ofrecer una buena experiencia en cada pantalla.',
    Icon: Smartphone,
  },
  {
    title: 'Base optimizada para SEO',
    description: 'Organizamos la estructura y el contenido para facilitar la comprensión e indexación del sitio por parte de los buscadores.',
    Icon: Search,
  },
  {
    title: 'Rendimiento optimizado',
    description: 'Trabajamos sobre las imágenes y los recursos de la web para favorecer una carga rápida y una navegación fluida.',
    Icon: Gauge,
  },
  {
    title: 'Contacto directo',
    description: 'Integramos WhatsApp y formularios de consulta para que tus potenciales clientes puedan comunicarse con vos fácilmente.',
    Icon: MessageCircle,
  },
]

const websitePlans = [
  {
    title: 'Landing Page',
    description: 'Ideal para promocionar un servicio, presentar un producto o captar potenciales clientes desde una página enfocada en un objetivo.',
    price: '$200.000',
    includes: [
      'Página única con múltiples secciones.',
      'Diseño personalizado y adaptable a celulares, tablets y computadoras.',
      'SEO técnico básico.',
      'Formulario de consultas y sección de contacto.',
      'Acceso directo a WhatsApp.',
      'Certificado SSL para una conexión segura mediante HTTPS.',
      'Dominio y hosting incluidos durante el primer año.',
    ],
  },
  {
    title: 'Web Institucional',
    description: 'Ideal para empresas, profesionales y negocios que necesitan presentar su marca, sus servicios y toda su información de manera profesional.',
    price: '$400.000',
    featured: true,
    includes: [
      'Diseño personalizado con páginas independientes.',
      'Secciones de inicio, nosotros, servicios y contacto.',
      'Diseño adaptable a celulares, tablets y computadoras.',
      'SEO técnico básico en las páginas incluidas.',
      'Formulario de consultas y acceso a WhatsApp.',
      'Integración de mapas, redes sociales y enlaces relevantes.',
      'Certificado SSL para una conexión segura mediante HTTPS.',
      'Dominio y hosting incluidos durante el primer año.',
    ],
  },
]

function SitiosWeb() {
  return (
    <section className="projects-section projects-section--visible sitios-web-page" aria-labelledby="sitios-web-title">
      <h1 className="sitios-web-title" id="sitios-web-title">
        Landing Page y Web Institucional
      </h1>
      <p className="projects-subtitle sitios-web-subtitle">
        <span className="projects-subtitle-lead">Tu marca,</span>
        <span className="projects-subtitle-accent">en la web</span>
      </p>
      <WebsiteBenefits
        benefits={websiteBenefits}
        images={[
          {
            src: landingImage,
            alt: 'Diseño de sitio web adaptable a distintos dispositivos',
            objectPosition: 'right center',
          },
          {
            src: landingImageTwo,
            alt: 'Diseño alternativo de sitio web',
            objectPosition: 'left center',
          },
        ]}
        primaryAction={{ label: 'Ver precios', href: '#planes-sitios-web', variant: 'yellow' }}
        secondaryAction={{ label: 'Contactanos', href: '/#contacto' }}
      />
      <section className="sitios-web-plans" id="planes-sitios-web" aria-label="Planes de sitios web">
        {websitePlans.map((service) => <ServiceCard key={service.title} service={service} />)}
      </section>
    </section>
  )
}

export default SitiosWeb
