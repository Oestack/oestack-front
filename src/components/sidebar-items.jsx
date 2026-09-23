function SidebarItems({ icon: Icon, label, href, active = false }) {
  return (
    <a
      className={`sidebar-item${active ? ' is-active' : ''}`}
      href={href}
      aria-current={active ? 'page' : undefined}
    >
      <Icon className="sidebar-item-icon" size={17} strokeWidth={1.7} aria-hidden="true" />
      <span>{label}</span>
    </a>
  )
}

export default SidebarItems
