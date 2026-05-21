import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Text,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { getMotorcycles, deleteMotorcycle } from '../../services/motorcycleService'
import type { Motorcycle } from '../../types'

const AdminMotorcycleListPage = () => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const cardBg = useColorModeValue('white', 'surface.800')
  const cardBorder = useColorModeValue('gray.200', 'whiteAlpha.100')

  useEffect(() => {
    const load = async () => {
      const bikes = await getMotorcycles()
      setMotorcycles(bikes)
      setIsLoading(false)
    }
    void load()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Deseja excluir esta moto?')
    if (!confirmed) return
    const success = await deleteMotorcycle(id)
    if (success) {
      setMotorcycles((prev) => prev.filter((item) => item.id !== id))
      toast({ title: 'Moto excluída.', status: 'success', duration: 3000, isClosable: true })
    } else {
      toast({ title: 'Erro ao excluir.', status: 'error', duration: 4000, isClosable: true })
    }
  }

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color="brand.200">
          Motos
        </Heading>
        <Button as={RouterLink} to="/dashboard/motos/nova" colorScheme="brand">
          Nova moto
        </Button>
      </Flex>
      <Box bg={cardBg} rounded="3xl" border="1px solid" borderColor={cardBorder} p={6}>
        {isLoading ? (
          <Text>Carregando motos...</Text>
        ) : motorcycles.length === 0 ? (
          <Text>Nenhuma moto cadastrada ainda.</Text>
        ) : (
          <Table variant="simple" colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Modelo</Th>
                <Th>Ano</Th>
                <Th>Cor</Th>
                <Th>Status</Th>
                <Th>Preço</Th>
                <Th>Km</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {motorcycles.map((motorcycle) => (
                <Tr key={motorcycle.id}>
                  <Td>{`${motorcycle.brand} ${motorcycle.model}`}</Td>
                  <Td>{motorcycle.year}</Td>
                  <Td>{motorcycle.color}</Td>
                  <Td>
                    <Badge colorScheme={motorcycle.status === 'disponivel' ? 'green' : motorcycle.status === 'reservado' ? 'orange' : 'red'}>
                      {motorcycle.status}
                    </Badge>
                  </Td>
                  <Td>R$ {motorcycle.price.toLocaleString('pt-BR')}</Td>
                  <Td>{motorcycle.mileage.toLocaleString('pt-BR')} km</Td>
                  <Td>
                    <Stack direction="row" spacing={2}>
                      <Button size="sm" as={RouterLink} to={`/dashboard/motos/${motorcycle.id}/editar`}>
                        Editar
                      </Button>
                      <Button size="sm" colorScheme="red" variant="outline" onClick={() => handleDelete(motorcycle.id)}>
                        Excluir
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  )
}

export default AdminMotorcycleListPage
