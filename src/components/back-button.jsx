import { ArrowLeft } from 'lucide-react'

function BackButton() {
  const handleClick = (event) => {
    // Si se llegó desde el mismo sitio, volver a la página anterior (la home restaura su scroll).
    // Si se entró directo por link, ir al inicio.
    const cameFromSameSite = document.referrer.startsWith(window.location.origin)
    if (cameFromSameSite && window.history.length > 1) {
      event.preventDefault()
      window.history.back()
    }
  }

  return (
    <a className="back-button" href="/" onClick={handleClick}>
      <ArrowLeft size={20} strokeWidth={2} aria-hidden="true" />
      <span>Volver</span>
    </a>
  )
}

export default BackButton
