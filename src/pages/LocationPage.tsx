import { Box, Button, Container, Heading, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import SocialLinks from '../components/SocialLinks'

const LocationPage = () => (
  <>
    <Helmet>
      <title>Localização | Neni Motos</title>
      <meta name="description" content="Veja a localização da Neni Motos em Joinville e abra o endereço no Google Maps." />
    </Helmet>
    <Container maxW="7xl" py={{ base: 8, md: 14 }}>
      <Stack spacing={8}>
        <Stack spacing={3} maxW="3xl">
          <Heading>Localização</Heading>
          <Text color={useColorModeValue('gray.600', 'whiteAlpha.700')}>
            Visite Neni Motos em Joinville ou abra a localização no Google Maps para planejar sua visita.
          </Text>
        </Stack>

        <Box borderRadius="3xl" overflow="hidden" boxShadow="xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.0266369098456!2d-48.83317488451054!3d-26.310511582404708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94de1f611d3e90ad%3A0xf30677088a996ff5!2sRua%20Santa%20Catarina%2C%202204%20-%20S%C3%A3o%20Crist%C3%B3v%C3%A3o%2C%20Joinville%20-%20SC%2C%2089212-001!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={undefined}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa Neni Motos"
          />
        </Box>

        <Stack spacing={6} direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
          <Stack spacing={2}>
            <Text fontWeight="semibold">Endereço</Text>
            <Text>Rua Santa Catarina 2204, Joinville, SC, Brazil, 89212001</Text>
            <Text>Horário de atendimento: Seg-Sex 09:00 - 19:00 | Sáb 09:00 - 14:00</Text>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={3}>
            <Button
              as={Link}
              href="https://www.google.com/maps/dir/?api=1&destination=Rua+Santa+Catarina+2204,+Joinville,+SC,+89212001,+Brazil"
              target="_blank"
              rel="noreferrer"
              colorScheme="brand"
            >
              Abrir no Google Maps
            </Button>
            <Button as={Link} href="https://api.whatsapp.com/send?phone=5547997055451" target="_blank" rel="noreferrer" colorScheme="green">
              WhatsApp
            </Button>
          </Stack>
        </Stack>

        <Box p={6} bg={useColorModeValue('gray.50', 'surface.800')} rounded="3xl" border="1px solid" borderColor="whiteAlpha.100">
          <Heading size="md" mb={4}>Redes sociais</Heading>
          <SocialLinks />
          <Text mt={4}>
            Email: <Link href="mailto:nenimotosjoinville@gmail.com">nenimotosjoinville@gmail.com</Link>
          </Text>
        </Box>
      </Stack>
    </Container>
  </>
)

export default LocationPage
