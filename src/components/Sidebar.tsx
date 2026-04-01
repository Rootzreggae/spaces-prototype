import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navigation } from '../data/navigation'

export function Sidebar() {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    const currentRole = navigation.find((s) =>
      s.items.some((i) => i.path === location.pathname)
    )
    return new Set(currentRole ? [currentRole.role] : ['central-team'])
  })

  const toggleSection = (role: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(role)) {
        next.delete(role)
      } else {
        next.add(role)
      }
      return next
    })
  }

  return (
    <aside style={styles.sidebar}>
      {/* Logo */}
      <NavLink to="/" style={styles.logo}>
        <span style={styles.logoIcon}>◇</span>
        <span style={styles.logoText}>Spaces Prototype</span>
      </NavLink>

      {/* Navigation */}
      <nav style={styles.nav}>
        {navigation.map((section) => {
          const isExpanded = expandedSections.has(section.role)
          const hasActiveItem = section.items.some(
            (i) => i.path === location.pathname
          )

          return (
            <div key={section.role} style={styles.section}>
              <button
                onClick={() => toggleSection(section.role)}
                style={{
                  ...styles.sectionHeader,
                  color: hasActiveItem ? '#3b82f6' : '#9ca3af',
                }}
              >
                <span style={styles.sectionIcon}>{section.icon}</span>
                <span style={styles.sectionLabel}>{section.label}</span>
                <span
                  style={{
                    ...styles.chevron,
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                >
                  ›
                </span>
              </button>

              {isExpanded && (
                <div style={styles.items}>
                  {section.items.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      style={({ isActive }) => ({
                        ...styles.item,
                        background: isActive
                          ? 'rgba(59, 130, 246, 0.15)'
                          : 'transparent',
                        color: isActive ? '#3b82f6' : '#9ca3af',
                        borderLeft: isActive
                          ? '2px solid #3b82f6'
                          : '2px solid transparent',
                      })}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={styles.footer}>
        <span style={styles.footerText}>Nilson Gaspar</span>
        <span style={styles.footerSub}>Dynatrace Spaces Initiative</span>
      </div>
    </aside>
  )
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 260,
    minWidth: 260,
    height: '100vh',
    background: '#0a0a14',
    borderRight: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '20px 20px 16px',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  },
  logoIcon: {
    fontSize: 20,
    color: '#3b82f6',
  },
  logoText: {
    fontSize: 14,
    fontWeight: 600,
    color: '#e5e5e5',
    letterSpacing: '0.02em',
  },
  nav: {
    flex: 1,
    overflow: 'auto',
    padding: '12px 0',
  },
  section: {
    marginBottom: 4,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    padding: '10px 20px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    fontFamily: 'inherit',
    transition: 'color 0.2s',
  },
  sectionIcon: {
    fontSize: 14,
  },
  sectionLabel: {
    flex: 1,
    textAlign: 'left' as const,
  },
  chevron: {
    fontSize: 16,
    transition: 'transform 0.2s',
  },
  items: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 1,
  },
  item: {
    display: 'block',
    padding: '8px 20px 8px 48px',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 400,
    transition: 'all 0.15s',
    lineHeight: 1.4,
  },
  footer: {
    padding: '16px 20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 2,
  },
  footerText: {
    fontSize: 13,
    fontWeight: 500,
    color: '#e5e5e5',
  },
  footerSub: {
    fontSize: 11,
    color: '#6b7280',
  },
}
