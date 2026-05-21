import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'

interface MotorcycleFiltersProps {
  search: string
  minPrice: string
  maxPrice: string
  year: string
  maxKm: string
  engineCapacity: string
  status: string
  sortBy: string
  onlyAvailable: boolean
  onChange: (field: string, value: string | boolean) => void
  onReset: () => void
}

const MotorcycleFilters = ({
  search,
  minPrice,
  maxPrice,
  year,
  maxKm,
  engineCapacity,
  status,
  sortBy,
  onlyAvailable,
  onChange,
  onReset,
}: MotorcycleFiltersProps) => (
  <Box bg="surface.800" p={6} rounded="3xl" border="1px solid" borderColor="whiteAlpha.100">
    <Stack spacing={4}>
      <HStack spacing={4} wrap="wrap">
        <FormControl flex={1} minW="200px">
          <FormLabel>Marca / Modelo</FormLabel>
          <Input value={search} placeholder="Ex: Honda, Fazer" onChange={(e) => onChange('search', e.target.value)} />
        </FormControl>
        <FormControl minW="140px">
          <FormLabel>Preço mínimo</FormLabel>
          <Input
            type="number"
            value={minPrice}
            placeholder="R$"
            onChange={(e) => onChange('minPrice', e.target.value)}
          />
        </FormControl>
        <FormControl minW="140px">
          <FormLabel>Preço máximo</FormLabel>
          <Input
            type="number"
            value={maxPrice}
            placeholder="R$"
            onChange={(e) => onChange('maxPrice', e.target.value)}
          />
        </FormControl>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        <FormControl>
          <FormLabel>Ano</FormLabel>
          <Input type="number" value={year} placeholder="2024" onChange={(e) => onChange('year', e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Km máximo</FormLabel>
          <Input type="number" value={maxKm} placeholder="Km" onChange={(e) => onChange('maxKm', e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Cilindrada</FormLabel>
          <Input
            type="number"
            value={engineCapacity}
            placeholder="250"
            onChange={(e) => onChange('engineCapacity', e.target.value)}
          />
        </FormControl>
      </SimpleGrid>

      <HStack spacing={4} wrap="wrap">
        <FormControl minW="160px">
          <FormLabel>Status</FormLabel>
          <Select value={status} onChange={(e) => onChange('status', e.target.value)}>
            <option value="">Todos</option>
            <option value="disponivel">Disponível</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
          </Select>
        </FormControl>
        <FormControl minW="160px">
          <FormLabel>Ordenar por</FormLabel>
          <Select value={sortBy} onChange={(e) => onChange('sortBy', e.target.value)}>
            <option value="recent">Mais recentes</option>
            <option value="priceLow">Menor preço</option>
            <option value="priceHigh">Maior preço</option>
            <option value="kmLow">Menor km</option>
            <option value="yearNew">Ano mais novo</option>
          </Select>
        </FormControl>
      </HStack>

      <HStack spacing={3} justify="space-between">
        <Button size="md" colorScheme="brand" onClick={() => onChange('onlyAvailable', !onlyAvailable)}>
          {onlyAvailable ? 'Mostrar todos' : 'Somente disponíveis'}
        </Button>
        <Button variant="outline" onClick={onReset}>
          Limpar filtros
        </Button>
      </HStack>
    </Stack>
  </Box>
)

export default MotorcycleFilters
