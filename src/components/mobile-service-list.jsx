import { ArrowRight } from 'lucide-react'

function MobileServiceList({ services }) {
  const serviceRows = services.flatMap((service) => (
    service.featureCards?.length
      ? service.featureCards.map((feature) => ({
        id: `${service.id}-${feature.title}`,
        title: feature.title,
        description: feature.description,
        href: service.href,
      }))
      : [{
        id: service.id,
        title: service.title,
        description: service.description,
        href: service.href,
      }]
  ))

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
