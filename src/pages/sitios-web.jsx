import { Gauge, MessageCircle, Search, Smartphone } from 'lucide-react'
import landingImage from '../assets/landing.webp'
import landingImageTwo from '../assets/landing2.webp'
import ServiceCard from '../components/service-card.jsx'
import WebsiteBenefits from '../components/website-benefits.jsx'
import Faq from '../components/faq.jsx'

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

const websiteFaqQuestions = [
  {
    question: '¿Cuál es la diferencia entre una Landing Page y un Sitio Web Institucional?',
    description: 'Una Landing Page es una página única diseñada específicamente para una campaña o conversiones directas (captación de contactos o ventas de un servicio puntual). Un sitio web institucional abarca múltiples secciones (Inicio, Nosotros, Servicios, Contacto, Blog) para transmitir la identidad completa de tu marca, su historia y toda su oferta de valor.',
  },
  {
    question: '¿Cuánto tiempo toma el desarrollo y lanzamiento de la web?',
    description: 'Típicamente, una Landing Page puede estar desplegada (deploy) en 1 a 2 semanas, mientras que una web institucional completa requiere entre 3 y 5 semanas. Trabajamos con sprints semanales o quincenales, por lo que tendrás avances funcionales desde las primeras etapas.',
  },
  {
    question: '¿El sitio web será adaptable a celulares (responsive) y optimizado para Google?',
    description: 'Sí, absolutamente. Todos nuestros desarrollos siguen buenas prácticas de diseño UX/UI Mobile-First, garantizando una navegación impecable en celulares, tablets y computadoras. Además, estructuramos el código con optimización SEO técnica base (velocidad de carga, metadatos y marcado semántico) para favorecer el posicionamiento orgánico.',
  },
  {
    question: '¿Qué información o recursos necesito entregarles para iniciar?',
    description: 'Necesitamos tu logotipo (en alta resolución o vectorial), la paleta de colores/manual de marca (si lo tenés), los textos e imágenes que quieras incluir y las credenciales de tu dominio/hosting si ya los adquiriste. Si no contás con alguno de estos elementos, te asesoramos para crearlos o contratarlos.',
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
      />
      <section className="sitios-web-plans" id="planes-sitios-web" aria-label="Planes de sitios web">
        {websitePlans.map((service) => <ServiceCard key={service.title} service={service} />)}
      </section>
      <Faq id="preguntas-frecuentes-sitios-web" questions={websiteFaqQuestions} animateOnView />
    </section>
  )
}

export default SitiosWeb
