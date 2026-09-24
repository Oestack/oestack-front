import { useState } from 'react'

function ProjectCard({
  number,
  title = 'Lorem Ipsum',
  description,
  image,
  imageAlt,
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
        <div className="project-card-image-box">
          <img
            src={image}
            alt={imageAlt || title}
            className="project-card-image"
            draggable="false"
          />
        </div>
      </div>
      <div className="project-card-info-col" aria-hidden={!isHovered}>
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
      </div>
    </article>
  )
}

export default ProjectCard
