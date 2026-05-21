import { Box, Button } from '@chakra-ui/react'
import { Phone } from 'lucide-react'

const WhatsAppButton = () => (
  <Box position="fixed" bottom={6} right={6} zIndex={30} display={{ base: 'none', md: 'block' }}>
    <Button
      as="a"
      href="https://api.whatsapp.com/send?phone=5547997055451&text=Olá,%20gostaria%20de%20mais%20informações%20sobre%20as%20motos"
      target="_blank"
      rel="noreferrer"
      leftIcon={<Phone />}
      colorScheme="green"
      size="lg"
      boxShadow="lg"
    >
      WhatsApp
    </Button>
  </Box>
)

export default WhatsAppButton
