import { HStack, IconButton } from '@chakra-ui/react'
import { Instagram, Facebook, MapPin } from 'lucide-react'

const SocialLinks = () => (
  <HStack spacing={3}>
    <IconButton
      as="a"
      href="https://www.instagram.com/nenimotosjlle/"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram"
      icon={<Instagram />}
      variant="outline"
    />
    <IconButton
      as="a"
      href="https://www.facebook.com/nenimotosjlle"
      target="_blank"
      rel="noreferrer"
      aria-label="Facebook"
      icon={<Facebook />}
      variant="outline"
    />
    <IconButton
      as="a"
      href="/localizacao"
      aria-label="Localização"
      icon={<MapPin />}
      variant="outline"
    />
  </HStack>
)

export default SocialLinks
