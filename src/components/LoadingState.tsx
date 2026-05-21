import { Center, Spinner, Stack, Text } from '@chakra-ui/react'

const LoadingState = () => (
  <Center py={24}>
    <Stack align="center" spacing={4}>
      <Spinner size="xl" color="brand.400" />
      <Text>Carregando motos e informações...</Text>
    </Stack>
  </Center>
)

export default LoadingState
