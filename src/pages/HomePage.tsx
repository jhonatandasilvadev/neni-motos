import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Container, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import FilterDrawer from '../components/FilterDrawer'
import MotorcycleGrid from '../components/MotorcycleGrid'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import { getMotorcycles, filterMotorcycles } from '../services/motorcycleService'
import { getStoreSettings } from '../services/settingsService'
import type { Motorcycle, StoreSettings } from '../types'

interface HomePageProps {
  isFilterOpen: boolean
  onOpenFilter: () => void
  onCloseFilter: () => void
}

const MotionBox = motion(Box)

const HomePage = ({ isFilterOpen, onOpenFilter, onCloseFilter }: HomePageProps) => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([])
  const [settings, setSettings] = useState<StoreSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    maxKm: '',
    engineCapacity: '',
    status: '',
    sortBy: 'recent',
    onlyAvailable: false,
  })

  useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      const [motorcycleList, store] = await Promise.all([getMotorcycles(), getStoreSettings()])
      setMotorcycles(motorcycleList)
      setSettings(store)
      setIsLoading(false)
    }
    void load()
  }, [])

  const filteredMotorcycles = useMemo(
    () =>
      filterMotorcycles(motorcycles, {
        search: filters.search,
        minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
        year: filters.year ? Number(filters.year) : undefined,
        maxKm: filters.maxKm ? Number(filters.maxKm) : undefined,
        engineCapacity: filters.engineCapacity ? Number(filters.engineCapacity) : undefined,
        status: filters.status ? (filters.status as any) : undefined,
        onlyAvailable: filters.onlyAvailable,
        sortBy: filters.sortBy as any,
      }),
    [filters, motorcycles],
  )

  const accent = useColorModeValue('brand.500', 'brand.300')
  const heroBg = useColorModeValue('gray.50', 'surface.900')

  return (
    <>
      <Helmet>
        <title>Neni Motos | Catálogo de motos</title>
        <meta
          name="description"
          content="Neni Motos apresenta uma seleção de motos em Joinville. Filtro inteligente, layout moderno e contato direto pelo WhatsApp."
        />
      </Helmet>

      <Box bg={heroBg} pb={{ base: 10, md: 16 }}>
        <Box pt={{ base: 6, md: 10 }} pb={{ base: 10, md: 20 }}>
          <Container maxW="7xl">
            <Flex direction={{ base: 'column', md: 'row' }} align="flex-start" justify="space-between" gap={8}>
              <Stack spacing={5} maxW={{ base: '100%', md: '520px' }}>
                <Heading size="2xl" lineHeight="1.05">
                  {settings?.home_title ?? 'Sua próxima moto está aqui.'}
                </Heading>
                <Text fontSize="lg" maxW="2xl" color={useColorModeValue('gray.600', 'whiteAlpha.700')}>
                  {settings?.home_subtitle ?? 'Explore uma seleção sofisticada de motocicletas para todos os estilos. Design premium, usabilidade moderna e contato direto via WhatsApp.'}
                </Text>
                <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
                  <Button size="lg" colorScheme="brand" onClick={onOpenFilter}>
                    Filtrar
                  </Button>
                  <Button
                    as="a"
                    href={
                      settings?.whatsapp
                        ? `https://api.whatsapp.com/send?phone=${encodeURIComponent(settings.whatsapp)}&text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20as%20motos`
                        : 'https://api.whatsapp.com/send?phone=5547997055451&text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20as%20motos'
                    }
                    target="_blank"
                    rel="noreferrer"
                    size="lg"
                    variant="outline"
                  >
                    WhatsApp
                  </Button>
                </Stack>
              </Stack>
              <Box flex="1" minW="0">
                <Box
                  bg={useColorModeValue('white', 'surface.800')}
                  border="1px solid"
                  borderColor={useColorModeValue('gray.200', 'whiteAlpha.100')}
                  borderRadius="3xl"
                  p={8}
                  boxShadow="xl"
                >
                  <Text fontWeight="semibold" color={useColorModeValue('gray.600', 'whiteAlpha.700')} mb={4}>
                    Autos selecionados
                  </Text>
                  <Text fontSize="3xl" fontWeight="black" color={accent} mb={2}>
                    {filteredMotorcycles.length}
                  </Text>
                  <Text color={useColorModeValue('gray.600', 'whiteAlpha.700')}>Veículos disponíveis após aplicar seus filtros rápidos.</Text>
                </Box>
              </Box>
            </Flex>
          </Container>
        </Box>

        <Container maxW="7xl">
          {isLoading ? (
            <LoadingState />
          ) : filteredMotorcycles.length === 0 ? (
            <EmptyState />
          ) : (
            <MotionBox initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={3}>
                <Text color={useColorModeValue('gray.600', 'whiteAlpha.700')}>{filteredMotorcycles.length} motos encontradas</Text>
                <Button variant="ghost" size="sm" onClick={onOpenFilter}>
                  Ajustar filtros
                </Button>
              </Flex>
              <MotorcycleGrid motorcycles={filteredMotorcycles} />
            </MotionBox>
          )}
        </Container>
      </Box>

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={onCloseFilter}
        search={filters.search}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        year={filters.year}
        maxKm={filters.maxKm}
        engineCapacity={filters.engineCapacity}
        status={filters.status}
        sortBy={filters.sortBy}
        onlyAvailable={filters.onlyAvailable}
        onChange={(field, value) => setFilters((prev) => ({ ...prev, [field]: value }))}
        onReset={() =>
          setFilters({
            search: '',
            minPrice: '',
            maxPrice: '',
            year: '',
            maxKm: '',
            engineCapacity: '',
            status: '',
            sortBy: 'recent',
            onlyAvailable: false,
          })
        }
      />
    </>
  )
}

export default HomePage
