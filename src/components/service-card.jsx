import { Check } from 'lucide-react'
import Button from './button.jsx'

function ServiceCard({ service }) {
  const {
    title,
    description,
    price,
    includes = [],
    featured = false,
    badgeLabel = 'Más elegido',
    pricePrefix = 'DESDE',
    priceCurrency = 'ARS',
    priceNote,
    includesTitle = '¿Qué incluye?',
  } = service
  const consultMessage = `Hola, quiero consultar por el plan ${title}`
  const consultHref = `https://wa.me/5491164889873?text=${encodeURIComponent(consultMessage)}`

  return (
    <article className={`sitios-web-plan${featured ? ' sitios-web-plan--featured' : ''}`}>
      {badgeLabel && (
        <span
          className={`sitios-web-plan-badge${featured ? '' : ' sitios-web-plan-badge--placeholder'}`}
          aria-hidden={!featured}
        >
          {badgeLabel}
        </span>
      )}
      <div className="sitios-web-plan-heading">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="sitios-web-plan-price">
        {pricePrefix && <span>{pricePrefix}</span>}
        <div className="sitios-web-plan-price-amount">
          <strong>{price}</strong>
          {priceCurrency && <span>{priceCurrency}</span>}
        </div>
        {priceNote && <p className="sitios-web-plan-price-note">{priceNote}</p>}
      </div>
      <div className="sitios-web-plan-includes">
        <h3>{includesTitle}</h3>
        <ul>
          {includes.map((item) => (
            <li key={item}>
              <Check size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant="yellow"
        href={consultHref}
        target="_blank"
        rel="noreferrer"
        showTrailingIcon={false}
      >
        Hablemos de tu proyecto
      </Button>
    </article>
  )
}

export default ServiceCard
