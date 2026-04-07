interface Props {
  title: string
  description: string
}

export function Placeholder({ title, description }: Props) {
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 16, padding: 40,
    }}>
      <h2 style={{ fontSize: 28, fontWeight: 600, color: 'var(--dt-text-primary)' }}>{title}</h2>
      <p style={{ fontSize: 16, color: 'var(--dt-text-muted)', maxWidth: 500, textAlign: 'center', lineHeight: 1.6 }}>
        {description}
      </p>
      <span style={{ fontSize: 12, color: 'var(--dt-text-faint)', marginTop: 16 }}>Building this screen...</span>
    </div>
  )
}
