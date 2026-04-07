import type { CSSProperties, ReactNode } from 'react'

interface Props {
  children: ReactNode
  interactive?: boolean
  selected?: boolean
  accentColor?: string
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  style?: CSSProperties
}

const paddings = { sm: 16, md: 20, lg: 28 }

export function DataCard({ children, interactive, selected, accentColor, padding = 'md', onClick, style }: Props) {
  const s: CSSProperties = {
    background: 'var(--dt-bg-nav)',
    border: `1px solid ${selected ? 'var(--dt-accent-blue)' : 'var(--dt-border-subtle)'}`,
    borderRadius: 'var(--dt-radius-2xl)',
    padding: paddings[padding],
    cursor: interactive ? 'pointer' : undefined,
    transition: 'border-color 0.2s, transform 0.2s',
    borderLeft: accentColor ? `3px solid ${accentColor}` : undefined,
    ...style,
  }
  return (
    <div
      style={s}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (interactive) e.currentTarget.style.borderColor = 'var(--dt-border-strong)'
      }}
      onMouseLeave={(e) => {
        if (interactive && !selected) e.currentTarget.style.borderColor = 'var(--dt-border-subtle)'
      }}
    >
      {children}
    </div>
  )
}
