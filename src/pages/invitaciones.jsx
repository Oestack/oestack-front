import { CalendarDays, ClipboardCheck, Palette, Sparkles } from 'lucide-react'
import invitacionImage from '../assets/invitacion.png'
import invitacionImageTwo from '../assets/invitacion2.png'
import ServiceCard from '../components/service-card.jsx'
import WebsiteBenefits from '../components/website-benefits.jsx'

const invitationBenefits = [
  {
    title: 'Diseño a tu estilo',
    description: 'Colores, tipografías y recursos visuales elegidos para reflejar la esencia de tu celebración.',
    Icon: Palette,
  },
  {
    title: 'Todo en un solo lugar',
    description: 'Fecha, horario, ubicación, fotografías y demás información importante, siempre accesibles desde el celular.',
    Icon: CalendarDays,
  },
  {
    title: 'Experiencias interactivas',
    description: 'Botones, enlaces, música y elementos visuales que hacen que cada invitación sea más dinámica y especial.',
    Icon: Sparkles,
  },
  {
    title: 'Más organización, menos complicaciones',
    description: 'Facilitá la confirmación de asistencia y, con las funcionalidades premium, organizá las respuestas y recibí regalos de dinero desde la invitación.',
    Icon: ClipboardCheck,
  },
]

const invitationPlans = [
  {
    title: 'Invitación básica',
    description: 'Una invitación digital simple y atractiva para compartir toda la información de tu evento.',
    price: '$100.000',
    pricePrefix: null,
    includesTitle: 'Incluye:',
    includes: [
      'Diseño visual personalizado a partir de una propuesta definida.',
      'Hasta 5 secciones.',
      'Confirmación de asistencia mediante WhatsApp.',
      'Botón para consultar la ubicación en Google Maps.',
      'Diseño adaptable a celulares, tablets y computadoras.',
      'Enlace para compartir por WhatsApp y redes sociales.',
    ],
  },
  {
    title: 'Invitación Premium',
    description: 'Una experiencia más visual e interactiva, con mayor personalización y un dominio propio para tu invitación.',
    price: '$200.000',
    pricePrefix: null,
    featured: true,
    badgeLabel: 'Más elegido',
    includesTitle: 'Incluye todo lo del plan básico, más:',
    includes: [
      'Hasta 8 secciones.',
      'Galería de fotos o contenido visual adicional.',
      'Animaciones y transiciones sutiles.',
      'Botones interactivos y enlaces personalizados.',
      'Música de fondo opcional, con control de reproducción.',
      'Dominio incluido.',
    ],
  },
  {
    title: 'Invitación a Medida',
    description: 'Una experiencia digital desarrollada a medida, con herramientas para gestionar invitados y recibir regalos de dinero.',
    price: '$400.000',
    pricePrefix: null,
    includesTitle: 'Incluye todo lo del plan completo, más:',
    includes: [
      'Secciones personalizadas según las necesidades del evento.',
      'Registro automático de confirmaciones en una planilla compatible con Excel, para organizar a los invitados.',
      'Pasarela de pagos para recibir regalos de dinero de los invitados.',
      'Funcionalidades interactivas adicionales definidas para el proyecto.',
      'Dominio incluido.',
    ],
  },
]

function Invitaciones() {
  return (
    <section className="projects-section projects-section--visible sitios-web-page invitaciones-page" aria-labelledby="invitaciones-title">
      <h1 className="sitios-web-title" id="invitaciones-title">
        Invitaciones Digitales
      </h1>
      <p className="projects-subtitle sitios-web-subtitle">
        <span className="projects-subtitle-lead">Momentos que</span>
        <span className="projects-subtitle-accent">conectan.</span>
      </p>
      <WebsiteBenefits
        benefits={invitationBenefits}
        images={[
          {
            src: invitacionImage,
            alt: 'Diseño de invitación digital para una celebración',
            objectPosition: 'center',
          },
          {
            src: invitacionImageTwo,
            alt: 'Vista alternativa de una invitación digital',
            objectPosition: 'center',
          },
        ]}
      />
      <section className="sitios-web-plans invitaciones-plans" aria-label="Planes de invitaciones digitales">
        {invitationPlans.map((service) => <ServiceCard key={service.title} service={service} />)}
      </section>
    </section>
  )
}

export default Invitaciones
