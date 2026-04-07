import { Outlet } from 'react-router-dom'
import { IconSidebar } from './IconSidebar'
import { PersonaToggle } from './PersonaToggle'

export function DynatraceShell() {
  return (
    <div style={styles.shell}>
      <IconSidebar />
      <main style={styles.content}>
        <Outlet />
      </main>
      <PersonaToggle />
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    display: 'flex', height: '100vh', width: '100vw',
    background: 'var(--dt-bg-base)',
    color: 'var(--dt-text-primary)',
    fontFamily: 'var(--dt-font-body)',
    overflow: 'hidden',
  },
  content: {
    flex: 1, overflow: 'auto',
    display: 'flex', flexDirection: 'column',
    width: '100%',
  },
}
