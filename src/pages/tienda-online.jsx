import { CreditCard, ListChecks, Package, ShoppingCart } from 'lucide-react'
import ecommerceImage from '../assets/e-commerce.png'
import ecommerceImageTwo from '../assets/e-commerce2.png'
import ServiceCard from '../components/service-card.jsx'
import WebsiteBenefits from '../components/website-benefits.jsx'

const ecommerceBenefits = [
  {
    title: 'Catálogo organizado',
    description: 'Mostrá tus productos con imágenes, descripciones, precios y categorías para que tus clientes encuentren fácilmente lo que buscan.',
    Icon: ListChecks,
  },
  {
    title: 'Compra simple y rápida',
    description: 'Incorporamos un carrito de compras y un proceso de pedido claro para que comprar desde la tienda sea fácil e intuitivo.',
    Icon: ShoppingCart,
  },
  {
    title: 'Gestión de productos',
    description: 'Administrá precios, stock y variantes como talles, colores o modelos desde un panel de administración.',
    Icon: Package,
  },
  {
    title: 'Más formas de vender',
    description: 'Preparamos tu tienda para gestionar pedidos e incorporar medios de pago y opciones de envío según las necesidades de tu negocio y el plan contratado.',
    Icon: CreditCard,
  },
]

const ecommercePlans = [
  {
    title: 'Tienda Online Básica',
    description: 'Ideal para emprendimientos y negocios que quieren comenzar a vender online con una tienda propia, un catálogo organizado y las herramientas esenciales para administrar sus productos.',
    price: '$400.000',
    includes: [
      'Diseño personalizado y adaptable a dispositivos.',
      'Catálogo con carga inicial de hasta 40 productos.',
      'Categorías y variantes de productos.',
      'Carrito de compras.',
      'Pedidos a través de WhatsApp.',
      'Dominio y hosting durante el primer año.',
    ],
  },
  {
    title: 'Tienda Online Completa',
    description: 'Ideal para negocios que necesitan un catálogo más amplio y herramientas adicionales para facilitar la búsqueda de productos y gestionar sus ventas.',
    price: '$600.000',
    featured: true,
    includes: [
      'Diseño personalizado y adaptable a dispositivos.',
      'Catálogo con carga inicial de hasta 60 productos.',
      'Categorías, variantes y gestión de stock.',
      'Carrito de compras y gestión de pedidos.',
      'Panel de administración para gestionar productos y pedidos.',
      'Buscador y filtros de productos.',
      'Integración con medios de pago online.',
      'Configuración de opciones de envío.',
      'SEO técnico básico y certificado SSL.',
      'Dominio y hosting durante el primer año.',
    ],
  },
]

function TiendaOnline() {
  return (
    <section className="projects-section projects-section--visible sitios-web-page" aria-labelledby="tienda-online-title">
      <h1 className="sitios-web-title" id="tienda-online-title">
        Tienda Online
      </h1>
      <p className="projects-subtitle sitios-web-subtitle">
        <span className="projects-subtitle-lead">Una tienda</span>
        <span className="projects-subtitle-accent">sin límites</span>
      </p>
      <WebsiteBenefits
        benefits={ecommerceBenefits}
        images={[
          {
            src: ecommerceImage,
            alt: 'Vista de una tienda online en una computadora',
            objectPosition: 'center',
          },
          {
            src: ecommerceImageTwo,
            alt: 'Vista alternativa de una tienda online',
            objectPosition: 'center',
          },
        ]}
        primaryAction={{
          label: 'Ver precios',
          href: '#planes-tienda-online',
          variant: 'yellow',
        }}
        secondaryAction={{ label: 'Contactanos', href: '/#contacto' }}
      />
      <section className="sitios-web-plans" id="planes-tienda-online" aria-label="Planes de tienda online">
        {ecommercePlans.map((service) => <ServiceCard key={service.title} service={service} />)}
      </section>
    </section>
  )
}

export default TiendaOnline
