import { useState } from 'react'
import { QrCode, PanelsTopLeft, ListChecks, Palette } from 'lucide-react'
import menuImage from '../assets/menu.webp'
import menuImageTwo from '../assets/menu2.webp'
import ServiceCard from '../components/service-card.jsx'
import WebsiteBenefits from '../components/website-benefits.jsx'
import Faq from '../components/faq.jsx'

const digitalMenuBenefits = [
  {
    title: 'Acceso mediante QR',
    description: 'Cada menú incluye un código QR para que tus clientes puedan escanearlo y consultar la carta desde su celular, sin descargar aplicaciones.',
    Icon: QrCode,
  },
  {
    title: 'Diseño adaptable',
    description: 'Tu carta se visualiza correctamente en celulares, tablets y computadoras, para que tus productos se puedan consultar desde cualquier dispositivo.',
    Icon: PanelsTopLeft,
  },
  {
    title: 'Información organizada',
    description: 'Presentá tus productos, precios y descripciones de manera clara para que tus clientes encuentren fácilmente lo que buscan.',
    Icon: ListChecks,
  },
  {
    title: 'Identidad propia',
    description: 'Una presentación visual alineada con tu marca, tus productos y el estilo de tu negocio.',
    Icon: Palette,
  },
]

const digitalMenuPlans = [
  {
    title: 'Carta básica',
    description: 'Todo lo esencial para presentar tu menú de forma digital y facilitar el acceso de tus clientes.',
    monthlyPrice: '$16.000',
    annualPrice: '$150.000',
    annualSavings: '$42.000',
    annualDiscount: '21,88%',
    includesTitle: 'Incluye:',
    includes: [
      'Menú digital adaptable a celulares, tablets y computadoras.',
      'Organización de productos por categorías.',
      'Productos con nombre, descripción y precio.',
      'Código QR para acceder directamente al menú.',
      'Diseño limpio y fácil de consultar.',
    ],
  },
  {
    title: 'Carta Premium',
    description: 'Una carta más visual y personalizada para destacar tus productos y la identidad de tu negocio.',
    monthlyPrice: '$26.000',
    annualPrice: '$250.000',
    annualSavings: '$62.000',
    annualDiscount: '19,87%',
    featured: true,
    includesTitle: 'Incluye todo lo del plan básico, más:',
    includes: [
      'Diseño visual más personalizado.',
      'Imágenes de los productos.',
      'Secciones para destacar productos seleccionados.',
      'Mayor personalización de la presentación y organización del menú.',
      'Opciones de actualización de productos y precios según la modalidad implementada.',
    ],
  },
  {
    title: 'Menú a medida',
    description: 'Una solución personalizada para negocios que necesitan funcionalidades adicionales o una experiencia diferente.',
    price: 'A cotizar',
    pricePrefix: null,
    priceCurrency: null,
    badgeLabel: 'Más elegido',
    includesTitle: 'Podemos desarrollar:',
    includes: [
      'Menús con funcionalidades personalizadas.',
      'Integración con pedidos y consultas.',
      'Gestión de usuarios por local.',
      'Experiencias adaptadas a tus procesos y necesidades.',
      'Código QR para acceder al menú digital.',
    ],
  },
]

const digitalMenuFaqQuestions = [
  {
    question: '¿El cliente debe descargar alguna aplicación para ver la carta?',
    description: 'No. El menú funciona como una Web App ultra rápida. El cliente simplemente escanea el código QR de la mesa con la cámara de su celular y el menú se abre al instante en el navegador, sin necesidad de descargas ni registros previos.',
  },
  {
    question: '¿Es posible configurar el menú digital en varios idiomas (multilenguaje)?',
    description: 'Sí. Podemos programar la carta digital para que detecte automáticamente el idioma predeterminado del teléfono del cliente (por ejemplo, Inglés o Portugués) o le permita cambiar de idioma mediante un botón visible, facilitando enormemente la atención a turistas y clientes internacionales.',
  },
  {
    question: '¿El menú digital permite recibir pedidos para Delivery o Take Away además de la atención en mesa?',
    description: 'Sí, totalmente. El sistema se puede configurar para ofrecer tres modalidades según el caso: consumo en el local (seleccionando el número de mesa), retiro por el local (Take Away) o envío a domicilio (Delivery), solicitando en este último caso la dirección y los datos de envío correspondientes.',
  },
  {
    question: '¿Podemos incluir fotos, alérgenos y filtros por tipo de dieta?',
    description: 'Totalmente. Diseñamos la experiencia de usuario (UX) para destacar imágenes tentadoras de tus productos, incluir etiquetas claras (Apto Celíacos/Sin TACC, Vegano, Vegetariano) e integrar filtros de búsqueda rápida por categorías o ingredientes.',
  },
  {
    question: '¿Qué sucede si hay mala conexión a internet o Wi-Fi en el establecimiento?',
    description: 'Optimizamos el menú digital con tecnologías PWA (Progressive Web App) y código liviano para que cargue consumiendo un mínimo de datos móviles, incluso con señal débil o intermitente.',
  },
]

function MenuDigital() {
  const [billingPeriod, setBillingPeriod] = useState('monthly')
  const isAnnual = billingPeriod === 'annual'

  const plans = digitalMenuPlans.map((plan) => {
    if (!plan.monthlyPrice) return plan

    return {
      ...plan,
      pricePrefix: null,
      price: isAnnual ? plan.annualPrice : plan.monthlyPrice,
      priceCurrency: isAnnual ? 'ARS/año' : 'ARS/mes',
      priceNote: isAnnual
        ? `${plan.annualDiscount} de descuento`
        : `O ${plan.annualPrice} por año, ahorrá ${plan.annualSavings} con el plan anual`,
    }
  })

  return (
    <section className="projects-section projects-section--visible sitios-web-page menu-digital-page" aria-labelledby="menu-digital-title">
      <h1 className="sitios-web-title" id="menu-digital-title">
        Menú Digital
      </h1>
      <p className="projects-subtitle sitios-web-subtitle">
        <span className="projects-subtitle-lead">Tu menú</span>
        <span className="projects-subtitle-accent">más cerca</span>
      </p>
      <WebsiteBenefits
        benefits={digitalMenuBenefits}
        images={[
          {
            src: menuImage,
            alt: 'Vista de un menú digital para consultar desde el celular',
            objectPosition: 'center',
          },
          {
            src: menuImageTwo,
            alt: 'Vista alternativa de un menú digital',
            objectPosition: 'center',
          },
        ]}
      />
      <div className="menu-digital-billing" role="group" aria-label="Período del plan">
        <button
          type="button"
          className={`menu-digital-billing-option${!isAnnual ? ' is-active' : ''}`}
          aria-pressed={!isAnnual}
          onClick={() => setBillingPeriod('monthly')}
        >
          Plan mensual
        </button>
        <button
          type="button"
          className={`menu-digital-billing-option${isAnnual ? ' is-active' : ''}`}
          aria-pressed={isAnnual}
          onClick={() => setBillingPeriod('annual')}
        >
          Plan anual
        </button>
      </div>
      <section className="sitios-web-plans menu-digital-plans" aria-label="Planes de menú digital">
        {plans.map((service) => <ServiceCard key={service.title} service={service} />)}
      </section>
      <Faq id="preguntas-frecuentes-menu-digital" questions={digitalMenuFaqQuestions} animateOnView />
    </section>
  )
}

export default MenuDigital
