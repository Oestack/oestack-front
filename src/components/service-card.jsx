import { ArrowRight } from 'lucide-react'

function ServiceCard({ service, isActive, onSelect }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect()
    }
  }

  return (
    <article
      className={`service-card ${isActive ? 'service-card--active' : ''}`}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      aria-label={`Servicio: ${service.title}`}
      onKeyDown={handleKeyDown}
    >
      <div className="service-card-media">
        <img
          src={service.image}
          alt={service.title}
          className="service-card-image"
          draggable="false"
        />
      </div>
      <div className="service-card-content">
        <div className="service-card-heading">
          <h3 className="service-card-title">{service.title}</h3>
        </div>
        <p className="service-card-description">{service.description}</p>
        <div className="service-card-footer">
          <span className="service-card-link">
            Conocer más
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  )
}

export default ServiceCard
