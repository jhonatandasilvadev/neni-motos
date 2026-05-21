import { useEffect, useState } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import MotorcycleDetailsPage from './pages/MotorcycleDetailsPage'
import LocationPage from './pages/LocationPage'
import AdminLayout from './components/AdminLayout'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminMotorcycleListPage from './pages/admin/AdminMotorcycleListPage'
import AdminMotorcycleFormPage from './pages/admin/AdminMotorcycleFormPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'
import { isAdminLoggedIn } from './services/authService'
import { getStoreSettings, applyPrimaryColor } from './services/settingsService'

const ProtectedAdminRoute = ({ element }: { element: React.ReactNode }) => {
  return isAdminLoggedIn() ? <>{element}</> : <Navigate to="/dashboard/login" replace />
}

function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const bg = useColorModeValue('surface.50', 'surface.900')

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getStoreSettings()
      applyPrimaryColor(settings.primary_color ?? '#ad6826')
    }
    void loadSettings()
  }, [])

  return (
    <Box minH="100vh" bg={bg}>
      <Header onOpenFilters={() => setIsFilterOpen(true)} />
      <Box as="main" pt={{ base: 24, md: 28 }}>
        <Routes>
          <Route
            path="/"
            element={<HomePage isFilterOpen={isFilterOpen} onOpenFilter={() => setIsFilterOpen(true)} onCloseFilter={() => setIsFilterOpen(false)} />}
          />
          <Route path="/moto/:id" element={<MotorcycleDetailsPage />} />
          <Route path="/localizacao" element={<LocationPage />} />
          <Route path="/dashboard/login" element={<AdminLoginPage />} />
          <Route path="/dashboard" element={<ProtectedAdminRoute element={<AdminLayout />} />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="motos" element={<AdminMotorcycleListPage />} />
            <Route path="motos/nova" element={<AdminMotorcycleFormPage />} />
            <Route path="motos/:id/editar" element={<AdminMotorcycleFormPage />} />
            <Route path="configuracoes" element={<AdminSettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
          <Route path="/admin" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
      <Footer />
      <WhatsAppButton />
    </Box>
  )
}

export default App
