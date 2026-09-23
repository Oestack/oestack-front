import { useState } from 'react'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import Sidebar from './components/sidebar.jsx'
import Button from './components/button.jsx'
import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'
import './App.css'

function App() {
  const [activeImage, setActiveImage] = useState(0)
  const images = [img1, img2, img3]
  const imagePositions = [
    [88, 209, -33],
    [-33, 88, 209],
    [209, -33, 88],
  ]

  const moveCarousel = (direction) => {
    setActiveImage((current) => (current + direction + images.length) % images.length)
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content" aria-label="Contenido principal">
        <div className="hero-top-rule" aria-hidden="true" />
        <section className="hero-container" aria-label="Presentación">
          <div className="hero-actions">
            <Button variant="dark">Contactanos</Button>
          </div>
          <div className="hero-copy">
            <p className="hero-kicker">Estudio de soluciones tecnológicas</p>
            <h1 className="hero-title">
              <span className="hero-title-lead">Vos imaginás,</span>
              <br />
              <span className="hero-title-accent">
                nosotros hacemos que
                <br />
                funcione.
              </span>
            </h1>
            <p className="hero-description">
              Desarrollamos sitios web, software y soluciones digitales para resolver problemas reales
            </p>
            <Button variant="yellow" href="#servicios">Ver servicios</Button>
          </div>
          <div className="hero-carousel" aria-label="Carrusel de proyectos">
            <div className="carousel-stage">
              {images.map((image, index) => {
                const position = (index - activeImage + images.length) % images.length
                const centeredShadow = activeImage === 1 && index === 1
                  ? ' carousel-image--centered-shadow'
                  : ''

                return (
                  <img
                    key={image}
                    className={`carousel-image carousel-image--${['active', 'next', 'previous'][position]}${centeredShadow}`}
                    src={image}
                    alt={`Proyecto destacado ${index + 1}`}
                    draggable="false"
                    style={{
                      left: `${imagePositions[activeImage][index]}px`,
                      zIndex: 3 - position,
                    }}
                  />
                )
              })}
            </div>
            <div className="carousel-controls">
              <button type="button" aria-label="Imagen anterior" onClick={() => moveCarousel(-1)}>
                <CircleArrowLeft size={25} strokeWidth={2} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Imagen siguiente" onClick={() => moveCarousel(1)}>
                <CircleArrowRight size={25} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>
        <div className="hero-bottom-rule" aria-hidden="true" />
      </main>
    </div>
  )
}

export default App
