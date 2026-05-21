import {
  Box,
  Button,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import { ChevronRight } from 'lucide-react'
import MotorcycleFilters from './MotorcycleFilters'

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
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

const FilterDrawer = ({
  isOpen,
  onClose,
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
}: FilterDrawerProps) => {
  const bg = useColorModeValue('white', 'surface.800')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  const cardBg = useColorModeValue('white', 'surface.800')

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={{ base: 'xs', md: 'sm' }}>
        <DrawerOverlay backdropFilter="blur(12px)" bg="blackAlpha.400" />
        <DrawerContent bg={bg} borderRight="1px solid" borderColor={borderColor}>
          <DrawerCloseButton mt={2} />
          <DrawerHeader pt={8}>Filtros</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Text color="gray.500" fontSize="sm">
                Refine sua busca para encontrar a moto perfeita.
              </Text>
              <MotorcycleFilters
                search={search}
                minPrice={minPrice}
                maxPrice={maxPrice}
                year={year}
                maxKm={maxKm}
                engineCapacity={engineCapacity}
                status={status}
                sortBy={sortBy}
                onlyAvailable={onlyAvailable}
                onChange={onChange}
                onReset={onReset}
              />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default FilterDrawer
