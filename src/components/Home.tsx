import { NavLink } from 'react-router-dom'
import { navigation } from '../data/navigation'

export function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.hero}>
          <h1 style={styles.heading}>Dynatrace Spaces</h1>
          <p style={styles.subtitle}>
            Interactive prototype exploring the permission governance layer for
            enterprise observability. Select a role to explore the experience.
          </p>
        </div>

        <div style={styles.grid}>
          {navigation.map((section) => (
            <div key={section.role} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.cardIcon}>{section.icon}</span>
                <h3 style={styles.cardTitle}>{section.label}</h3>
              </div>
              <div style={styles.cardItems}>
                {section.items.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    style={styles.cardLink}
                  >
                    <span style={styles.linkLabel}>{item.label}</span>
                    <span style={styles.linkArrow}>→</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={styles.footer}>
          Designed by Nilson Gaspar · Lead Product Designer · 2025–2026
        </p>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    padding: '60px 40px',
  },
  content: {
    maxWidth: 1000,
    width: '100%',
  },
  hero: {
    marginBottom: 60,
  },
  heading: {
    fontSize: 48,
    fontWeight: 700,
    letterSpacing: '-0.03em',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 1.6,
    color: '#9ca3af',
    maxWidth: 600,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 24,
    marginBottom: 60,
  },
  card: {
    background: '#111122',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    overflow: 'hidden',
    transition: 'border-color 0.2s',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '24px 24px 16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#e5e5e5',
    margin: 0,
  },
  cardItems: {
    padding: '8px 0',
  },
  cardLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 24px',
    textDecoration: 'none',
    color: '#9ca3af',
    fontSize: 13,
    transition: 'all 0.15s',
  },
  linkLabel: {},
  linkArrow: {
    opacity: 0.4,
    transition: 'opacity 0.15s',
  },
  footer: {
    fontSize: 13,
    color: '#4b5563',
    textAlign: 'center' as const,
  },
}
