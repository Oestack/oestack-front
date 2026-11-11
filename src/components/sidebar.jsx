import { useState, useEffect, useRef, useCallback } from 'react'
import { Home, BriefcaseBusiness, Workflow, FolderKanban, Mail, PersonStanding } from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import SidebarItems from './sidebar-items.jsx'
import logoFull from '../assets/logo-negativo.webp'
import logoIcon from '../assets/pilas-light.png'

const mainNavigationItems = [
  { icon: Home, label: 'Inicio', href: '#inicio', id: 'inicio' },
  { icon: BriefcaseBusiness, label: 'Servicios', href: '#servicios', id: 'servicios' },
  { icon: Workflow, label: 'Proceso', href: '#proceso', id: 'proceso' },
  { icon: FolderKanban, label: 'Proyectos', href: '#proyectos', id: 'proyectos' },
  { icon: Mail, label: 'Contacto', href: '#contacto', id: 'contacto' },
]

function Sidebar({ onNavigateHome, currentPage = 'home' }) {
  const [activeSection, setActiveSection] = useState(
    currentPage === 'nosotros' ? 'nosotros' : currentPage === 'home' ? 'inicio' : '',
  )
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 53,
    opacity: 0,
    isHorizontal: false,
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef(null)
  const itemRefs = useRef({})
  const activeSectionRef = useRef(activeSection)

  const updateIndicator = useCallback((sectionId) => {
    const activeEl = itemRefs.current[sectionId]
    const navEl = navRef.current

    if (activeEl && navEl) {
      const isHorizontal = window.innerWidth <= 1024

      if (isHorizontal) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          top: activeEl.offsetTop,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          opacity: 1,
          isHorizontal: true,
        })

        // En pantallas angostas con scroll horizontal en el nav, mantener centrado el item activo
        const navWidth = navEl.clientWidth
        const itemLeft = activeEl.offsetLeft
        const itemWidth = activeEl.offsetWidth
        const targetScroll = itemLeft - (navWidth / 2) + (itemWidth / 2)
        if (Math.abs(navEl.scrollLeft - targetScroll) > 10) {
          navEl.scrollTo({ left: targetScroll, behavior: 'smooth' })
        }
      } else {
        setIndicatorStyle({
          left: 0,
          top: activeEl.offsetTop,
          width: activeEl.offsetWidth,
          height: activeEl.offsetHeight,
          opacity: 1,
          isHorizontal: false,
        })
      }
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [])

  useEffect(() => {
    activeSectionRef.current = activeSection
    const id = requestAnimationFrame(() => {
      updateIndicator(activeSection)
    })
    return () => cancelAnimationFrame(id)
  }, [activeSection, updateIndicator])

  useEffect(() => {
    // Las secciones (inicio, servicios, etc.) solo existen en la home:
    // en las páginas internas no se sigue el scroll para no marcar "Contacto" al llegar al fondo.
    if (currentPage !== 'home') return undefined

    const sectionIds = ['inicio', 'servicios', 'proceso', 'proyectos', 'contacto']

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const innerHeight = window.innerHeight

      // Llegó abajo de todo en la página -> activar Contacto
      if (scrollY + innerHeight >= scrollHeight - 70) {
        if (activeSectionRef.current !== 'contacto') {
          activeSectionRef.current = 'contacto'
          setActiveSection('contacto')
        }
        return
      }

      // Arriba de todo -> activar Inicio
      if (scrollY < 80) {
        if (activeSectionRef.current !== 'inicio') {
          activeSectionRef.current = 'inicio'
          setActiveSection('inicio')
        }
        return
      }

      // Use document coordinates so visual hover transforms cannot change the active item.
      const triggerPoint = innerHeight * 0.35
      const triggerDocumentPosition = scrollY + triggerPoint
      let currentSection = 'inicio'

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i])
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const sectionTop = rect.top + scrollY

        if (sectionTop <= triggerDocumentPosition) {
          currentSection = sectionIds[i]
        }
      }

      if (activeSectionRef.current !== currentSection) {
        activeSectionRef.current = currentSection
        setActiveSection(currentSection)
      }
    }

    const handleResize = () => {
      handleScroll()
      requestAnimationFrame(() => {
        updateIndicator(activeSectionRef.current)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [currentPage, updateIndicator])

  // Menú hamburguesa: se cierra con Escape o si la pantalla vuelve a tamaño escritorio
  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMenuOpen])

  const handleItemClick = (id, event) => {
    activeSectionRef.current = id
    setActiveSection(id)
    updateIndicator(id)

    setIsMenuOpen(false)

    if (id === 'inicio' && currentPage === 'home') {
      event.preventDefault()
      onNavigateHome()
    }
  }

  const navigationItems = currentPage !== 'home'
    ? mainNavigationItems.map((item) => ({ ...item, href: `/${item.href}` }))
    : mainNavigationItems

  return (
    <aside className="sidebar" aria-label="Navegación principal">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <a
            className="sidebar-logo"
            href={currentPage !== 'home' ? '/#inicio' : '#inicio'}
            onClick={(event) => handleItemClick('inicio', event)}
            aria-label="OESTACK - Ir al inicio"
          >
            {/* Escritorio: logo completo. Responsive: solo las pilas */}
            <img className="sidebar-logo-img sidebar-logo-img--full" src={logoFull} alt="" width="480" height="292" />
            <img className="sidebar-logo-img sidebar-logo-img--icon" src={logoIcon} alt="" width="128" height="130" />
          </a>
        </div>


        <nav className="sidebar-navigation" ref={navRef}>
          {/* Rail guía vertical / horizontal */}
          <div className="sidebar-nav-rail" aria-hidden="true" />

          {/* Indicador deslizante animado */}
          <div
            className={`sidebar-sliding-indicator ${indicatorStyle.isHorizontal ? 'sidebar-sliding-indicator--horizontal' : ''}`}
            style={{
              transform: indicatorStyle.isHorizontal
                ? `translate3d(${indicatorStyle.left}px, ${indicatorStyle.top}px, 0)`
                : `translate3d(0, ${indicatorStyle.top}px, 0)`,
              width: indicatorStyle.isHorizontal ? `${indicatorStyle.width}px` : undefined,
              height: `${indicatorStyle.height}px`,
              opacity: indicatorStyle.opacity,
            }}
            aria-hidden="true"
          >
            <div className="sidebar-sliding-bar" />
          </div>

          {navigationItems.map((item) => (
            <div
              key={item.label}
              ref={(el) => {
                itemRefs.current[item.id] = el
              }}
              className="sidebar-item-wrapper"
            >
              <SidebarItems
                {...item}
                active={activeSection === item.id}
                onClick={(event) => handleItemClick(item.id, event)}
              />
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <footer className="sidebar-footer">
          <nav className="sidebar-navigation sidebar-navigation--bottom" aria-label="Navegación secundaria">
            <SidebarItems
              icon={PersonStanding}
              label="Nosotros"
              shortLabel="Nosotros"
              href="/nosotros"
              active={currentPage === 'nosotros'}
            />
          </nav>
          <div className="sidebar-footer-social">
            <a
              className="sidebar-footer-social-link"
              href="https://www.instagram.com/oestack_/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de OESTACK"
            >
              <FaInstagram size={18} aria-hidden="true" />
            </a>
            <a
              className="sidebar-footer-social-link"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=oestack.solutions@gmail.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Enviar un mail a oestack.solutions@gmail.com"
            >
              <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
            </a>
            <a
              className="sidebar-footer-social-link"
              href="https://wa.me/5491178149507"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp +54 9 11 7814-9507"
            >
              <FaWhatsapp size={18} aria-hidden="true" />
            </a>
          </div>
          <p>Buenos Aires, Argentina</p>
          <p>© 2026</p>
        </footer>
      </div>

      {/* ===== Menú hamburguesa (solo responsive) ===== */}
      <button
        type="button"
        className={`mobile-menu-toggle${isMenuOpen ? ' is-open' : ''}`}
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu-panel"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="mobile-menu-toggle-line" />
        <span className="mobile-menu-toggle-line" />
        <span className="mobile-menu-toggle-line" />
      </button>

      <div
        className={`mobile-menu-backdrop${isMenuOpen ? ' is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setIsMenuOpen(false)}
      />

      <nav
        id="mobile-menu-panel"
        className={`mobile-menu-panel${isMenuOpen ? ' is-open' : ''}`}
        aria-label="Menú"
        inert={!isMenuOpen}
      >
        <ul className="mobile-menu-list">
          {[...navigationItems, { icon: PersonStanding, label: 'Nosotros', href: '/nosotros', id: 'nosotros' }].map((item, index) => {
            const isActive = item.id === 'nosotros' ? currentPage === 'nosotros' : activeSection === item.id
            const ItemIcon = item.icon
            return (
              <li key={item.id} className="mobile-menu-item" style={{ '--item-index': index }}>
                <a
                  className={`mobile-menu-link${isActive ? ' is-active' : ''}`}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => (item.id === 'nosotros' ? setIsMenuOpen(false) : handleItemClick(item.id, event))}
                >
                  <ItemIcon className="mobile-menu-link-icon" size={18} strokeWidth={1.7} aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="mobile-menu-footer" style={{ '--item-index': navigationItems.length + 1 }}>
          <p>Buenos Aires, Argentina</p>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
