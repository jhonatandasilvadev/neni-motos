import { Box, Button, Container, Flex, IconButton, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Instagram, Facebook, MapPin } from 'lucide-react'

const Footer = () => {
  const bg = useColorModeValue('white', '#111111')
  const textColor = useColorModeValue('gray.700', 'whiteAlpha.800')
  const secondaryColor = useColorModeValue('gray.500', 'whiteAlpha.600')
  const border = useColorModeValue('gray.200', 'whiteAlpha.100')

  return (
    <Box as="footer" bg={bg} color={textColor} borderTop="1px solid" borderColor={border} py={{ base: 10, md: 16 }}>
      <Container maxW="7xl">
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap={12}>
          <Stack spacing={4} maxW={{ md: '30%' }}>
            <Text fontSize="2xl" fontWeight="black" letterSpacing="tight">
              Neni Motos
            </Text>
            <Text color={secondaryColor}>Rua Santa Catarina 2204, Joinville, SC</Text>
            <Text color={secondaryColor}>Seg-Sex 09:00 - 19:00 | Sáb 09:00 - 14:00</Text>
          </Stack>

          <Stack spacing={4}>
            <Text fontWeight="semibold">Contato</Text>
            <Link href="tel:+5547997055451" color={textColor} fontWeight="medium">
              +55 47 99705-5451
            </Link>
            <Link href="mailto:nenimotosjoinville@gmail.com" color={textColor} fontWeight="medium">
              nenimotosjoinville@gmail.com
            </Link>
            <Button
              as={Link}
              href="https://goo.gl/maps/L6nhFvycKof2"
              target="_blank"
              rel="noreferrer"
              variant="outline"
              size="sm"
              w="fit-content"
            >
              Abrir no Google Maps
            </Button>
          </Stack>

          <Stack spacing={4}>
            <Text fontWeight="semibold">Siga-nos</Text>
            <Stack direction="row" spacing={3} align="center">
              <IconButton
                as={Link}
                href="https://www.instagram.com/nenimotosjlle/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                icon={<Instagram />}
                variant="outline"
              />
              <IconButton
                as={Link}
                href="https://www.facebook.com/nenimotosjlle"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                icon={<Facebook />}
                variant="outline"
              />
            </Stack>
            <Flex align="center" gap={2} color={secondaryColor}>
              <MapPin />
              <Text>Joinville, SC</Text>
            </Flex>
          </Stack>
        </Flex>
        <Flex justify="space-between" align="center" pt={8} borderTop="1px solid" borderColor={border}>
          <Text fontSize="sm" color={secondaryColor}>
            © {new Date().getFullYear()} Neni Motos. Concessionária moderna em Joinville.
          </Text>
          <Text fontSize="sm" color={secondaryColor}>
            Desenvolvido para catálogo premium de motos.
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}

export default Footer
