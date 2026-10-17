function ProcessCard({ number, title, description, Icon }) {
  return (
    <article className="proceso-tarjeta">
      <div className="proceso-tarjeta-topline">
        <span className="proceso-tarjeta-numero">0{number}</span>
        <span className="proceso-tarjeta-icono-wrap">
          <Icon className="proceso-tarjeta-icono" size={22} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </div>
      <h3 className="proceso-tarjeta-titulo">{title}</h3>
      <p className="proceso-tarjeta-descripcion">{description}</p>
    </article>
  )
}

export default ProcessCard
