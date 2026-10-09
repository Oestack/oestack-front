import { useState, useEffect, useRef, useCallback } from 'react'
import { Home, BriefcaseBusiness, Users, FolderKanban, Mail, CircleHelp } from 'lucide-react'
import SidebarItems from './sidebar-items.jsx'

const mainNavigationItems = [
  { icon: Home, label: 'Inicio', href: '#inicio', id: 'inicio' },
  { icon: BriefcaseBusiness, label: 'Servicios', href: '#servicios', id: 'servicios' },
  { icon: FolderKanban, label: 'Proyectos', href: '#proyectos', id: 'proyectos' },
  { icon: Users, label: 'Nosotros', href: '#nosotros', id: 'nosotros' },
  { icon: Mail, label: 'Contacto', href: '#contacto', id: 'contacto' },
]

function Sidebar({ onOpenFaq, isFaqOpen = false }) {
  const [activeSection, setActiveSection] = useState('inicio')
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 53,
    opacity: 0,
    isHorizontal: false,
  })
  const navRef = useRef(null)
  const itemRefs = useRef({})

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
    const id = requestAnimationFrame(() => {
      updateIndicator(activeSection)
    })
    return () => cancelAnimationFrame(id)
  }, [activeSection, updateIndicator])

  useEffect(() => {
    const sectionIds = ['inicio', 'servicios', 'proyectos', 'nosotros', 'contacto']

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const innerHeight = window.innerHeight

      // Llegó abajo de todo en la página -> activar Contacto
      if (scrollY + innerHeight >= scrollHeight - 70) {
        setActiveSection('contacto')
        return
      }

      // Arriba de todo -> activar Inicio
      if (scrollY < 80) {
        setActiveSection('inicio')
        return
      }

      // Medir posición de cada sección respecto a la ventana
      const triggerPoint = innerHeight * 0.35
      let currentSection = 'inicio'

      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i])
        if (!el) continue
        const rect = el.getBoundingClientRect()

        if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
          currentSection = sectionIds[i]
          break
        } else if (rect.top <= triggerPoint) {
          currentSection = sectionIds[i]
        }
      }

      setActiveSection(currentSection)
    }

    const handleResize = () => {
      handleScroll()
      requestAnimationFrame(() => {
        updateIndicator(activeSection)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [activeSection, updateIndicator])

  const handleItemClick = (id) => {
    setActiveSection(id)
    updateIndicator(id)
  }

  return (
    <aside className="sidebar" aria-label="Navegación principal">
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <a className="sidebar-logo" href="#inicio" onClick={() => handleItemClick('inicio')}>
            OESTACK
          </a>
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
            <div className="sidebar-sliding-glow" />
          </div>

          {mainNavigationItems.map((item) => (
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
                onClick={() => handleItemClick(item.id)}
              />
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <nav className="sidebar-navigation sidebar-navigation--bottom" aria-label="Navegación secundaria">
          <SidebarItems
            icon={CircleHelp}
            label="Preguntas Frecuentes"
            shortLabel="FAQ"
            active={isFaqOpen}
            onClick={onOpenFaq}
          />
        </nav>

        <footer className="sidebar-footer">
          <p className="sidebar-footer-brand">OESTACK</p>
          <p>Buenos Aires, Argentina</p>
          <p>© 2025</p>
        </footer>
      </div>
    </aside>
  )
}

export default Sidebar
