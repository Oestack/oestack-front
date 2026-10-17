import { useState } from 'react'
import { ChevronDown, MessageCircle, ArrowRight, CircleHelp, Sparkles } from 'lucide-react'
import Button from './button.jsx'

const defaultFaqItems = [
  {
    id: 'hosting-dominio-ssl',
    category: 'services',
    categoryLabel: 'Hosting & Tecnología',
    question: '¿Qué diferencia hay entre Hosting, Dominio y Certificado SSL (candado)?',
    answer: (
      <>
        <p>Son los tres pilares técnicos necesarios para que tu sitio funcione en internet de forma segura y accesible:</p>
        <ul className="faq-answer-list">
          <li>
            <strong>Dominio:</strong> Es la dirección web por la cual tus clientes acceden a tu sitio (por ejemplo, <code>tunegocio.com</code> o <code>tuempresa.com.ar</code>). Se registra y renueva anualmente.
          </li>
          <li>
            <strong>Hosting:</strong> Es el servidor en la nube donde se alojan todos los archivos, bases de datos y correos de tu web para que esté disponible online las 24 horas.
          </li>
          <li>
            <strong>Certificado SSL (candado HTTPS):</strong> Cifra la conexión entre el visitante y el servidor para que la navegación sea 100% segura. Además de proteger datos confidenciales, es fundamental para el posicionamiento en Google y evita que los navegadores califiquen tu web como &ldquo;No segura&rdquo;.
          </li>
        </ul>
        <p>
          En <strong>OeStack</strong> te asesoramos y gestionamos la configuración e integración de estos tres elementos para que vos no tengas que preocuparte por tecnicismos.
        </p>
      </>
    ),
  },
  {
    id: 'cuanto-cuesta',
    category: 'pricing',
    categoryLabel: 'Costos & Medios de Pago',
    question: '¿Cuánto cuesta desarrollar un sitio web o software a medida?',
    answer: (
      <>
        <p>El valor de un desarrollo depende de la complejidad y el alcance de tu proyecto:</p>
        <ul className="faq-answer-list">
          <li>
            <strong>Landing Pages:</strong> La opción más accesible y rápida, orientada a convertir visitantes en consultas o ventas.
          </li>
          <li>
            <strong>Sitios Web Institucionales:</strong> Proyectos con múltiples secciones, diseño UX/UI exclusivo, formularios interactivos y optimización SEO.
          </li>
          <li>
            <strong>E-Commerce y Tiendas Online:</strong> Plataformas con catálogo de productos, pasarela de cobros (Mercado Pago, tarjetas), gestión de pedidos y envíos.
          </li>
          <li>
            <strong>Sistemas & Software a Medida:</strong> Aplicaciones web completas, paneles internos de gestión operativa, bases de datos avanzadas e integración de APIs.
          </li>
        </ul>
        <p>
          Evaluamos tu necesidad puntual y te presentamos una propuesta transparente, escalable y adaptada a tus objetivos de negocio, sin costos ocultos.
        </p>
      </>
    ),
  },
  {
    id: 'forma-de-pago',
    category: 'pricing',
    categoryLabel: 'Costos & Medios de Pago',
    question: '¿Cómo es la modalidad de pago y qué medios aceptan?',
    answer: (
      <>
        <p>
          Trabajamos habitualmente con un esquema claro y transparente: <strong>50% de anticipo</strong> para dar inicio a la etapa de diseño y desarrollo, y el <strong>50% restante contra entrega</strong>, una vez que el sitio o sistema está aprobado y listo para salir a producción.
        </p>
        <p>Para tu comodidad, aceptamos los siguientes métodos de pago:</p>
        <ul className="faq-answer-list">
          <li><strong>Transferencias bancarias</strong> y depósitos inmediatos.</li>
          <li><strong>Billeteras digitales:</strong> Mercado Pago, Lemon, MODO, Ualá.</li>
          <li><strong>Tarjetas de débito y crédito.</strong></li>
          <li><strong>PayPal y Criptomonedas (USDT / Binance):</strong> ideal para clientes en el exterior o proyectos internacionales.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'materiales-inicio',
    category: 'process',
    categoryLabel: 'Tiempos, Proceso & Soporte',
    question: '¿Qué información o materiales debo brindarles para comenzar?',
    answer: (
      <>
        <p>
          Para arrancar solo necesitamos que nos cuentes tu objetivo de negocio, a qué público te dirigís y qué funciones imaginás para tu web. Si contás con referencias visuales de sitios que te gusten, nos ayuda mucho a captar tu estilo rápidamente.
        </p>
        <p>
          Si ya disponés de logotipo, textos o fotografías, los integramos. Y si todavía no tenés todo definido, <strong>no te preocupes:</strong> te guiamos en la estructura de contenidos y disponemos de recursos gráficos y bancos de imágenes profesionales libres de derechos para complementar tu proyecto.
        </p>
      </>
    ),
  },
  {
    id: 'tiempos-entrega',
    category: 'process',
    categoryLabel: 'Tiempos, Proceso & Soporte',
    question: '¿Cuánto tiempo tardan en diseñar y desarrollar mi proyecto?',
    answer: (
      <>
        <p>Priorizamos la velocidad de entrega manteniendo rigurosos estándares de calidad técnica y visual:</p>
        <ul className="faq-answer-list">
          <li><strong>Landing Pages:</strong> Entre 5 y 8 días hábiles.</li>
          <li><strong>Sitios Web Institucionales:</strong> Entre 10 y 15 días hábiles.</li>
          <li><strong>Tiendas E-Commerce y Sistemas a Medida:</strong> Entre 3 y 5 semanas, organizadas en sprints con entregas periódicas para que veas el avance real.</li>
        </ul>
        <p>
          <em>Los plazos comienzan a correr una vez definido el alcance y recibido el contenido base. También disponemos de modalidades prioritarias para urgencias puntuales.</em>
        </p>
      </>
    ),
  },
  {
    id: 'mantenimiento-mensual',
    category: 'pricing',
    categoryLabel: 'Costos & Medios de Pago',
    question: '¿Es obligatorio abonar un mantenimiento mensual?',
    answer: (
      <>
        <p>
          <strong>No.</strong> Las Landing Pages y sitios web institucionales <strong>no requieren ningún abono de mantenimiento mensual obligatorio</strong> una vez finalizados y entregados. El producto es 100% de tu propiedad.
        </p>
        <p>
          Para tiendas online, catálogos en constante renovación o plataformas de software que demandan copias de seguridad (backups) automáticas, monitoreo de infraestructura o modificaciones periódicas, ofrecemos planes opcionales de mantenimiento preventivo y soporte técnico continuo a tu medida.
        </p>
      </>
    ),
  },
  {
    id: 'autogestion-panel',
    category: 'services',
    categoryLabel: 'Hosting & Tecnología',
    question: '¿Podré autogestionar el contenido sin tener conocimientos técnicos?',
    answer: (
      <>
        <p>
          <strong>Totalmente.</strong> No necesitás saber programación ni diseño. Desarrollamos paneles de administración limpios e intuitivos para que puedas modificar textos, publicar noticias, cargar nuevos productos, actualizar precios o revisar pedidos por tu cuenta.
        </p>
        <p>
          Además, al finalizar el desarrollo te brindamos una capacitación personalizada y videos tutoriales explicativos grabados paso a paso para que tengas total autonomía.
        </p>
      </>
    ),
  },
  {
    id: 'mails-corporativos',
    category: 'services',
    categoryLabel: 'Hosting & Tecnología',
    question: '¿Incluyen cuentas de correo corporativas con mi dominio propio?',
    answer: (
      <>
        <p>
          <strong>Sí.</strong> Al poner en marcha el hosting de tu proyecto te creamos y dejamos listas cuentas de email personalizadas con tu dominio propio (por ejemplo, <code>contacto@tuempresa.com</code> o <code>ventas@tuempresa.com</code>).
        </p>
        <p>
          Esto genera una imagen mucho más seria y profesional ante tus clientes. Además, te asistimos para configurarlas en tu celular o vincularlas a aplicaciones de correo habituales como Gmail o Microsoft Outlook.
        </p>
      </>
    ),
  },
  {
    id: 'idiomas-multilingue',
    category: 'services',
    categoryLabel: 'Hosting & Tecnología',
    question: '¿Desarrollan sitios o plataformas en múltiples idiomas?',
    answer: (
      <>
        <p>
          Sí, desarrollamos sitios bilingües y multilingües (Español, Inglés, Portugués, etc.) con selectores de idioma limpios y ágiles.
        </p>
        <p>
          Implementamos arquitecturas con internacionalización (i18n) preparadas para que cada versión lingüística esté correctamente indexada y posicionada en los motores de búsqueda de cada país objetivo.
        </p>
      </>
    ),
  },
  {
    id: 'soporte-y-garantia',
    category: 'process',
    categoryLabel: 'Tiempos, Proceso & Soporte',
    question: '¿Qué garantía y respaldo tengo después de la entrega?',
    answer: (
      <>
        <p>En OeStack nos respaldan la formación universitaria en informática y un compromiso ético innegociable con cada cliente:</p>
        <ul className="faq-answer-list">
          <li>
            <strong>Garantía técnica post-lanzamiento:</strong> Resolvemos cualquier inconveniente o ajuste técnico posterior a la entrega sin costo adicional.
          </li>
          <li>
            <strong>Propiedad absoluta:</strong> Todos los dominios, accesos a servidores y repositorios quedan registrados a tu nombre. Vos sos el único dueño de tu activo digital.
          </li>
          <li>
            <strong>Atención directa:</strong> Tenés un canal de comunicación continuo por WhatsApp y correo directamente con nosotros, sin intermediarios ni bots impersonales.
          </li>
        </ul>
      </>
    ),
  },
]

function Faq({ questions = defaultFaqItems }) {
  const [openItem, setOpenItem] = useState(null)

  const toggleItem = (id) => {
    setOpenItem((prev) => (prev === id ? null : id))
  }

  const visibleQuestions = questions.slice(0, 5)

  return (
    <section className="faq-section" id="preguntas-frecuentes" aria-labelledby="faq-title">
      <div className="faq-section-header">
        <div className="faq-badge">
          <CircleHelp className="faq-badge-icon" size={15} aria-hidden="true" />
          <span>Preguntas Frecuentes</span>
        </div>
      </div>

      <div className="faq-section-title-area">
        <h2 className="faq-title" id="faq-title">Resolvé tus dudas</h2>
        <p className="faq-subtitle">
          <span className="faq-subtitle-lead">Todo lo que necesitás saber antes de </span>
          <span className="faq-subtitle-accent">iniciar tu proyecto digital con nosotros</span>
        </p>
      </div>

      <div className="faq-section-body">
        <div className="faq-accordion-container">
          {visibleQuestions.map((item, index) => {
            const isOpenItem = openItem === item.id
            const itemIndex = String(index + 1).padStart(2, '0')

            return (
              <div
                key={item.id}
                className={`faq-item${isOpenItem ? ' is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpenItem}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <div className="faq-question-left">
                    <span className="faq-question-number">{itemIndex}</span>
                    <span className="faq-question-text">{item.question}</span>
                  </div>
                  <div className="faq-question-right">
                    <span className="faq-item-tag">{item.categoryLabel}</span>
                    <div className="faq-chevron-wrap">
                      <ChevronDown className="faq-chevron" size={18} aria-hidden="true" />
                    </div>
                  </div>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                  className={`faq-answer-collapse${isOpenItem ? ' is-expanded' : ''}`}
                >
                  <div className="faq-answer-content">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="faq-cta-card">
          <div className="faq-cta-content">
            <div className="faq-cta-badge">
              <Sparkles size={16} aria-hidden="true" />
              <span>Asesoramiento Personalizado</span>
            </div>
            <h3 className="faq-cta-title">¿Tenés alguna otra duda sobre tu proyecto?</h3>
            <p className="faq-cta-desc">
              Cada idea tiene requerimientos únicos. Escribinos sin ningún compromiso y te orientamos sobre la mejor arquitectura técnica y opciones para tu presupuesto.
            </p>
          </div>
          <div className="faq-cta-actions">
            <Button
              variant="dark"
              href={`https://wa.me/5491164889873?text=${encodeURIComponent('Hola! Estuve viendo las preguntas frecuentes de la web y tengo una consulta sobre mi proyecto.')}`}
              icon={MessageCircle}
            >
              Preguntar por WhatsApp
            </Button>
            <Button variant="yellow" href="#contacto" icon={ArrowRight}>
              Hablemos de tu idea
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq
