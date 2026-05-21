import { useEffect, useState } from 'react'
import { Box, Grid, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text, useColorModeValue } from '@chakra-ui/react'
import { getMotorcycles, getStatusCounts } from '../../services/motorcycleService'

const AdminDashboardPage = () => {
  const [total, setTotal] = useState(0)
  const [available, setAvailable] = useState(0)
  const [reserved, setReserved] = useState(0)
  const [sold, setSold] = useState(0)
  const [featured, setFeatured] = useState(0)

  useEffect(() => {
    const load = async () => {
      const bikes = await getMotorcycles()
      const summary = getStatusCounts(bikes)
      setTotal(summary.total)
      setAvailable(summary.disponivel)
      setReserved(summary.reservado)
      setSold(summary.vendido)
      setFeatured(summary.featured)
    }
    void load()
  }, [])

  const cardBg = useColorModeValue('white', 'surface.800')
  const cardBorder = useColorModeValue('gray.200', 'whiteAlpha.100')
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.900')

  return (
    <Box>
      <Heading size="lg" mb={6} color="brand.200">
        Resumo do painel
      </Heading>
      <Text mb={4} color={textColor}>
        Acompanhe o catálogo, motos disponíveis e as oportunidades de destaque.
      </Text>
      <Grid templateColumns={{ base: '1fr', md: 'repeat(5, 1fr)' }} gap={4}>
        {[
          { label: 'Total', value: total, note: 'Motos cadastradas' },
          { label: 'Disponíveis', value: available, note: 'Prontas para venda' },
          { label: 'Reservadas', value: reserved, note: 'Em atendimento' },
          { label: 'Vendidas', value: sold, note: 'Finalizadas' },
          { label: 'Destaque', value: featured, note: 'Selecionadas' },
        ].map((item) => (
          <Box key={item.label} bg={cardBg} p={6} rounded="3xl" border="1px solid" borderColor={cardBorder}>
            <Stat color={textColor}>
              <StatLabel>{item.label}</StatLabel>
              <StatNumber>{item.value}</StatNumber>
              <StatHelpText>{item.note}</StatHelpText>
            </Stat>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default AdminDashboardPage
