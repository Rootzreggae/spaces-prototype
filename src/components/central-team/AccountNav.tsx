const navLinks = ['Home', 'Subscription', 'Contracts', 'Identity & access management', 'Lens', 'Lens (new)', 'Settings']

export function AccountNav() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <div style={styles.logo}>
          <div style={{ width: 22, height: 22, borderRadius: 4, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
          <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--dt-text-primary)' }}>Account Management</span>
        </div>
        <div style={styles.links}>
          {navLinks.map((link) => (
            <span key={link} style={{ ...styles.link, ...(link === 'Settings' ? styles.linkActive : {}) }}>
              {link}
              {['Subscription', 'Identity & access management', 'Lens', 'Settings'].includes(link) && (
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              )}
            </span>
          ))}
        </div>
      </div>
      <div style={styles.right}>
        <button style={styles.supportBtn}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Support Information
        </button>
        {[1, 2, 3].map((i) => (
          <button key={i} style={styles.iconBtn}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />}
              {i === 2 && <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35" /><circle cx="12" cy="12" r="3" strokeWidth="2" /></>}
              {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />}
            </svg>
          </button>
        ))}
      </div>
    </nav>
  )
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 24px', height: 56, background: 'var(--dt-bg-surface)',
    borderBottom: '1px solid #2a2a4a', position: 'sticky', top: 0, zIndex: 50,
  },
  left: { display: 'flex', alignItems: 'center', gap: 24 },
  logo: { display: 'flex', alignItems: 'center', gap: 10 },
  links: { display: 'flex', alignItems: 'center', gap: 2 },
  link: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '8px 14px', borderRadius: 6, fontSize: 13, color: 'var(--dt-text-muted)',
    cursor: 'pointer', transition: 'all 150ms', whiteSpace: 'nowrap',
  },
  linkActive: { background: 'rgba(255,255,255,0.1)', color: 'var(--dt-text-primary)' },
  right: { display: 'flex', alignItems: 'center', gap: 8 },
  supportBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500,
    background: 'rgba(59,130,246,0.15)', color: 'var(--dt-accent-hover)', border: '1px solid rgba(59,130,246,0.3)',
    cursor: 'pointer', fontFamily: 'inherit',
  },
  iconBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 36, height: 36, borderRadius: 6, border: 'none',
    background: 'transparent', color: 'var(--dt-text-muted)', cursor: 'pointer',
  },
}
