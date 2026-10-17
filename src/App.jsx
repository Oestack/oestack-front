import { useState, useRef, useEffect } from 'react'
import {
  CircleArrowLeft,
  CircleArrowRight,
  ArrowRight,
  FileText,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MessageCircle,
  Mail,
  X,
  PanelsTopLeft,
  Code2,
  MonitorCheck,
} from 'lucide-react'
import Sidebar from './components/sidebar.jsx'
import Button from './components/button.jsx'
import ProjectCard from './components/project-card.jsx'
import ProcessCard from './components/process-card.jsx'
import FaqModal from './components/faq-modal.jsx'
import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'
import heroImg from './assets/hero.png'
import './App.css'

const servicesData = [
  {
    id: 'web',
    tag: 'Web & E-Commerce',
    title: 'Desarrollo Web & Plataformas',
    description: 'Creamos sitios web institucionales, e-commerce y aplicaciones web modernas, rápidas y adaptadas a cualquier dispositivo con la mejor optimización SEO.',
    image: img1,
  },
  {
    id: 'software',
    tag: 'Sistemas a Medida',
    title: 'Software & Automatizaciones',
    description: 'Arquitecturas escalables, sistemas de gestión interna y herramientas digitales diseñadas específicamente para resolver la operativa real de tu negocio.',
    image: img2,
  },
  {
    id: 'uiux',
    tag: 'Diseño UX / UI',
    title: 'Diseño UI / UX & Prototipado',
    description: 'Diseñamos interfaces atractivas, modernas e intuitivas centradas en el usuario que transforman experiencias y potencian la tasa de conversión.',
    image: img3,
  },
  {
    id: 'cloud',
    tag: 'Cloud & DevOps',
    title: 'Infraestructura & Soluciones Cloud',
    description: 'Despliegues continuos, entornos seguros, integración de APIs y administración en la nube para garantizar alta disponibilidad y tolerancia a fallos.',
    image: heroImg,
  },
  {
    id: 'consultoria',
    tag: 'Consultoría & Soporte',
    title: 'Mantenimiento & Optimización',
    description: 'Auditoría de código, optimización de velocidad de carga, modernización tecnológica y soporte continuo para que tus productos sigan escalando.',
    image: img2,
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
  // Servicios Carousel State
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeCard, setActiveCard] = useState(0)
  const [isServicesHovered, setIsServicesHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false)
  const [selectedProjectType, setSelectedProjectType] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactIdea, setContactIdea] = useState('')
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [contactSubmitMessage, setContactSubmitMessage] = useState('')
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear())
  const [bookingDate, setBookingDate] = useState('')
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false)
  const [bookingConfirmation, setBookingConfirmation] = useState(null)
  const [hasProcessSectionEntered, setHasProcessSectionEntered] = useState(false)
  const [hasProjectsSectionEntered, setHasProjectsSectionEntered] = useState(false)
  const [heroAnimationKey, setHeroAnimationKey] = useState(0)
  const bookingFrameRef = useRef(null)
  const heroAreaRef = useRef(null)
  const servicesSectionRef = useRef(null)
  const processSectionRef = useRef(null)
  const projectsSectionRef = useRef(null)
  const bookingAppUrl = import.meta.env.VITE_BOOKING_APP_URL

  const handleNavigateHome = () => {
    setHeroAnimationKey((key) => key + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

  const calendarMonthNames = Array.from({ length: 12 }, (_, month) =>
    new Intl.DateTimeFormat('es-AR', { month: 'long' }).format(new Date(2025, month, 1)),
  )
  const calendarDaysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate()
  const calendarStartOffset = (new Date(calendarYear, calendarMonth, 1).getDay() + 6) % 7
  const calendarCells = [
    ...Array(calendarStartOffset).fill(null),
    ...Array.from({ length: calendarDaysInMonth }, (_, day) => day + 1),
  ]
  while (calendarCells.length % 7 !== 0) calendarCells.push(null)

  const changeCalendarMonth = (amount) => {
    const nextMonth = new Date(calendarYear, calendarMonth + amount, 1)
    setCalendarMonth(nextMonth.getMonth())
    setCalendarYear(nextMonth.getFullYear())
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    if (isContactSubmitting) return

    setIsContactSubmitting(true)
    setContactSubmitMessage('')

    const message = [
      `Nombre: ${contactName.trim()}`,
      `Mail: ${contactEmail.trim()}`,
      `Opción elegida: ${selectedProjectType || 'No especificada'}`,
      `Mensaje: ${contactIdea.trim()}`,
    ].join('\n\n')

    try {
      const response = await fetch('https://formsubmit.co/ajax/oestack.solutions@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          projectType: selectedProjectType || 'No especificado',
          message,
          _subject: 'Nuevo mensaje desde Oestack',
        }),
      })
      const result = await response.json()

      if (!response.ok || result.success === false || result.success === 'false') {
        throw new Error('No se pudo enviar el formulario.')
      }

      setContactSubmitMessage('¡Mensaje enviado! Te responderemos a la brevedad.')
      setContactName('')
      setContactEmail('')
      setContactIdea('')
      setSelectedProjectType('')
    } catch {
      setContactSubmitMessage('No se pudo enviar. Probá de nuevo en unos minutos.')
    } finally {
      setIsContactSubmitting(false)
    }
  }

  const getCalendarDateValue = (day) => (
    `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  )

  const isCalendarDateUnavailable = (day) => {
    if (!day) return true
    const date = new Date(calendarYear, calendarMonth, day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0 || date.getDay() === 6
  }

  const openBookingModal = (day) => {
    if (isCalendarDateUnavailable(day)) return
    setBookingConfirmation(null)
    setBookingDate(getCalendarDateValue(day))
    setIsBookingModalOpen(true)
  }

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

  const closeBookingModal = () => {
    setIsBookingModalOpen(false)
    setBookingConfirmation(null)
  }

  useEffect(() => {
    const handleBookingMessage = (event) => {
      const isAppsScriptOrigin = event.origin === 'https://script.google.com'
        || event.origin === 'https://script.googleusercontent.com'
        || event.origin.endsWith('.script.googleusercontent.com')
      if (!isAppsScriptOrigin) return
      if (event.data?.type !== 'oestack-booking-success') return
      setBookingConfirmation(true)
    }

    window.addEventListener('message', handleBookingMessage)
    return () => window.removeEventListener('message', handleBookingMessage)
  }, [bookingDate])

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
    const cardStep = 332 // Ancho de tarjeta (310px) + gap (22px)
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

  const handleCardSelect = (index) => {
    if (hasDragged.current) return
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
        onOpenFaq={() => setIsFaqModalOpen(true)}
        onNavigateHome={handleNavigateHome}
        isFaqOpen={isFaqModalOpen}
      />

      <main className="main-content" aria-label="Contenido principal">
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

            {/* 2do Contenedor: Subtítulo "Transformo ideas y desarrollamos soluciones" */}
            <div className="services-container-two">
              <p className="services-subtitle">
                <span className="services-subtitle-lead">Transformamos ideas, y </span>
                <span className="services-subtitle-accent">desarrollamos soluciones.</span>
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
                  <article
                    key={service.id}
                    className={`service-card ${activeCard === index ? 'service-card--active' : ''}`}
                    onClick={() => handleCardSelect(index)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Servicio: ${service.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleCardSelect(index)
                      }
                    }}
                  >
                    <div className="service-card-media">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-card-image"
                        draggable="false"
                      />
                      <span className="service-card-tag">{service.tag}</span>
                    </div>
                    <div className="service-card-content">
                      <h3 className="service-card-title">{service.title}</h3>
                      <p className="service-card-description">{service.description}</p>
                      <div className="service-card-footer">
                        <span className="service-card-link">
                          Conocer más
                          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </article>
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
          </section>
        </div>

        <section
          ref={processSectionRef}
          className={`nuestros-procesos ${hasProcessSectionEntered ? 'nuestros-procesos--visible' : ''}`}
          aria-label="Nuestros procesos"
        >
          <div className="nuestros-procesos-contenido">
            <h2 className="nuestros-procesos-titulo">Procesos</h2>
            <p className="nuestros-procesos-texto">
              <strong>Cada solución tiene un proceso detrás.</strong> En Oestack trabajamos por etapas,
              con objetivos definidos, avances concretos y comunicación constante. Sabés qué estamos
              haciendo, por qué lo hacemos y qué sigue.
            </p>
          </div>
          <div className="procesos-tarjetas">
            {processStages.map((stage) => (
              <ProcessCard key={stage.title} {...stage} />
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
          <p className="projects-subtitle">
            <span className="projects-subtitle-lead">Explorá nuestras demos y </span>
            <span className="projects-subtitle-accent">probá nuestras soluciones.</span>
          </p>

          <div className="projects-container">
            <ProjectCard
              number="01"
              title="Sistema de gestión clínica"
              description={'Demo clínica con dashboard para gestionar turnos y pacientes.\nUsuario Centro médico: 22222222222 | Contraseña: 123\nUsuario Médico: 11111111111 | Contraseña: 123'}
              image={img1}
              imageAlt="Logo del sistema de gestión clínica"
              imageContain
              imageCompact
              demoHref="https://prestadores-medicos.vercel.app"
            />
            <ProjectCard
              number="02"
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur adipiscing elit congue, primis integer aptent dapibus vel platea ornare, mauris nisl ullamcorper blandit fermentum praesent magnis. Tincidunt sollicitudin erat penatibus montes hac convallis justo, vehicula blandit luctus quisque maecenas habitant. Nisi vitae neque."
              image={img2}
              imageAlt="Proyecto 02"
              reverse
            />
            <ProjectCard
              number="03"
              title="Bohemia Velas"
              description={'E-commerce de velas artesanales y cuidado personal, con carrito y panel de administración.\nUsuario administrador: admin@velas.com | Contraseña: 123456'}
              image={img3}
              imageAlt="Logo de Bohemia Velas"
              imageContain
              imageCompact
              imageTone="warm"
              demoHref="https://bohemia-sigma.vercel.app"
            />
          </div>
        </section>

        <section className="contact-section" id="contacto" aria-label="Contacto">
          <div className="contact-heading-frame">
            <h2 className="contact-section-title">Contacto</h2>
          </div>
          <div className="contact-content">
            <h3 className="contact-title">
              <span>Hablemos de tu</span>
              <span>próximo proyecto</span>
            </h3>
            <p className="contact-subtitle">Contanos tu idea</p>
            <div className="contact-option contact-option--one" aria-label="Opción 1">
              <span className="contact-option-label">Opción 1:</span>
              <FileText className="contact-option-icon" aria-hidden="true" />
              <span className="contact-option-description">Completá el formulario</span>
              <p className="contact-option-copy">
                Contanos un poco de tu proyecto y nosotros nos ponemos en contacto a la brevedad
              </p>
              <label className="contact-field-label" htmlFor="contact-name">
                Nombre Completo *
              </label>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className={`contact-name-field${contactName ? ' contact-field--filled' : ''}`}>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder=" "
                    autoComplete="name"
                    value={contactName}
                    onChange={(event) => setContactName(event.target.value)}
                    required
                  />
                  <label htmlFor="contact-name">Tu nombre</label>
                </div>
                <div className={`contact-email-field${contactEmail ? ' contact-field--filled' : ''}`}>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder=" "
                    autoComplete="email"
                    value={contactEmail}
                    onChange={(event) => setContactEmail(event.target.value)}
                    required
                  />
                  <label htmlFor="contact-email">e-mail</label>
                </div>
                <div className="contact-project-select">
                  <input type="hidden" name="projectType" value={selectedProjectType} />
                  <button
                    className="contact-project-trigger"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isProjectMenuOpen}
                    aria-controls="contact-project-options"
                    onClick={() => setIsProjectMenuOpen((isOpen) => !isOpen)}
                  >
                    <span>{selectedProjectType || 'selecciona una opcion'}</span>
                    <ChevronDown
                      className={`contact-project-chevron ${isProjectMenuOpen ? 'contact-project-chevron--open' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {isProjectMenuOpen && (
                    <div className="contact-project-options" id="contact-project-options" role="listbox">
                      {[
                        'Landing Page',
                        'Web de varias paginas',
                        'Web full stack',
                        'Un sistema a medida',
                      ].map((option) => (
                        <button
                          className="contact-project-option"
                          key={option}
                          type="button"
                          role="option"
                          aria-selected={selectedProjectType === option}
                          onClick={() => {
                            setSelectedProjectType(option)
                            setIsProjectMenuOpen(false)
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <label className="contact-idea-label" htmlFor="contact-idea">
                  Contanos brevemente tu idea *
                </label>
                <div className={`contact-idea-field${contactIdea ? ' contact-field--filled' : ''}`}>
                  <textarea
                    id="contact-idea"
                    name="idea"
                    placeholder="Escribi tu idea"
                    value={contactIdea}
                    onChange={(event) => setContactIdea(event.target.value)}
                    required
                  />
                </div>
                <button className="contact-submit-button" type="submit" disabled={isContactSubmitting}>
                  <span>{isContactSubmitting ? 'Enviando' : 'Enviar'}</span>
                  <ArrowRight aria-hidden="true" />
                </button>
                {contactSubmitMessage && (
                  <p className="contact-submit-message" role="status">
                    {contactSubmitMessage}
                  </p>
                )}
              </form>
              <span className="contact-email-label">E-mail *</span>
              <span className="contact-project-label">Que querés desarrollar?</span>
            </div>
            <div className="contact-option contact-option--two" aria-label="Opción 2">
              <span className="contact-option-label">Opción 02</span>
              <Calendar className="contact-option-calendar" aria-hidden="true" />
              <span className="contact-option-interview">Programar una entrevista</span>
              <p className="contact-option-interview-copy">
                Elegí un horario disponible y coordinaremos una charla de 30 minutos para conocer tu
                proyecto, aclarar dudas y definir pasos
              </p>
              <div className="contact-calendar" aria-label="Calendario de entrevistas">
                <div className="contact-calendar-block">
                  <button
                    className="contact-calendar-nav"
                    type="button"
                    aria-label="Mes anterior"
                    onClick={() => changeCalendarMonth(-1)}
                  >
                    <ChevronLeft aria-hidden="true" />
                  </button>
                  <div className="contact-calendar-selects">
                    <div className="contact-calendar-select-wrap contact-calendar-month-wrap">
                      <select
                        aria-label="Mes"
                        value={calendarMonth}
                        onChange={(event) => setCalendarMonth(Number(event.target.value))}
                      >
                        {calendarMonthNames.map((month, index) => (
                          <option value={index} key={month}>{month}</option>
                        ))}
                      </select>
                      <ChevronDown aria-hidden="true" />
                    </div>
                    <div className="contact-calendar-select-wrap contact-calendar-year-wrap">
                      <select
                        aria-label="Año"
                        value={calendarYear}
                        onChange={(event) => setCalendarYear(Number(event.target.value))}
                      >
                        {Array.from({ length: 11 }, (_, index) => calendarYear - 5 + index).map((year) => (
                          <option value={year} key={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown aria-hidden="true" />
                    </div>
                  </div>
                  <button
                    className="contact-calendar-nav"
                    type="button"
                    aria-label="Mes siguiente"
                    onClick={() => changeCalendarMonth(1)}
                  >
                    <ChevronRight aria-hidden="true" />
                  </button>
                </div>
                <table className="contact-calendar-table">
                  <thead>
                    <tr>
                      {['Lu', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((weekday) => (
                        <th scope="col" key={weekday}>{weekday}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: calendarCells.length / 7 }, (_, week) => (
                      <tr key={week}>
                        {calendarCells.slice(week * 7, week * 7 + 7).map((day, index) => {
                          return (
                            <td key={`${week}-${index}`}>
                              {day && (
                                <button
                                  className="contact-calendar-day"
                                  type="button"
                                  disabled={isCalendarDateUnavailable(day)}
                                  aria-label={`Elegir ${day} de ${calendarMonthNames[calendarMonth]}`}
                                  onClick={() => openBookingModal(day)}
                                >
                                  <span className="contact-calendar-day-number">{day}</span>
                                </button>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="contact-interview-duration">
                <Clock className="contact-interview-duration-icon" aria-hidden="true" />
                <span className="contact-interview-duration-title">Duración: 30 minutos</span>
                <span className="contact-interview-duration-note">
                  La reunión será mediante Google Meet
                </span>
              </div>
            </div>
            <div className="contact-option contact-option--three" aria-label="Opción 3">
              <span className="contact-option-label">Opción 03</span>
              <MessageCircle className="contact-whatsapp-icon" aria-hidden="true" />
              <span className="contact-whatsapp-title">Whatsapp</span>
              <p className="contact-whatsapp-copy">Tenés una consulta rápida? Escribinos!</p>
              <div className="contact-whatsapp-action">
                <Button
                  variant="dark"
                  href={`https://wa.me/5491164889873?text=${encodeURIComponent('Hola quiero consultar por los diferentes paquetes de servicios')}`}
                  icon={MessageCircle}
                >
                  Abrir WhatsApp
                </Button>
              </div>
              <div className="contact-whatsapp-divider" aria-hidden="true" />
              <Mail className="contact-email-icon" aria-hidden="true" />
              <span className="contact-email-title">Email</span>
              <p className="contact-email-copy">
                También podés escribirnos por mail, y te respondemos lo antes posible
              </p>
              <div className="contact-email-action">
                <Button
                  variant="dark"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=oestack.solutions@gmail.com"
                  icon={Mail}
                  onClick={openGmailComposer}
                >
                  Enviar un mail
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="page-footer" role="contentinfo" aria-label="Pie de página">
        <div className="page-footer-content">
          <a href="#inicio" className="page-footer-brand">OESTACK</a>
          <span className="page-footer-dot" aria-hidden="true">•</span>
          <span className="page-footer-location">Buenos Aires, Argentina</span>
          <span className="page-footer-dot" aria-hidden="true">•</span>
          <span className="page-footer-copy">© 2025</span>
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
            href={`https://wa.me/5491164889873?text=${encodeURIComponent('Hola quiero consultar por los diferentes paquetes de servicios')}`}
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
      {isBookingModalOpen && (
        <div
          className="booking-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeBookingModal()
          }}
        >
          <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
            <button
              className="booking-modal-close"
              type="button"
              aria-label="Cerrar reserva"
              onClick={closeBookingModal}
            >
              <X aria-hidden="true" />
            </button>
            <h2 className="booking-modal-title" id="booking-modal-title">Programar entrevista</h2>
            {bookingAppUrl ? (
              <iframe
                ref={bookingFrameRef}
                className="booking-modal-frame"
                title="Elegí tu horario de entrevista"
                src={`${bookingAppUrl.replace(/\/$/, '')}?date=${encodeURIComponent(bookingDate)}`}
              />
            ) : (
              <p className="booking-modal-setup-message">
                El calendario todavía no está conectado. Cuando implementes la aplicación web de Apps Script, pegá su URL en <code>VITE_BOOKING_APP_URL</code> para habilitar las reservas.
              </p>
            )}
            {bookingConfirmation && (
              <div className="booking-confirmation-overlay" role="presentation">
                <section className="booking-confirmation" role="dialog" aria-modal="true" aria-labelledby="booking-confirmation-title">
                  <button
                    className="booking-modal-close"
                    type="button"
                    aria-label="Cerrar confirmación y volver a la página"
                    onClick={closeBookingModal}
                  >
                    <X aria-hidden="true" />
                  </button>
                  <h2 className="booking-modal-title" id="booking-confirmation-title">Reserva exitosa!</h2>
                  <p>Tu entrevista quedó agendada. Te enviaremos la invitación con los detalles.</p>
                </section>
              </div>
            )}
          </section>
        </div>
      )}

      <FaqModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
      />
    </div>
  )
}

export default App
