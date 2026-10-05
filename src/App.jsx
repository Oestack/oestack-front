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
} from 'lucide-react'
import Sidebar from './components/sidebar.jsx'
import Button from './components/button.jsx'
import ProjectCard from './components/project-card.jsx'
import img1 from './assets/img1.png'
import img2 from './assets/img2.png'
import img3 from './assets/img3.png'
import heroImg from './assets/hero.png'
import foto1 from './assets/foto1.jpg'
import foto2 from './assets/foto2.avif'
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

function App() {
  // Hero Carousel State
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
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth())
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear())

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

  // Reserva de muestra para visualizar el estilo del calendario.
  const reservedCalendarDates = ['2026-10-06']

  const changeCalendarMonth = (amount) => {
    const nextMonth = new Date(calendarYear, calendarMonth + amount, 1)
    setCalendarMonth(nextMonth.getMonth())
    setCalendarYear(nextMonth.getFullYear())
  }

  const isCalendarDateReserved = (day) => {
    if (!day) return false
    const date = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return reservedCalendarDates.includes(date)
  }

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

      <Sidebar />

      <main className="main-content" aria-label="Contenido principal">
        <div className="hero-top-rule" aria-hidden="true" />

        {/* HERO SECTION */}
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

        {/* SECCIÓN SERVICIOS */}
        <section
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
              <span className="services-subtitle-lead">Transformo ideas y </span>
              <span className="services-subtitle-accent">desarrollamos soluciones</span>
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
        
        {/* SECCIÓN PROYECTOS */}
        <div className="hero-bottom-rule" aria-hidden="true" />

        <section className="projects-section" id="proyectos" aria-label="Proyectos">
          <h2 className="projects-title">Proyectos</h2>

          <div className="projects-container">
            <ProjectCard
              number="01"
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur adipiscing elit congue, primis integer aptent dapibus vel platea ornare, mauris nisl ullamcorper blandit fermentum praesent magnis. Tincidunt sollicitudin erat penatibus montes hac convallis justo, vehicula blandit luctus quisque maecenas habitant. Nisi vitae neque."
              image={img1}
              imageAlt="Proyecto 01"
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
              title="Lorem Ipsum"
              description="Lorem ipsum dolor sit amet consectetur adipiscing elit congue, primis integer aptent dapibus vel platea ornare, mauris nisl ullamcorper blandit fermentum praesent magnis. Tincidunt sollicitudin erat penatibus montes hac convallis justo, vehicula blandit luctus quisque maecenas habitant. Nisi vitae neque."
              image={img3}
              imageAlt="Proyecto 03"
            />
          </div>
        </section>

        <div className="hero-bottom-rule" aria-hidden="true" />

        <section className="about-section" id="nosotros" aria-label="Nosotros">
          <h2 className="about-title">Nosotros</h2>

          <div className="about-photo about-photo--matias">
            <img src={foto1} alt="Matias Carabajal" />
          </div>
          <div className="about-bio about-bio--matias">
            <h3>Matias Carabajal</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec
              mauris consequat tincidunt. Sed euismod, sapien vel posuere volutpat, lectus nisi
              interdum erat, vitae facilisis erat justo sed augue. Curabitur non massa ut libero
              feugiat aliquet. Vivamus ac velit nec lacus tristique tincidunt. Donec sit amet
              turpis id neque interdum posuere. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Aenean sed lorem at justo luctus
              tincidunt. Proin vitae sem eget neque pharetra varius.
            </p>
          </div>

          <div className="about-bio about-bio--magali">
            <h3>Magalí Orellana</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo nec
              mauris consequat tincidunt. Sed euismod, sapien vel posuere volutpat, lectus nisi
              interdum erat, vitae facilisis erat justo sed augue. Curabitur non massa ut libero
              feugiat aliquet. Vivamus ac velit nec lacus tristique tincidunt. Donec sit amet
              turpis id neque interdum posuere. Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Aenean sed lorem at justo luctus
              tincidunt. Proin vitae sem eget neque pharetra varius.
            </p>
          </div>
          <div className="about-photo about-photo--magali">
            <img src={foto2} alt="Magalí Orellana" />
          </div>
        </section>
        <div className="hero-bottom-rule" aria-hidden="true" />

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
              <form className="contact-form">
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
                <button className="contact-submit-button" type="button">
                  <span>Enviar</span>
                  <ArrowRight aria-hidden="true" />
                </button>
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
                          const isReserved = isCalendarDateReserved(day)
                          return (
                            <td key={`${week}-${index}`}>
                              {day && (
                                <span
                                  className={`contact-calendar-day${isReserved ? ' contact-calendar-day--reserved' : ''}`}
                                  aria-label={`${day}${isReserved ? ', con reserva' : ''}`}
                                >
                                  <span className="contact-calendar-day-number">{day}</span>
                                </span>
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
                <Button variant="dark" href="https://wa.me/" icon={MessageCircle}>
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
                <Button variant="dark" href="mailto:" icon={Mail}>
                  Enviar un mail
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App

