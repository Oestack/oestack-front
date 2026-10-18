import Button from './button.jsx'

function IPhoneCard({
  title,
  description,
  featureCards = [],
  logo = null,
  buttonText = 'Conocer más',
  buttonHref = '#contacto',
  onButtonClick,
  onSelect,
  isActive = false,
  children = null,
}) {
  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && onSelect) {
      event.preventDefault()
      onSelect()
    }
  }

  const handleButtonClick = (event) => {
    event.stopPropagation()
    onButtonClick?.()
  }

  return (
    <article
      className={`iphone-card${isActive ? ' iphone-card--active' : ''}`}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`Servicio: ${title}`}
    >
      <div className="iphone-card-island" aria-hidden="true">
        <span className="iphone-card-camera" />
        <span className="iphone-card-sensor" />
      </div>

      <div className="iphone-card-screen">
        {logo && <div className="iphone-card-logo">{logo}</div>}

        <div className="iphone-card-heading">
          <h3>{title}</h3>
        </div>


        {(featureCards.length > 0 || children) && (
          <div className="iphone-card-extra">
            {featureCards.map((feature) => (
              <article className="iphone-card-feature" key={feature.title}>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
                <div className="iphone-card-feature-tags">
                  {feature.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
            {children}
          </div>
        )}
      </div>

      <div className="iphone-card-cta">
        <Button
          variant="yellow"
          href={buttonHref}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>

      <div className="iphone-card-home-indicator" aria-hidden="true" />
    </article>
  )
}

export default IPhoneCard
