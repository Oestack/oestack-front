import { Code2, Database, PanelsTopLeft, TrendingUp } from 'lucide-react'
import sistemaImage from '../assets/sistema.png'
import sistemaImageTwo from '../assets/sistema2.png'
import Button from '../components/button.jsx'
import ServiceCard from '../components/service-card.jsx'
import WebsiteBenefits from '../components/website-benefits.jsx'

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

function SistemasAMedida() {
  const consultationHref = `https://wa.me/5491164889873?text=${encodeURIComponent('Hola, quiero consultar por un desarrollo personalizado')}`

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
      <aside className="sistemas-consultation">
        <div>
          <h2>Tu idea merece una solución propia.</h2>
          <p>Contanos qué necesitás resolver y diseñemos una herramienta que se adapte a tu forma de trabajar.</p>
        </div>
        <Button
          variant="yellow"
          href={consultationHref}
          target="_blank"
          rel="noreferrer"
          showTrailingIcon={false}
        >
          Contactanos
        </Button>
      </aside>
    </section>
  )
}

export default SistemasAMedida
