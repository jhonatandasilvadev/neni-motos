import { Box, Button, Flex, Heading, Link as ChakraLink, Stack, useColorModeValue } from '@chakra-ui/react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../services/authService'

const AdminLayout = () => {
  const navigate = useNavigate()
  const bg = useColorModeValue('white', 'surface.800')
  const border = useColorModeValue('gray.200', 'whiteAlpha.100')

  const handleLogout = () => {
    logoutAdmin()
    navigate('/dashboard/login')
  }

  return (
    <Box minH="80vh" py={{ base: 6, md: 10 }}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Stack spacing={6} mb={8} bg={bg} border="1px solid" borderColor={border} p={6} rounded="3xl">
          <Heading size="lg">Painel Admin Neni Motos</Heading>
          <Flex wrap="wrap" gap={3} align="center">
            <ChakraLink as={Link} to="/dashboard" fontWeight="medium" color="brand.500">
              Dashboard
            </ChakraLink>
            <ChakraLink as={Link} to="/dashboard/motos" fontWeight="medium" color="brand.500">
              Motos
            </ChakraLink>
            <ChakraLink as={Link} to="/dashboard/motos/nova" fontWeight="medium" color="brand.500">
              Nova moto
            </ChakraLink>
            <ChakraLink as={Link} to="/dashboard/configuracoes" fontWeight="medium" color="brand.500">
              Configurações
            </ChakraLink>
            <Button ml="auto" variant="outline" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </Flex>
        </Stack>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AdminLayout
