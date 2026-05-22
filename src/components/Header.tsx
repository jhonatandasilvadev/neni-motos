import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Link as ChakraLink,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { Instagram, Facebook, Phone, Menu as MenuIcon, Moon, Sun } from 'lucide-react'
import { getStoreSettings } from '../services/settingsService'

interface HeaderProps {
  onOpenFilters?: () => void
}

const navLinks = [
  { label: 'Catálogo', href: '/' },
  { label: 'Localização', href: '/localizacao' },
]

const Header = ({ onOpenFilters }: HeaderProps) => {
  const location = useLocation()
  const { colorMode, toggleColorMode } = useColorMode()
  const [logoUrl, setLogoUrl] = useState<string | undefined>()
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenu = useDisclosure()
  const showFilter = location.pathname === '/'
  const showDesktopMenu = useBreakpointValue({ base: false, md: true })

  useEffect(() => {
    const loadSettings = async () => {
      const settings = await getStoreSettings()
      setLogoUrl(settings?.logo_url)
    }

    void loadSettings()
    const handleSettingsUpdate = () => {
      void loadSettings()
    }

    window.addEventListener('neniMotosSettingsUpdated', handleSettingsUpdate)
    return () => window.removeEventListener('neniMotosSettingsUpdated', handleSettingsUpdate)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bg = useColorModeValue('white', 'rgba(17,17,17,0.92)')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  const shadow = isScrolled ? 'lg' : 'none'

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={30}
      backdropFilter="blur(16px)"
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      boxShadow={shadow}
    >
      <Flex maxW="7xl" mx="auto" py={3} px={{ base: 4, md: 8 }} align="center" justify="space-between">
        <ChakraLink as={Link} to="/" display="flex" alignItems="center" _hover={{ textDecoration: 'none' }}>
          <Box
            h={12}
            w={12}
            borderRadius="3xl"
            bgGradient={logoUrl ? undefined : 'linear(to-br, brand.500, brand.700)'}
            bg={logoUrl ? useColorModeValue('gray.100', 'surface.700') : undefined}
            display="grid"
            placeItems="center"
            color="white"
            fontWeight="black"
            letterSpacing="wide"
            overflow="hidden"
          >
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo Neni Motos" objectFit="cover" boxSize="100%" />
            ) : (
              'N'
            )}
          </Box>
          <Box ml={3}>
            <Text fontWeight="black" letterSpacing="tight">Neni Motos</Text>
          </Box>
        </ChakraLink>

        {showDesktopMenu ? (
          <HStack spacing={4}>
            {navLinks.map((link) => (
              <ChakraLink
                key={link.href}
                as={Link}
                to={link.href}
                fontWeight={location.pathname === link.href ? 'bold' : 'medium'}
                color={location.pathname === link.href ? useColorModeValue('brand.600', 'brand.300') : useColorModeValue('gray.700', 'whiteAlpha.900')}
              >
                {link.label}
              </ChakraLink>
            ))}
            {showFilter && (
              <Button variant="outline" size="sm" onClick={onOpenFilters}>
                Filtrar
              </Button>
            )}
          </HStack>
        ) : (
          <HStack spacing={2}>
            {showFilter && (
              <Button variant="outline" size="sm" onClick={onOpenFilters}>
                Filtrar
              </Button>
            )}
            <IconButton
              aria-label="Abrir menu"
              icon={<MenuIcon />}
              variant="ghost"
              onClick={mobileMenu.onOpen}
            />
          </HStack>
        )}

        <HStack spacing={2}>
          <IconButton
            as="a"
            href="https://api.whatsapp.com/send?phone=5547997055451"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            icon={<Phone />}
            variant="outline"
            color={useColorModeValue('gray.700', 'whiteAlpha.900')}
          />
          <IconButton
            as="a"
            href="https://www.instagram.com/nenimotosjlle/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            icon={<Instagram />}
            variant="outline"
            color={useColorModeValue('gray.700', 'whiteAlpha.900')}
          />
          <IconButton
            as="a"
            href="https://www.facebook.com/nenimotosjlle"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            icon={<Facebook />}
            variant="outline"
            color={useColorModeValue('gray.700', 'whiteAlpha.900')}
          />
          <IconButton
            aria-label="Alternar tema"
            icon={colorMode === 'dark' ? <Sun /> : <Moon />}
            variant="ghost"
            onClick={toggleColorMode}
          />
        </HStack>
      </Flex>

      <Drawer isOpen={mobileMenu.isOpen} placement="right" onClose={mobileMenu.onClose}>
        <DrawerOverlay backdropFilter="blur(12px)" />
        <DrawerContent bg={useColorModeValue('white', 'surface.800')}>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4} mt={4}>
              {navLinks.map((link) => (
                <Button key={link.href} as={Link} to={link.href} variant="ghost" justifyContent="flex-start" onClick={mobileMenu.onClose}>
                  {link.label}
                </Button>
              ))}
              {showFilter && (
                <Button variant="outline" justifyContent="flex-start" onClick={() => { onOpenFilters?.(); mobileMenu.onClose() }}>
                  Filtrar
                </Button>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Header
