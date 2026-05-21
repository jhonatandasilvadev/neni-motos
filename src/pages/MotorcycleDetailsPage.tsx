import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { getMotorcycleById } from '../services/motorcycleService'
import MotorcycleGallery from '../components/MotorcycleGallery'
import { formatPrice, formatKilometers } from '../utils/formatters'
import type { Motorcycle } from '../types'

const MotorcycleDetailsPage = () => {
  const { id } = useParams()
  const [motorcycle, setMotorcycle] = useState<Motorcycle | null>(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      if (!id) return
      setLoading(true)
      const bike = await getMotorcycleById(id)
      setMotorcycle(bike)
      setLoading(false)
    }
    void load()
  }, [id])

  const handleShare = async () => {
    if (!motorcycle) return
    const shareData = {
      title: `${motorcycle.brand} ${motorcycle.model}`,
      text: `Olha essa moto ${motorcycle.brand} ${motorcycle.model} ${motorcycle.year} por ${formatPrice(motorcycle.price)}.`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        toast({ title: 'Não foi possível compartilhar.', status: 'error', duration: 4000, isClosable: true })
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast({ title: 'Link copiado para a área de transferência.', status: 'success', duration: 4000, isClosable: true })
    }
  }

  const whatsappLink = motorcycle
    ? `https://api.whatsapp.com/send?phone=5547997055451&text=Olá,%20tenho%20interesse%20na%20moto%20${encodeURIComponent(
        `${motorcycle.brand} ${motorcycle.model} ${motorcycle.year}, valor ${formatPrice(motorcycle.price)}`,
      )}%20Ela%20ainda%20está%20disponível?`
    : ''

  const cardBg = useColorModeValue('white', 'surface.800')
  const cardBorder = useColorModeValue('gray.200', 'whiteAlpha.100')
  const secondaryText = useColorModeValue('gray.600', 'whiteAlpha.700')

  return (
    <>
      <Helmet>
        <title>{motorcycle ? `${motorcycle.brand} ${motorcycle.model} | Neni Motos` : 'Moto | Neni Motos'}</title>
        <meta name="description" content="Veja detalhes da moto, galeria de imagens e entre em contato direto pelo WhatsApp." />
      </Helmet>
      <Container maxW="7xl" py={{ base: 8, md: 14 }}>
        {loading ? (
          <Text color={secondaryText}>Carregando...</Text>
        ) : motorcycle ? (
          <Stack spacing={10}>
            <Stack spacing={4}>
              <HStack spacing={4}>
                <Badge colorScheme="brand">{motorcycle.brand}</Badge>
                <Badge colorScheme={motorcycle.status === 'disponivel' ? 'green' : motorcycle.status === 'reservado' ? 'orange' : 'red'}>
                  {motorcycle.status}
                </Badge>
              </HStack>
              <Heading>{motorcycle.model}</Heading>
              <Text color="whiteAlpha.700">Ano/modelo {motorcycle.year}/{motorcycle.model_year}</Text>
            </Stack>

            <MotorcycleGallery images={motorcycle.images} />

            <Grid templateColumns={{ base: '1fr', md: '1fr 320px' }} gap={8}>
              <Stack spacing={4}>
                <Box p={6} bg={cardBg} rounded="3xl" border="1px solid" borderColor={cardBorder}>
                  <HStack justify="space-between" mb={4}>
                    <Text fontWeight="semibold">Valor</Text>
                    <Text fontSize="2xl" fontWeight="extrabold" color="brand.300">
                      {formatPrice(motorcycle.price)}
                    </Text>
                  </HStack>
                  <Grid templateColumns="1fr 1fr" gap={3}>
                    <Box>
                      <Text fontSize="sm" color={secondaryText}>Ano</Text>
                      <Text>{motorcycle.year}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={secondaryText}>Km</Text>
                      <Text>{formatKilometers(motorcycle.mileage)}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={secondaryText}>Cilindrada</Text>
                      <Text>{motorcycle.engine_capacity} cc</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color={secondaryText}>Cor</Text>
                      <Text>{motorcycle.color}</Text>
                    </Box>
                  </Grid>
                </Box>

                <Box p={6} bg={cardBg} rounded="3xl" border="1px solid" borderColor={cardBorder}>
                  <Heading size="md" mb={4}>Especificações</Heading>
                  <Stack spacing={3}>
                    <Text><strong>Combustível:</strong> {motorcycle.fuel}</Text>
                    <Text><strong>Câmbio:</strong> {motorcycle.transmission}</Text>
                    <Text><strong>Partida:</strong> {motorcycle.starter}</Text>
                    <Text><strong>Documentação:</strong> {motorcycle.documentation_status}</Text>
                    <Text><strong>Aceita troca:</strong> {motorcycle.accepts_trade ? 'Sim' : 'Não'}</Text>
                    <Text><strong>Financia:</strong> {motorcycle.financing_available ? 'Sim' : 'Não'}</Text>
                  </Stack>
                </Box>

                <Box p={6} bg={cardBg} rounded="3xl" border="1px solid" borderColor={cardBorder}>
                  <Heading size="md" mb={3}>Descrição</Heading>
                  <Text>{motorcycle.description}</Text>
                  <Text mt={4} fontSize="sm" color={secondaryText}>
                    Observações: {motorcycle.notes}
                  </Text>
                </Box>
              </Stack>

              <Stack spacing={4}>
                <Button as="a" href={whatsappLink} target="_blank" rel="noreferrer" colorScheme="green" size="lg">
                  Tenho interesse no WhatsApp
                </Button>
                <Button variant="outline" onClick={handleShare} size="lg">
                  Compartilhar moto
                </Button>
                <Box p={6} bg={cardBg} rounded="3xl" border="1px solid" borderColor={cardBorder}>
                  <Text fontWeight="semibold">Detalhes rápidos</Text>
                  <Stack spacing={2} mt={3}>
                    <Text>Marca: {motorcycle.brand}</Text>
                    <Text>Modelo: {motorcycle.model}</Text>
                    <Text>Versão: {motorcycle.model_year}</Text>
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Stack>
        ) : (
          <Text>Moto não encontrada.</Text>
        )}
      </Container>
    </>
  )
}

export default MotorcycleDetailsPage
