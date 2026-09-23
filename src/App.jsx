import Sidebar from './components/sidebar.jsx'
import Button from './components/button.jsx'
import './App.css'

function App() {
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
        </section>
      </main>
    </div>
  )
}

export default App
