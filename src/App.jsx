import { useState, useRef, useEffect } from 'react'
import {
  CircleArrowLeft,
  CircleArrowRight,
  ChevronDown,
  FileText,
  MessageCircle,
  Mail,
  PanelsTopLeft,
  Code2,
  MonitorCheck,
} from 'lucide-react'
import Sidebar from './components/sidebar.jsx'
import Button from './components/button.jsx'
import ProjectCard from './components/project-card.jsx'
import ProcessCard from './components/process-card.jsx'
import IPhoneCard from './components/iphone-card.jsx'
import MobileServiceList from './components/mobile-service-list.jsx'
import Faq from './components/faq.jsx'
import Nosotros from './pages/nosotros.jsx'
import SitiosWeb from './pages/sitios-web.jsx'
import TiendaOnline from './pages/tienda-online.jsx'
import SistemasAMedida from './pages/sistemas-a-medida.jsx'
import MenuDigital from './pages/menu.jsx'
import Invitaciones from './pages/invitaciones.jsx'
import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'
import logoOllaVegana from './assets/logo_olla_vegana.png'
import whatsappIcon from './assets/whatsapp.png'
import heroImg from './assets/hero.png'
import './App.css'

const servicesData = [
  {
    id: 'landing',
    title: 'Landing Page y Web Institucionales',
    description: 'Una presencia digital clara, profesional y optimizada para mostrar tu propuesta y convertir visitas en consultas.',
    image: img1,
    href: '/sitios-web',
    featureCards: [
      {
        title: 'Landing Page',
        description: 'Páginas de aterrizaje enfocadas en captar clientes potenciales con llamadas a la acción claras.',
        tags: ['Diseño Responsive', 'Carga Ultra Rápida'],
      },
      {
        title: 'Web Institucional',
        description: 'Sitios corporativos completos que transmiten solidez, profesionalismo y confianza a tu audiencia.',
        tags: ['Secciones a Medida', 'SEO Optimizado'],
      },
    ],
  },
  {
    id: 'ecommerce',
    title: 'Tienda Online',
    description: 'Tu tienda online lista para vender, gestionar productos y ofrecer una experiencia de compra simple y confiable.',
    image: img3,
    href: '/tienda-online',
    featureCards: [
      {
        title: 'Tienda Online',
        description: 'Una experiencia de compra clara para que tus clientes encuentren y elijan tus productos fácilmente.',
        tags: ['Catálogo Dinámico', 'Diseño Responsive'],
      },
      {
        title: 'Gestión de Ventas',
        description: 'Herramientas para administrar pedidos, productos y pagos desde un mismo lugar.',
        tags: ['Medios de Pago', 'Control de Stock'],
      },
    ],
  },
  {
    id: 'software',
    title: 'Software a Medida',
    description: 'Herramientas digitales y plataformas diseñadas para ordenar, automatizar y hacer crecer la operación de tu negocio.',
    image: img2,
    href: '#contacto',
    featureCards: [
      {
        title: 'Sistemas Web',
        description: 'Herramientas digitales pensadas para centralizar la información y simplificar el trabajo diario.',
        tags: ['Procesos a Medida', 'Acceso Seguro'],
      },
      {
        title: 'Software a Medida',
        description: 'Plataformas escalables que se adaptan a la lógica y los objetivos específicos de tu negocio.',
        tags: ['Integraciones', 'Datos Centralizados'],
      },
    ],
  },
  {
    id: 'menu-qr',
    title: 'Menú Digital',
    description: 'Un menú digital accesible desde cualquier dispositivo, acompañado por una web simple para presentar tu propuesta.',
    image: heroImg,
    href: '#contacto',
    featureCards: [
      {
        title: 'Menú QR',
        description: 'Tus clientes acceden a la carta de forma rápida desde cualquier celular, sin descargar aplicaciones.',
        tags: ['Acceso Instantáneo', 'Actualización Simple'],
      },
      {
        title: 'Web Gastronómica',
        description: 'Una presencia digital atractiva para mostrar tu propuesta, ubicación y canales de contacto.',
        tags: ['Información Clara', 'Diseño Atractivo'],
      },
    ],
  },
  {
    id: 'invitaciones',
    title: 'Invitaciones',
    description: 'Invitaciones digitales únicas para celebrar tus momentos importantes con una experiencia hecha a tu medida.',
    image: img1,
    href: '/invitaciones',
    featureCards: [
      {
        title: 'Diseño Personalizado',
        description: 'Una invitación digital creada especialmente para reflejar el estilo de tu celebración.',
        tags: ['Estilo Único', 'Diseño Responsive'],
      },
      {
        title: 'Experiencia Interactiva',
        description: 'Compartí todos los detalles del evento en una experiencia simple y especial.',
        tags: ['Galería y Mapas', 'Confirmación Online'],
      },
    ],
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento y Optimización',
    description: 'Mejoras, ajustes y soporte técnico para mantener tu producto actualizado, rápido y funcionando de forma confiable.',
    image: img2,
    href: `https://wa.me/5491178149507?text=${encodeURIComponent('Buenas equipo de Oestack, quisiera consultar por el servicio de mantenimiento y optimización...')}`,
    featureCards: [
      {
        title: 'Mantenimiento',
        description: 'Mantenemos tu sitio actualizado, estable y preparado para acompañar el crecimiento de tu proyecto.',
        tags: ['Actualizaciones', 'Backups'],
      },
      {
        title: 'Optimización',
        description: 'Detectamos oportunidades de mejora para que tu producto funcione cada vez mejor.',
        tags: ['Más Velocidad', 'Soporte Continuo'],
      },
    ],
  },
]

const processStages = [
  {
    title: 'Relevamiento',
    description: 'Entendemos tus necesidades, analizamos tu negocio y definimos el alcance del proyecto.',
    Icon: FileText,
  },
  {
    title: 'Diseño',
    description: 'Diseñamos la estructura y creamos un prototipo para validar la solución antes de desarrollarla.',
    Icon: PanelsTopLeft,
  },
  {
    title: 'Desarrollo',
    description: 'Programamos, probamos y ajustamos cada funcionalidad con tu feedback.',
    Icon: Code2,
  },
  {
    title: 'Implementación',
    description: 'Publicamos la solución, verificamos su funcionamiento y te acompañamos con soporte y mejoras.',
    Icon: MonitorCheck,
  },
]

function App() {
  const isNosotrosPage = window.location.pathname.replace(/\/+$/, '') === '/nosotros'
  const isSitiosWebPage = window.location.pathname.replace(/\/+$/, '') === '/sitios-web'
  const isTiendaOnlinePage = window.location.pathname.replace(/\/+$/, '') === '/tienda-online'
  const isSistemasAMedidaPage = window.location.pathname.replace(/\/+$/, '') === '/sistemas-a-medida'
  const isMenuDigitalPage = window.location.pathname.replace(/\/+$/, '') === '/menu-digital'
  const isInvitacionesPage = window.location.pathname.replace(/\/+$/, '') === '/invitaciones'

  // Servicios Carousel State
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeCard, setActiveCard] = useState(0)
  const [isServicesHovered, setIsServicesHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false)
  const [selectedProjectType, setSelectedProjectType] = useState('')
  const [contactValue, setContactValue] = useState('')
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [contactSubmitMessage, setContactSubmitMessage] = useState('')
  const [hasProcessSectionEntered, setHasProcessSectionEntered] = useState(false)
  const [hasProjectsSectionEntered, setHasProjectsSectionEntered] = useState(false)
  const [hasContactSectionEntered, setHasContactSectionEntered] = useState(false)
  const [activeProjectSlide, setActiveProjectSlide] = useState(0)
  const [isWhatsappStopped, setIsWhatsappStopped] = useState(false)
  const [whatsappFooterHeight, setWhatsappFooterHeight] = useState(0)
  const [heroAnimationKey, setHeroAnimationKey] = useState(0)
  const heroAreaRef = useRef(null)
  const heroHasFadedOutRef = useRef(false)
  const servicesSectionRef = useRef(null)
  const processSectionRef = useRef(null)
  const projectsSectionRef = useRef(null)
  const projectsTrackRef = useRef(null)
  const contactSectionRef = useRef(null)
  const pageFooterRef = useRef(null)
  const whatsappContactRef = useRef(null)
  const projectTypeSelectRef = useRef(null)
  const contactInputRef = useRef(null)
  const handleNavigateHome = () => {
    if (window.scrollY < 10) {
      heroHasFadedOutRef.current = false
      setHeroAnimationKey((key) => key + 1)
    } else {
      heroHasFadedOutRef.current = true
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!projectTypeSelectRef.current?.contains(event.target)) {
        setIsProjectTypeOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsProjectTypeOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const processSection = processSectionRef.current
    if (!processSection) return

    const observer = new IntersectionObserver(([entry]) => {
      setHasProcessSectionEntered(entry.isIntersecting)
    }, { threshold: 0.15 })

    observer.observe(processSection)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const projectsSection = projectsSectionRef.current
    if (!projectsSection) return

    const observer = new IntersectionObserver(([entry]) => {
      setHasProjectsSectionEntered(entry.isIntersecting)
    }, { threshold: 0.15 })

    observer.observe(projectsSection)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const contactSection = contactSectionRef.current
    if (!contactSection) return

    const observer = new IntersectionObserver(([entry]) => {
      setHasContactSectionEntered(entry.isIntersecting)
    }, { threshold: 0.15 })

    observer.observe(contactSection)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const footer = pageFooterRef.current
    if (!footer || !whatsappContactRef.current) return undefined

    const updateWhatsappPosition = () => {
      if (window.innerWidth > 1024) {
        setIsWhatsappStopped(false)
        return
      }

      const footerTop = footer.getBoundingClientRect().top
      const shouldStop = footerTop < window.innerHeight
      setIsWhatsappStopped(shouldStop)
      if (shouldStop) {
        setWhatsappFooterHeight(footer.offsetHeight)
      }
    }

    updateWhatsappPosition()
    window.addEventListener('scroll', updateWhatsappPosition, { passive: true })
    window.addEventListener('resize', updateWhatsappPosition)

    return () => {
      window.removeEventListener('scroll', updateWhatsappPosition)
      window.removeEventListener('resize', updateWhatsappPosition)
    }
  }, [])

  const openGmailComposer = (event) => {
    event.preventDefault()

    const width = 520
    const height = 650
    const left = Math.round((window.screen.width - width) / 2)
    const top = Math.round((window.screen.height - height) / 2)
    const features = `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`

    window.open(
      'https://mail.google.com/mail/?view=cm&fs=1&to=oestack.solutions@gmail.com',
      'oestack-gmail-compose',
      features,
    )
  }

  const handleContactRequestSubmit = async (event) => {
    event.preventDefault()
    if (isContactSubmitting) return

    if (!contactValue.trim() || !selectedProjectType) {
      setContactSubmitMessage('Completá tus datos y seleccioná el tipo de proyecto.')
      if (!contactValue.trim()) contactInputRef.current?.focus()
      else projectTypeSelectRef.current?.querySelector('button')?.focus()
      return
    }

    setIsContactSubmitting(true)
    setContactSubmitMessage('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/oestack.solutions@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          contact: contactValue.trim(),
          projectType: selectedProjectType,
          message: `Contacto: ${contactValue.trim()}\nTipo de proyecto: ${selectedProjectType}`,
          _subject: 'Solicitud de contacto desde Oestack',
        }),
      })
      const result = await response.json()

      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error('No se pudo enviar la solicitud.')
      }

      setContactSubmitMessage('¡Listo! Recibimos tus datos y nos pondremos en contacto.')
      setContactValue('')
      setSelectedProjectType('')
    } catch {
      setContactSubmitMessage('No se pudo enviar la solicitud. Probá de nuevo en unos minutos.')
    } finally {
      setIsContactSubmitting(false)
    }
  }

  useEffect(() => {
    let animationFrame = null

    const updateHeroOpacity = () => {
      if (animationFrame !== null) return

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null
        const heroArea = heroAreaRef.current
        const servicesSection = servicesSectionRef.current
        if (!heroArea || !servicesSection) return

        const servicesTop = servicesSection.getBoundingClientRect().top
        const fadeProgress = Math.min(1, Math.max(0, servicesTop / (window.innerHeight * 0.85)))
        heroArea.style.opacity = String(fadeProgress ** 2.2)
        heroArea.style.transform = `translateY(${(1 - fadeProgress) * 8}px) scale(${0.985 + fadeProgress * 0.015})`

        if (fadeProgress < 1) {
          heroHasFadedOutRef.current = true
        } else if (heroHasFadedOutRef.current) {
          heroHasFadedOutRef.current = false
          setHeroAnimationKey((key) => key + 1)
        }
      })
    }

    updateHeroOpacity()
    window.addEventListener('scroll', updateHeroOpacity, { passive: true })
    window.addEventListener('resize', updateHeroOpacity)

    return () => {
      window.removeEventListener('scroll', updateHeroOpacity)
      window.removeEventListener('resize', updateHeroOpacity)
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  const servicesTrackRef = useRef(null)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)
  const hasDragged = useRef(false)

  const scrollCarousel = (direction) => {
    const track = servicesTrackRef.current
    if (!track) return
    const cardStep = 362 // Ancho de tarjeta (340px) + gap (22px)
    track.scrollBy({ left: direction * cardStep, behavior: 'smooth' })
  }

  const handleTrackScroll = () => {
    const track = servicesTrackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    if (maxScroll > 0) {
      const progress = (track.scrollLeft / maxScroll) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    const trackCenter = track.scrollLeft + track.clientWidth / 2
    let closestIndex = 0
    let minDistance = Infinity
    Array.from(track.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2
      const dist = Math.abs(trackCenter - childCenter)
      if (dist < minDistance) {
        minDistance = dist
        closestIndex = index
      }
    })
    setActiveCard(closestIndex)
  }

  const handleSliderInput = (e) => {
    const val = parseFloat(e.target.value)
    setScrollProgress(val)
    const track = servicesTrackRef.current
    if (track) {
      const maxScroll = track.scrollWidth - track.clientWidth
      track.scrollLeft = (val / 100) * maxScroll
    }
  }

  const handleMouseDown = (e) => {
    const track = servicesTrackRef.current
    if (!track) return
    setIsDragging(true)
    dragStartX.current = e.pageX - track.offsetLeft
    dragScrollLeft.current = track.scrollLeft
    hasDragged.current = false
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const track = servicesTrackRef.current
    if (!track) return
    e.preventDefault()
    const x = e.pageX - track.offsetLeft
    const distance = (x - dragStartX.current) * 1.3
    if (Math.abs(distance) > 5) {
      hasDragged.current = true
    }
    track.scrollLeft = dragScrollLeft.current - distance
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleProjectTrackScroll = () => {
    const track = projectsTrackRef.current
    if (!track) return

    const trackCenter = track.scrollLeft + track.clientWidth / 2
    let closestIndex = 0
    let minDistance = Infinity

    Array.from(track.children).forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2
      const distance = Math.abs(trackCenter - slideCenter)
      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    setActiveProjectSlide(closestIndex)
  }

  const goToProjectSlide = (index) => {
    const track = projectsTrackRef.current
    const slide = track?.children[index]
    if (!track || !slide) return

    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
    setActiveProjectSlide(index)
  }

  const handleCardSelect = (index) => {
    if (hasDragged.current) return
    if (index === 0) {
      window.location.assign('/sitios-web')
      return
    }
    if (index === 1) {
      window.location.assign('/tienda-online')
      return
    }
    if (index === 2) {
      window.location.assign('/sistemas-a-medida')
      return
    }
    if (index === 3) {
      window.location.assign('/menu-digital')
      return
    }
    if (index === 4) {
      window.location.assign('/invitaciones')
      return
    }
    setActiveCard(index)
    const track = servicesTrackRef.current
    if (!track) return
    const card = track.children[index]
    if (card) {
      const targetScroll = card.offsetLeft - (track.clientWidth / 2) + (card.clientWidth / 2)
      track.scrollTo({ left: targetScroll, behavior: 'smooth' })
    }
  }

  // Scroll horizontal con rueda del mouse sobre el carrusel
  useEffect(() => {
    const track = servicesTrackRef.current
    if (!track) return

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = track.scrollWidth - track.clientWidth
        if (maxScroll > 0) {
          const canScrollLeft = track.scrollLeft > 0 && e.deltaY < 0
          const canScrollRight = track.scrollLeft < maxScroll - 1 && e.deltaY > 0
          if (canScrollLeft || canScrollRight) {
            e.preventDefault()
            track.scrollLeft += e.deltaY * 0.95
          }
        }
      }
    }

    track.addEventListener('wheel', onWheel, { passive: false })
    return () => track.removeEventListener('wheel', onWheel)
  }, [])

  // Detener drag global si el usuario suelta el mouse fuera del track
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }
    window.addEventListener('mouseup', handleGlobalMouseUp)
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
  }, [])

  return (
    <div className="app-layout">
      {/* Overlay esmerilado/blureado de fondo cuando se hace hover sobre el 3er contenedor */}
      <div
        className={`services-backdrop-blur ${isServicesHovered ? 'services-backdrop-blur--active' : ''}`}
        aria-hidden="true"
      />

      <Sidebar
        onNavigateHome={handleNavigateHome}
        currentPage={
          isNosotrosPage
            ? 'nosotros'
            : isSitiosWebPage
              ? 'sitios-web'
              : isTiendaOnlinePage
                ? 'tienda-online'
                : isSistemasAMedidaPage
                  ? 'sistemas-a-medida'
                  : isMenuDigitalPage
                    ? 'menu-digital'
                    : isInvitacionesPage
                      ? 'invitaciones'
                  : 'home'
        }
      />

      <main className="main-content" aria-label="Contenido principal">
        {isNosotrosPage ? (
          <Nosotros />
        ) : isSitiosWebPage ? (
          <SitiosWeb />
        ) : isTiendaOnlinePage ? (
          <TiendaOnline />
        ) : isSistemasAMedidaPage ? (
          <SistemasAMedida />
        ) : isMenuDigitalPage ? (
          <MenuDigital />
        ) : isInvitacionesPage ? (
          <Invitaciones />
        ) : (
          <>
        <div className="hero-services-stage">
          <div className="hero-area" ref={heroAreaRef}>
            {/* HERO SECTION */}
            <section className="hero-container" id="inicio" aria-label="Presentación">
              <div className="hero-copy" key={heroAnimationKey}>
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
                <div className="hero-actions-group">
                  <Button variant="dark">Contactanos</Button>
                  <Button variant="yellow" href="#servicios">Ver servicios</Button>
                </div>
              </div>
            </section>
          </div>

          {/* SECCIÓN SERVICIOS */}
          <section
            ref={servicesSectionRef}
            className={`services-section ${isServicesHovered ? 'services-section--hovered' : ''}`}
            id="servicios"
            aria-label="Servicios"
          >
            {/* 1er Contenedor: Título "Servicios" (Mismo estilo que Proyectos) */}
            <div className="services-container-one">
              <h2 className="services-title">Servicios</h2>
            </div>

            {/* 2do Contenedor: Subtítulo */}
            <div className="services-container-two">
              <p className="services-subtitle">
                <span className="services-subtitle-lead">Transformamos ideas,</span>
                <span className="services-subtitle-accent">y desarrollamos soluciones.</span>
              </p>
            </div>

            {/* 3er Contenedor: Carrusel de tarjetas de servicios */}
            <div
              className="services-container-three"
              onMouseEnter={() => setIsServicesHovered(true)}
              onMouseLeave={() => setIsServicesHovered(false)}
            >
              {/* Header del 3er contenedor con navegación por flechas */}
              <div className="services-carousel-header">
                <div className="services-carousel-header-info">
                  <span className="services-carousel-counter">
                    0{activeCard + 1} <span className="services-counter-divider">/</span> 0{servicesData.length}
                  </span>
                  <span className="services-carousel-hint">Deslizá o arrastrá para explorar</span>
                </div>
                <div className="services-carousel-arrows">

                </div>
              </div>

              {/* Track deslizable de tarjetas */}
              <div
                ref={servicesTrackRef}
                className={`services-cards-track ${isDragging ? 'is-dragging' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onScroll={handleTrackScroll}
              >
                {servicesData.map((service, index) => (
                  <IPhoneCard
                    key={service.id}
                    title={service.title}
                    featureCards={service.featureCards}
                    isActive={activeCard === index}
                    onSelect={() => handleCardSelect(index)}
                    onButtonClick={index <= 2 ? undefined : () => handleCardSelect(index)}
                    buttonHref={
                      index === 0
                        ? '/sitios-web'
                        : index === 1
                          ? '/tienda-online'
                          : index === 2
                            ? '/sistemas-a-medida'
                            : index === 3
                              ? '/menu-digital'
                              : index === 4
                                ? '/invitaciones'
                                : service.href
                    }
                    target={index === 5 ? '_blank' : undefined}
                    rel={index === 5 ? 'noreferrer' : undefined}
                  />
                ))}
              </div>

              {/* Slider bar horizontal inferior para deslizar hacia los costados */}
              <div className="services-slider-container">
                <button
                  type="button"
                  className="services-slider-btn"
                  aria-label="Deslizar hacia la izquierda"
                  onClick={() => scrollCarousel(-1)}
                >
                  <CircleArrowLeft size={22} strokeWidth={2} aria-hidden="true" />
                </button>

                <div className="services-slider-wrapper">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={scrollProgress}
                    onChange={handleSliderInput}
                    className="services-slider-input"
                    aria-label="Control deslizante horizontal de servicios"
                  />
                  <div
                    className="services-slider-fill"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>

                <button
                  type="button"
                  className="services-slider-btn"
                  aria-label="Deslizar hacia la derecha"
                  onClick={() => scrollCarousel(1)}
                >
                  <CircleArrowRight size={22} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </div>
            <MobileServiceList services={servicesData} />
          </section>
        </div>

        <section
          ref={processSectionRef}
          className={`nuestros-procesos ${hasProcessSectionEntered ? 'nuestros-procesos--visible' : ''}`}
          id="proceso"
          aria-label="Nuestros procesos"
        >
          <div className="nuestros-procesos-contenido">
            <h2 className="nuestros-procesos-titulo">Proceso</h2>
            <p className="nuestros-procesos-texto">
              <span>Cada solución</span>
              <span>tiene un proceso detrás.</span>
            </p>
          </div>
          <div className="procesos-tarjetas">
            {processStages.map((stage, index) => (
              <ProcessCard key={stage.title} number={index + 1} {...stage} />
            ))}
          </div>
        </section>

        {/* SECCIÓN PROYECTOS */}
        <section
          ref={projectsSectionRef}
          className={`projects-section ${hasProjectsSectionEntered ? 'projects-section--visible' : ''}`}
          id="proyectos"
          aria-label="Proyectos"
        >
          <h2 className="projects-title">Proyectos</h2>
          <h3 className="projects-subtitle">
            <span className="projects-subtitle-lead">Explorá nuestros</span>
            <span className="projects-subtitle-accent">proyectos realizados</span>
          </h3>

          <div
            className="projects-container"
            ref={projectsTrackRef}
            onScroll={handleProjectTrackScroll}
          >
            <ProjectCard
              number="01"
              title="Sistema de gestión clínica"
              subtitle="Aplicación web"
              description={'Demo clínica con dashboard para gestionar turnos y pacientes.\nUsuario Centro médico: 22222222222 | Contraseña: 123\nUsuario Médico: 11111111111 | Contraseña: 123'}
              image={img1}
              imageAlt="Logo del sistema de gestión clínica"
              imageContain
              imageCompact
              demoHref="https://prestadores-medicos.vercel.app"
            />
            <ProjectCard
              number="02"
              title="Olla Vegana"
              subtitle="Web institucional + Tienda online"
              description="Diseñamos y desarrollamos una plataforma que integra la historia, las campañas solidarias y la tienda online de Olla Vegana en una experiencia moderna, accesible y autogestionable."
              image={logoOllaVegana}
              imageAlt="Logo de Olla Vegana"
              imageContain
              imageTone="vegan"
              demoHref="https://ollavegana.org"
              demoLabel="Ver sitio web"
              reverse
            />
            <ProjectCard
              number="03"
              title="Bohemia Velas"
              subtitle="Tienda online"
              description={'E-commerce de velas artesanales y cuidado personal, con carrito y panel de administración.\nUsuario administrador: admin@velas.com | Contraseña: 123456'}
              image={img3}
              imageAlt="Logo de Bohemia Velas"
              imageContain
              imageCompact
              imageTone="warm"
              demoHref="https://bohemia-sigma.vercel.app"
            />
          </div>
          <div className="projects-carousel-controls" aria-label="Navegación de proyectos">
            <button
              type="button"
              className="projects-carousel-button"
              aria-label="Proyecto anterior"
              onClick={() => goToProjectSlide(Math.max(0, activeProjectSlide - 1))}
              disabled={activeProjectSlide === 0}
            >
              <CircleArrowLeft size={28} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="projects-carousel-button"
              aria-label="Proyecto siguiente"
              onClick={() => goToProjectSlide(Math.min(2, activeProjectSlide + 1))}
              disabled={activeProjectSlide === 2}
            >
              <CircleArrowRight size={28} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section
          ref={contactSectionRef}
          className={`contact-section ${hasContactSectionEntered ? 'contact-section--visible' : ''}`}
          id="contacto"
          aria-label="Contacto"
        >
          <div className="contact-heading-frame">
            <h2 className="contact-section-title">Contacto</h2>
          </div>
          <div className="contact-content">
            <h3 className="contact-title">
              <span>Hablemos de tu</span>
              <span>próximo proyecto</span>
            </h3>
            <form
              className="contact-lead-fields"
              onSubmit={handleContactRequestSubmit}
              aria-busy={isContactSubmitting}
            >
              <input
                ref={contactInputRef}
                className="contact-lead-input"
                type="text"
                name="contact"
                aria-label="Tu email o número de teléfono"
                placeholder="Tu email o número de teléfono"
                autoComplete="off"
                value={contactValue}
                onChange={(event) => {
                  setContactValue(event.target.value)
                  setContactSubmitMessage('')
                }}
                required
              />
              <div className="contact-lead-select-wrap" ref={projectTypeSelectRef}>
                <button
                  className={`contact-lead-select${isProjectTypeOpen ? ' contact-lead-select--open' : ''}`}
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isProjectTypeOpen}
                  aria-controls="contact-lead-project-options"
                  onClick={() => setIsProjectTypeOpen((isOpen) => !isOpen)}
                >
                  <span>{selectedProjectType || 'Tipo de Proyecto'}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
                {isProjectTypeOpen && (
                  <div
                    className="contact-lead-options"
                    id="contact-lead-project-options"
                    role="listbox"
                    aria-label="Tipo de proyecto"
                  >
                    {[
                      'Landing Page',
                      'Web Institucional',
                      'Tienda Online',
                      'Sistema a Medida',
                      'Menú Digital',
                      'Invitaciones',
                      'Mantenimiento y Optimización'
                    ].map((projectType) => (
                      <button
                        className="contact-lead-option"
                        key={projectType}
                        type="button"
                        role="option"
                        aria-selected={selectedProjectType === projectType}
                        onClick={() => {
                          setSelectedProjectType(projectType)
                          setIsProjectTypeOpen(false)
                          setContactSubmitMessage('')
                        }}
                      >
                        {projectType}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="contact-lead-submit"
                type="submit"
                disabled={isContactSubmitting}
              >
                {isContactSubmitting ? 'Enviando...' : 'Quiero que me contacten'}
              </button>
              {contactSubmitMessage && (
                <p className="contact-lead-message" role="status" aria-live="polite">
                  {contactSubmitMessage}
                </p>
              )}
            </form>
          </div>
        </section>
        <Faq />
          </>
        )}
      </main>

      <footer ref={pageFooterRef} className="page-footer" role="contentinfo" aria-label="Pie de página">
        <div className="page-footer-content">
          <a href="#inicio" className="page-footer-brand">OESTACK</a>
          <span className="page-footer-dot" aria-hidden="true">•</span>
          <span className="page-footer-location">Buenos Aires, Argentina</span>
          <span className="page-footer-dot" aria-hidden="true">•</span>
          <span className="page-footer-copy">© 2026</span>
        </div>
        <div className="page-footer-social">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="page-footer-icon"
          >
            <svg className="github-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M12 .297a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.48 11.48 0 0 1 6.004 0c2.29-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.48 5.921.43.37.814 1.103.814 2.222v3.293c0 .32.216.694.825.576A12.002 12.002 0 0 0 12 .297Z" />
            </svg>
          </a>
          <a
            href={`https://wa.me/5491178149507?text=${encodeURIComponent('Hola quiero consultar por los diferentes paquetes de servicios')}`}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="page-footer-icon"
          >
            <MessageCircle size={16} aria-hidden="true" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=oestack.solutions@gmail.com"
            onClick={openGmailComposer}
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
            className="page-footer-icon"
          >
            <Mail size={16} aria-hidden="true" />
          </a>
        </div>
      </footer>
      <a
        ref={whatsappContactRef}
        className={`whatsapp-contact-float${isWhatsappStopped ? ' whatsapp-contact-float--above-footer' : ''}`}
        href={`https://wa.me/5491178149507?text=${encodeURIComponent('Hola quiero consultar por los diferentes paquetes de servicios')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        style={isWhatsappStopped ? { bottom: `${whatsappFooterHeight + 24}px` } : undefined}
      >
        <span className="whatsapp-contact-button" aria-hidden="true">
          <img src={whatsappIcon} alt="" />
        </span>
      </a>
    </div>
  )
}

export default App
