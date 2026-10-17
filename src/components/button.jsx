import { ArrowRight } from 'lucide-react'

function Button({
  variant = 'dark',
  href = '#contacto',
  icon: Icon,
  trailingIcon: TrailingIcon = ArrowRight,
  children = 'Contactanos',
  onClick,
  target,
  rel,
}) {
  return (
    <a
      className={`action-button action-button--${variant}${Icon ? ' has-leading-icon' : ''}`}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
    >
      {Icon && <Icon className="action-button-leading-icon" size={20} strokeWidth={2} aria-hidden="true" />}
      <span>{children}</span>
      <TrailingIcon className="action-button-icon" size={32} strokeWidth={2} aria-hidden="true" />
    </a>
  )
}

export default Button
