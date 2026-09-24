import { Home, BriefcaseBusiness, Users, FolderKanban, Mail } from 'lucide-react'
import SidebarItems from './sidebar-items.jsx'

const navigationItems = [
  { icon: Home, label: 'Inicio', href: '#inicio', active: true },
  { icon: BriefcaseBusiness, label: 'Servicios', href: '#servicios' },
  { icon: Users, label: 'Nosotros', href: '#nosotros' },
  { icon: FolderKanban, label: 'Proyectos', href: '#proyectos' },
  { icon: Mail, label: 'Contacto', href: '#contacto' },
]

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Navegación principal">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <a className="sidebar-logo" href="#inicio">OESTACK</a>
        </div>

        <a
          className="sidebar-github"
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="OESTACK en GitHub"
        >
          <svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#ffff" d="M12 .297a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 6.004 0c2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.48 5.921.43.37.814 1.103.814 2.222v3.293c0 .32.216.694.825.576A12.002 12.002 0 0 0 12 .297Z" />
          </svg>
        </a>

        <nav className="sidebar-navigation">
          {navigationItems.map((item) => (
            <SidebarItems key={item.label} {...item} />
          ))}
        </nav>
      </div>

      <footer className="sidebar-footer">
        <p className="sidebar-footer-brand">OESTACK</p>
        <p>Buenos Aires, Argentina</p>
        <p>© 2025</p>
      </footer>
    </aside>
  )
}

export default Sidebar
