function SidebarItems({ icon: Icon, label, shortLabel, href, active = false, onClick }) {
  const labelContent = shortLabel ? (
    <>
      <span className="sidebar-item-label sidebar-item-label--desktop">{label}</span>
      <span className="sidebar-item-label sidebar-item-label--mobile">{shortLabel}</span>
    </>
  ) : (
    <span className="sidebar-item-label">{label}</span>
  )

  if (!href) {
    return (
      <button
        type="button"
        className={`sidebar-item${active ? ' is-active' : ''}`}
        aria-current={active ? 'page' : undefined}
        onClick={onClick}
      >
        <Icon className="sidebar-item-icon" size={17} strokeWidth={1.7} aria-hidden="true" />
        {labelContent}
      </button>
    )
  }

  return (
    <a
      className={`sidebar-item${active ? ' is-active' : ''}`}
      href={href}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      <Icon className="sidebar-item-icon" size={17} strokeWidth={1.7} aria-hidden="true" />
      {labelContent}
    </a>
  )
}

export default SidebarItems
