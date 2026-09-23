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
          <Button variant="dark">Contactanos</Button>
        </section>
      </main>
    </div>
  )
}

export default App
