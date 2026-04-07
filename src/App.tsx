import { Routes, Route, Navigate } from 'react-router-dom'
import { DynatraceShell } from './components/shell/DynatraceShell'
import { Home } from './components/Home'
import { CommandCenter } from './components/central-team/CommandCenter'
import { CreateWizard } from './components/central-team/CreateWizard'
import { SpacesLanding } from './components/spaces/SpacesLanding'
import { Dashboards } from './components/practitioner/Dashboards'
import { Problems } from './components/practitioner/Problems'
import { BeforeAfter } from './components/practitioner/BeforeAfter'
import { Placeholder } from './components/shared/Placeholder'
import { SettingsLanding } from './components/settings/SettingsLanding'
import { SettingsCategory } from './components/settings/SettingsCategory'
import { SettingsOverrides } from './components/settings/SettingsOverrides'
import { SettingsSchema } from './components/settings/SettingsSchema'

function App() {
  return (
    <Routes>
      <Route element={<DynatraceShell />}>
        <Route path="/" element={<Home />} />

        {/* Spaces app */}
        <Route path="/spaces" element={<SpacesLanding />} />
        <Route path="/spaces/create" element={<CreateWizard />} />
        <Route path="/spaces/manage" element={<CommandCenter />} />

        {/* Settings app */}
        <Route path="/settings" element={<SettingsLanding />} />
        <Route path="/settings/category/:id" element={<SettingsCategory />} />
        <Route path="/settings/category/:categoryId/:schemaId" element={<SettingsSchema />} />
        <Route path="/settings/overrides" element={<SettingsOverrides />} />

        {/* Other apps */}
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/problems" element={<Problems />} />
        <Route path="/before-after" element={<BeforeAfter />} />

        {/* Placeholders */}
        <Route path="/search" element={<Placeholder title="Search" description="Unified search across the environment." />} />
        <Route path="/apps" element={<Placeholder title="Apps" description="App grid launcher." />} />
        <Route path="/notebooks" element={<Placeholder title="Notebooks" description="Space-scoped notebooks." />} />
        <Route path="/releases" element={<Placeholder title="Releases" description="Deployment tracking." />} />
        <Route path="/workflows" element={<Placeholder title="Workflows" description="Automated workflows." />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
