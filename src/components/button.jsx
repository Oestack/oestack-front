import { ArrowRight } from 'lucide-react'

function Button({
  variant = 'dark',
  href = '#contacto',
  icon: Icon,
  children = 'Contactanos',
}) {
  return (
    <a
      className={`action-button action-button--${variant}${Icon ? ' has-leading-icon' : ''}`}
      href={href}
    >
      {Icon && <Icon className="action-button-leading-icon" size={20} strokeWidth={2} aria-hidden="true" />}
      <span>{children}</span>
      <ArrowRight className="action-button-icon" size={32} strokeWidth={2} aria-hidden="true" />
    </a>
  )
}

export default Button
