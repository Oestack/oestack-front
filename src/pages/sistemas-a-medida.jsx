import { Code2, Database, PanelsTopLeft, TrendingUp } from 'lucide-react'
import sistemaImage from '../assets/sistema.webp'
import sistemaImageTwo from '../assets/sistema2.webp'
import ServiceCard from '../components/service-card.jsx'
import WebsiteBenefits from '../components/website-benefits.jsx'
import Faq from '../components/faq.jsx'

const customSoftwareBenefits = [
  {
    title: 'Desarrollo a medida',
    description: 'Diseñamos funcionalidades según los procesos y objetivos de tu negocio, sin depender de soluciones genéricas.',
    Icon: Code2,
  },
  {
    title: 'Procesos más simples',
    description: 'Automatizamos tareas y organizamos flujos de trabajo para reducir operaciones manuales y facilitar la gestión diaria.',
    Icon: PanelsTopLeft,
  },
  {
    title: 'Información organizada',
    description: 'Centralizamos datos y operaciones para que puedas consultar y administrar la información desde un mismo lugar.',
    Icon: Database,
  },
  {
    title: 'Preparado para crecer',
    description: 'Desarrollamos soluciones que pueden evolucionar con tu negocio, incorporando nuevas funcionalidades según las necesidades futuras.',
    Icon: TrendingUp,
  },
]

const customSoftwarePlan = {
  title: 'Desarrollo Personalizado',
  description: 'Desarrollamos sistemas y aplicaciones web según los requerimientos, las funcionalidades y los objetivos de cada proyecto.',
  price: 'A cotizar',
  featured: true,
  badgeLabel: null,
  pricePrefix: null,
  priceCurrency: null,
  includesTitle: '¿Qué podemos desarrollar?',
  includes: [
    'Sistemas de gestión para negocios.',
    'Paneles administrativos y dashboards.',
    'Plataformas con usuarios, roles y permisos.',
    'Gestión de turnos, reservas y solicitudes.',
    'Automatización de procesos e integración de servicios.',
    'Aplicaciones web con funcionalidades específicas.',
  ],
}

const customSoftwareFaqQuestions = [
  {
    question: '¿Por qué elegir un desarrollo a medida en lugar de un software comercial enlatado?',
    description: 'Un software enlatado te obliga a adaptar tus procesos de negocio a sus limitaciones o pagar licencias costosas por funciones que no usás. Un desarrollo a medida se programa exactamente según la operativa, flujos y requerimientos de tu empresa, garantizando propiedad intelectual sobre el sistema, flexibilidad total y alta escalabilidad.',
  },
  {
    question: '¿Cómo garantizan que el sistema final cumpla con nuestras expectativas?',
    description: 'Implementamos metodologías ágiles (Scrum). Antes de escribir código, realizamos un relevamiento profundo y creamos wireframes y prototipos navegables en UX/UI. Luego, desarrollamos en sprints iterativos donde probás módulos funcionales cada 2 semanas y ajustamos sobre la marcha.',
  },
  {
    question: '¿El software puede integrarse con los sistemas que ya utilizamos hoy?',
    description: 'Sí, desarrollamos e integramos APIs (Application Programming Interfaces) robustas y seguras para conectar tu nuevo software con sistemas existentes como ERPs (SAP, Tango, Zoho), CRMs, facturación electrónica (AFIP / entes fiscales), gateways de pago o bases de datos previas.',
  },
  {
    question: '¿A quién pertenece el código fuente y la propiedad intelectual?',
    description: 'La propiedad intelectual y el 100% del código fuente son de tu empresa una vez finalizado y abonado el proyecto. Entregamos el repositorio documentado para que no tengas ninguna dependencia forzosa de terceros (vendor lock-in).',
  },
  {
    question: '¿Qué tipo de soporte y mantenimiento brindan post-lanzamiento?',
    description: 'Ofrecemos un período de garantía post-deploy para corrección de desvíos, seguido de planes de mantenimiento correctivo, preventivo y evolutivo (SLA) para asegurar actualizaciones de seguridad, respaldos de servidor y nuevas funcionalidades a medida que tu negocio crezca.',
  },
]

function SistemasAMedida() {
  return (
    <section className="projects-section projects-section--visible sitios-web-page" aria-labelledby="sistemas-title">
      <h1 className="sitios-web-title" id="sistemas-title">
        Sistemas y Aplicaciones Web
      </h1>
      <p className="projects-subtitle sitios-web-subtitle">
        <span className="projects-subtitle-lead">Ideas que</span>
        <span className="projects-subtitle-accent">se hacen sistema.</span>
      </p>
      <WebsiteBenefits
        benefits={customSoftwareBenefits}
        images={[
          {
            src: sistemaImage,
            alt: 'Vista de un sistema web en una computadora',
            objectPosition: 'center',
          },
          {
            src: sistemaImageTwo,
            alt: 'Vista de una segunda aplicación web',
            objectPosition: 'center',
          },
        ]}
      />
      <section className="sitios-web-plans sistemas-plan" aria-label="Desarrollo personalizado">
        <ServiceCard service={customSoftwarePlan} />
      </section>
      <Faq id="preguntas-frecuentes-sistemas" questions={customSoftwareFaqQuestions} animateOnView />
    </section>
  )
}

export default SistemasAMedida
