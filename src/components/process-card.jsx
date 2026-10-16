function ProcessCard({ title, description, Icon }) {
  return (
    <article className="proceso-tarjeta">
      <h3 className="proceso-tarjeta-titulo">
        <Icon className="proceso-tarjeta-icono" size={22} strokeWidth={1.8} aria-hidden="true" />
        <span>{title}</span>
      </h3>
      <p className="proceso-tarjeta-descripcion">{description}</p>
    </article>
  )
}

export default ProcessCard
