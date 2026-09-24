function ProjectCard({
  number,
  title = 'Lorem Ipsum',
  description,
  image,
  imageAlt,
  reverse = false,
}) {
  return (
    <article className={`project-card ${reverse ? 'project-card--reverse' : ''}`}>
      <div className="project-card-media-col">
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
      <div className="project-card-info-col">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
      </div>
    </article>
  )
}

export default ProjectCard
