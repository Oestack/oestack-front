import { ArrowRight } from 'lucide-react'

function MobileServiceList({ services }) {
  const serviceRows = services.flatMap((service) => {
    if (service.id === 'landing') {
      return [{
        id: 'sitios-web',
        title: 'Sitios Web',
        description: service.description,
        href: '/sitios-web',
      }]
    }

    if (service.id === 'ecommerce') {
      return [{
        id: 'tienda-online',
        title: 'Tienda Online',
        description: service.description,
        href: '/tienda-online',
      }]
    }

    if (service.id === 'software') {
      return [{
        id: 'software-a-medida',
        title: 'Software a Medida',
        description: service.description,
        href: '/sistemas-a-medida',
      }]
    }

    if (service.id === 'menu-qr') {
      return [{
        id: 'menu-digital',
        title: 'Menú Digital',
        description: service.description,
        href: '/menu-digital',
      }]
    }

    if (service.id === 'invitaciones') {
      return [{
        id: 'invitaciones-digitales',
        title: 'Invitaciones Digitales',
        description: service.description,
        href: '/invitaciones',
      }]
    }

    return [{
      id: service.id,
      title: service.title,
      description: service.description,
      href: service.href,
    }]
  })

  return (
    <div className="mobile-service-list" aria-label="Listado de servicios">
      {serviceRows.map((service) => (
        <a className="mobile-service-row" href={service.href} key={service.id}>
          <span className="mobile-service-row-title">{service.title}</span>
          <span className="mobile-service-row-description">{service.description}</span>
          <ArrowRight className="mobile-service-row-icon" size={20} strokeWidth={1.8} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

export default MobileServiceList
