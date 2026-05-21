import { Box, Heading, Text } from '@chakra-ui/react'

interface EmptyStateProps {
  title?: string
  description?: string
}

const EmptyState = ({
  title = 'Nenhuma moto encontrada',
  description = 'Ajuste os filtros ou tente outra busca para ver as motos disponíveis.',
}: EmptyStateProps) => (
  <Box textAlign="center" py={20}>
    <Heading size="lg" mb={3} color="brand.200">
      {title}
    </Heading>
    <Text color="whiteAlpha.700">{description}</Text>
  </Box>
)

export default EmptyState
