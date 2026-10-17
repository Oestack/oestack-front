import { useState } from 'react'
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
  reverse = false,
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className={`project-card ${reverse ? 'project-card--reverse' : ''} ${isHovered ? 'project-card--hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          />
        </div>
      </div>
      <div className="project-card-info-col" aria-hidden={!isHovered}>
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
        {demoHref && (
          <div className="project-card-demo-action">
            <Button variant="yellow" href={demoHref}>
              Ver demo
            </Button>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
