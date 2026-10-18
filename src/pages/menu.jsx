import { useState } from 'react'
import { QrCode, PanelsTopLeft, ListChecks, Palette } from 'lucide-react'
import menuImage from '../assets/menu.png'
import menuImageTwo from '../assets/menu2.png'
import ServiceCard from '../components/service-card.jsx'
import WebsiteBenefits from '../components/website-benefits.jsx'

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
    title: 'Carta completa',
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
    </section>
  )
}

export default MenuDigital
