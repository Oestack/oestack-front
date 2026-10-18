import { Check } from 'lucide-react'
import Button from './button.jsx'

function ServiceCard({ service }) {
  const { title, description, price, includes = [], featured = false } = service
  const consultMessage = `Hola, quiero consultar por el plan ${title}`
  const consultHref = `https://wa.me/5491164889873?text=${encodeURIComponent(consultMessage)}`

  return (
    <article className={`sitios-web-plan${featured ? ' sitios-web-plan--featured' : ''}`}>
      <span
        className={`sitios-web-plan-badge${featured ? '' : ' sitios-web-plan-badge--placeholder'}`}
        aria-hidden={!featured}
      >
        Más elegido
      </span>
      <div className="sitios-web-plan-heading">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="sitios-web-plan-price">
        <span>DESDE</span>
        <div className="sitios-web-plan-price-amount">
          <strong>{price}</strong>
          <span>ARS</span>
        </div>
      </div>
      <div className="sitios-web-plan-includes">
        <h3>¿Qué incluye?</h3>
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
        Consultar
      </Button>
    </article>
  )
}

export default ServiceCard
