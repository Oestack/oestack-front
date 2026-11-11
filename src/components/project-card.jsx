import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Button from './button.jsx'

function ProjectCard({
  number,
  title = 'Lorem Ipsum',
  description,
  image,
  imageAlt,
  imageContain = false,
  imageCompact = false,
  imageTone = 'teal',
  demoHref,
  demoLabel = 'Ver demo',
  subtitle,
  reverse = false,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileExpanded, setIsMobileExpanded] = useState(false)

  return (
    <article
      className={`project-card ${reverse ? 'project-card--reverse' : ''} ${isHovered ? 'project-card--hovered' : ''}`}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsHovered(false)
        }
      }}
    >
      <div
        className="project-card-media-col"
        tabIndex={0}
        role="region"
        aria-label={`Proyecto ${number}: ${title}`}
      >
        <span className="project-card-number">{number}</span>
        <div className={`project-card-image-box${imageContain ? ` project-card-image-box--${imageTone}` : ''}`}>
          <img
            src={image}
            alt={imageAlt || title}
            className={`project-card-image${imageContain ? ' project-card-image--contain' : ''}${imageCompact ? ' project-card-image--compact' : ''}`}
            draggable="false"
            loading="lazy"
            decoding="async"
          />
        </div>
        <button
          type="button"
          className={`project-card-mobile-toggle${isMobileExpanded ? ' is-expanded' : ''}`}
          aria-label={`${isMobileExpanded ? 'Ocultar' : 'Mostrar'} información de ${title}`}
          aria-expanded={isMobileExpanded}
          onClick={() => setIsMobileExpanded((expanded) => !expanded)}
        >
          <ChevronDown size={22} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
      <div
        className={`project-card-info-col${isMobileExpanded ? ' is-mobile-expanded' : ''}`}
        aria-hidden={!isHovered && !isMobileExpanded}
      >
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">
          {subtitle && <strong className="project-card-subtitle">{subtitle}</strong>}
          {description}
        </p>
        {demoHref && (
          <div className="project-card-demo-action">
            <Button variant="yellow" href={demoHref}>
              {demoLabel}
            </Button>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
