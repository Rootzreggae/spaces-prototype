import { useRef, useState, useEffect, useCallback } from 'react'

interface Props {
  src: string
  title: string
  description?: string
}

export function PrototypeView({ src, title, description }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [wrapperWidth, setWrapperWidth] = useState(0)

  const measure = useCallback(() => {
    if (wrapperRef.current) {
      setWrapperWidth(wrapperRef.current.clientWidth)
    }
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <div style={styles.container}>
      {/* Header bar */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h2 style={styles.title}>{title}</h2>
          {description && <p style={styles.description}>{description}</p>}
        </div>
        <div style={styles.headerRight}>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.openLink}
          >
            Open fullscreen ↗
          </a>
        </div>
      </div>

      {/* Prototype iframe — rendered at full width, no scaling */}
      <div ref={wrapperRef} style={styles.iframeWrapper}>
        {wrapperWidth > 0 && (
          <iframe
            ref={iframeRef}
            src={src}
            title={title}
            style={{
              width: `${wrapperWidth}px`,
              height: '100%',
              border: 'none',
              background: '#0f0f1a',
            }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    background: '#111122',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    minHeight: 52,
    flexShrink: 0,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    color: '#e5e5e5',
    margin: 0,
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  openLink: {
    fontSize: 12,
    color: '#3b82f6',
    textDecoration: 'none',
    padding: '6px 12px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    borderRadius: 6,
    transition: 'all 0.15s',
  },
  iframeWrapper: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative' as const,
  },
}
