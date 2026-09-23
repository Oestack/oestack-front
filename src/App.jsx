import Sidebar from './components/sidebar.jsx'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content" aria-label="Contenido principal" />
    </div>
  )
}

export default App
