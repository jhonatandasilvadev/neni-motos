import { SimpleGrid } from '@chakra-ui/react'
import type { Motorcycle } from '../types'
import MotorcycleCard from './MotorcycleCard'

interface MotorcycleGridProps {
  motorcycles: Motorcycle[]
}

const MotorcycleGrid = ({ motorcycles }: MotorcycleGridProps) => (
  <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
    {motorcycles.map((motorcycle) => (
      <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
    ))}
  </SimpleGrid>
)

export default MotorcycleGrid
