import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { loginAdmin } from '../../services/authService'

const AdminLoginPage = () => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    
    const success = loginAdmin(password)
    setIsLoading(false)

    if (success) {
      toast({ title: 'Autenticado com sucesso.', status: 'success', duration: 2000, isClosable: true })
      navigate('/dashboard')
    } else {
      toast({ title: 'Senha incorreta.', status: 'error', duration: 4000, isClosable: true })
    }
  }

  return (
    <Container maxW="md" py={{ base: 10, md: 20 }}>
      <Box bg="white" p={8} rounded="3xl" border="1px solid" borderColor="gray.200" _dark={{ bg: 'surface.800', borderColor: 'whiteAlpha.100' }} boxShadow="lg">
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Painel Admin
        </Text>
        <Text mb={6} color="gray.600" _dark={{ color: 'whiteAlpha.700' }}>
          Digite a senha para acessar o painel administrativo.
        </Text>
        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Senha Admin</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                autoFocus
              />
            </FormControl>
            <Button type="submit" colorScheme="brand" isLoading={isLoading} size="lg">
              Entrar
            </Button>
            <Text fontSize="sm" color="gray.500" _dark={{ color: 'whiteAlpha.600' }}>
              Padrão: <strong>admin</strong>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default AdminLoginPage
