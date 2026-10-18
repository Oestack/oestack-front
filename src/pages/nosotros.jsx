import magaliPhoto from '../assets/magFoto.jpeg'
import matiasPhoto from '../assets/mat.jpg'
import { BriefcaseBusiness, ChevronDown } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa'
import Button from '../components/button.jsx'
import Faq from '../components/faq.jsx'

const profiles = [
  {
    id: 'matias',
    name: 'Matias Nahuel Carabajal',
    photo: matiasPhoto,
    portfolio: 'https://matnahuel.github.io/Portfolio/',
    linkedin: 'https://www.linkedin.com/in/matiasncarabajal/',
    description: [
      'Me apasiona profundamente el mundo IT. Disfruto especialmente encarar nuevos desafíos que exigen poner a prueba mi lógica, encontrando en los problemas complejos el impulso para crear soluciones tecnológicas a medida. Me centro en transformar necesidades reales en resultados decisivos, apoyándome en una comunicación fluida y un compromiso constante con la innovación.',
    ],
  },
  {
    id: 'magali',
    name: 'Magalí Orellana',
    photo: magaliPhoto,
    portfolio: 'https://portfolio-magali.vercel.app',
    linkedin: 'https://www.linkedin.com/in/magali-orellana-858543217/?isSelfProfile=true',
    description: [
      'Me interesa especialmente el diseño web y el desarrollo frontend, donde la programación se encuentra con lo visual y lo creativo. Disfruto pensar cada detalle de una interfaz y cómo se combinan los elementos para crear páginas que no solo funcionen bien, sino que también tengan una identidad propia.',
    ],
  },
]

const faqQuestions = [
  {
    question: '¿Cómo es el proceso de trabajo?',
    description: 'Primero conocemos tu negocio y tus necesidades, después definimos la propuesta y el presupuesto. Una vez aprobado, comenzamos el desarrollo y te acompañamos durante las distintas etapas hasta la entrega del proyecto.',
  },
  {
    question: '¿Qué medios de pago aceptan?',
    description: 'Aceptamos transferencias bancarias, Mercado Pago, Tarjeta de crédito con recargo y otros medios de pago acordados previamente. Las formas de pago y las condiciones se detallan en el presupuesto antes de comenzar.',
  },
  {
    question: '¿Cuánto tiempo demora un proyecto?',
    description: 'Depende del tipo de solución y de su complejidad. Antes de comenzar, establecemos plazos estimados y etapas de entrega para que sepas qué esperar durante el desarrollo.',
  },
  {
    question: '¿Puedo solicitar cambios durante el desarrollo?',
    description: 'Sí. Los ajustes se coordinan durante el proceso. Si surgen nuevas funcionalidades o modificaciones importantes que excedan lo acordado inicialmente, evaluamos su alcance y presupuesto.',
  },
  {
    question: '¿Qué pasa después de la entrega?',
    description: 'Entregamos la solución funcionando y te orientamos para que puedas utilizarla. También podemos acordar servicios de mantenimiento, soporte y mejoras posteriores, según las necesidades de tu proyecto.',
  },
]

function Nosotros() {
  return (
    <>
      <section
        className="projects-section projects-section--visible nosotros-page"
        aria-labelledby="nosotros-title"
      >
        <div className="nosotros-header">
          <div className="nosotros-heading-row">
            <h1 id="nosotros-title">¿Quiénes somos?</h1>
            
          </div>
          <p className="projects-subtitle nosotros-subtitle">
            <span className="projects-subtitle-lead">Conocé más</span>
            <span className="projects-subtitle-accent">sobre nosotros</span>
          </p>
        </div>
        {profiles.map((profile) => (
          <div className={`nosotros-profile-group nosotros-profile-group--${profile.id}`} key={profile.id}>
            <div className={`nosotros-profile nosotros-profile--${profile.id}`}>
              <div className={`nosotros-profile-photo nosotros-profile-photo--${profile.id}`}>
                <img src={profile.photo} alt={profile.name} />
              </div>
              <div className="nosotros-profile-content">
                <h2>{profile.name}</h2>
                <p className="nosotros-profile-degree">Técnica Universitaria en Programación</p>
                <p className="nosotros-profile-university">Universidad Nacional de Hurlingham</p>
                {profile.description.map((paragraph) => (
                  <p className="nosotros-profile-description" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className={`nosotros-profile-actions nosotros-profile-actions--${profile.id}`}>
              <div className="nosotros-profile-action-buttons">
                <Button
                  variant="dark"
                  href={profile.portfolio}
                  icon={BriefcaseBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </Button>
                <Button
                  variant="yellow"
                  href={profile.linkedin}
                  icon={FaLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Faq id="preguntas-frecuentes-nosotros" questions={faqQuestions} animateOnView />
    </>
  )
}

export default Nosotros
