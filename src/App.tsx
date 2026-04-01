import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { PrototypeView } from './components/PrototypeView'
import { Home } from './components/Home'
import { navigation } from './data/navigation'

function App() {
  const allItems = navigation.flatMap((s) => s.items)

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {allItems.map((item) => (
          <Route
            key={item.id}
            path={item.path}
            element={
              <PrototypeView
                src={item.prototypeSrc}
                title={item.label}
                description={item.description}
              />
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
