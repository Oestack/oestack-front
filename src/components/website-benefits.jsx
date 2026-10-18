import Button from './button.jsx'

function WebsiteBenefits({ benefits, images, primaryAction, secondaryAction }) {
  return (
    <div className="website-benefits">
      <div className="website-benefits-card">
        {benefits.map(({ title, description, Icon }) => (
          <article className="website-benefit" key={title}>
            <Icon className="website-benefit-icon" size={34} strokeWidth={1.7} aria-hidden="true" />
            <div className="website-benefit-copy">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
        <div className="website-benefits-actions">
          <Button
            variant={primaryAction.variant ?? 'yellow'}
            href={primaryAction.href}
            target={primaryAction.target}
            rel={primaryAction.rel}
          >
            {primaryAction.label}
          </Button>
          <Button
            variant={secondaryAction.variant ?? 'dark'}
            href={secondaryAction.href}
            target={secondaryAction.target}
            rel={secondaryAction.rel}
          >
            {secondaryAction.label}
          </Button>
        </div>
      </div>
      <div
        className="website-benefits-image"
        style={{ gridTemplateRows: `repeat(${images.length}, minmax(0, 1fr))` }}
      >
        {images.map(({ src, alt, objectPosition = 'center' }, index) => (
          <div className="website-benefits-image-slot" key={`${src}-${index}`}>
            <img src={src} alt={alt} style={{ objectPosition }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default WebsiteBenefits
