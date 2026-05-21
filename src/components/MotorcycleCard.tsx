import { Box, Badge, Button, Heading, HStack, Image, Stack, Text, useColorModeValue, AspectRatio } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Motorcycle } from '../types'
import { formatPrice, formatKilometers } from '../utils/formatters'

const statusColors = {
  disponivel: 'green',
  reservado: 'orange',
  vendido: 'red',
}

interface MotorcycleCardProps {
  motorcycle: Motorcycle
}

const MotionBox = motion(Box)

const MotorcycleCard = ({ motorcycle }: MotorcycleCardProps) => {
  const imageUrl = motorcycle.images
    ? [...motorcycle.images]
        .sort((a, b) => a.sort_order - b.sort_order)
        .find((img) => img.image_url)?.image_url
    : null
  const primaryImage = imageUrl ?? 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1080&q=80'
  const bg = useColorModeValue('white', 'surface.800')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100')
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const navigate = useNavigate()

  return (
    <MotionBox
      as="article"
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="3xl"
      overflow="hidden"
      cursor="pointer"
      onClick={() => navigate(`/moto/${motorcycle.id}`)}
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      boxShadow="base"
    >
      <Box position="relative" overflow="hidden">
        <AspectRatio ratio={16 / 9} w="100%">
          <Image
            src={primaryImage}
            alt={motorcycle.model}
            objectFit="cover"
            loading="lazy"
            fallbackSrc="https://via.placeholder.com/1080x720?text=Imagem+indispon%C3%ADvel"
          />
        </AspectRatio>
        <Box position="absolute" inset={0} bg="linear-gradient(180deg, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.65) 100%)" />
        <Badge
          position="absolute"
          top={4}
          right={4}
          colorScheme={statusColors[motorcycle.status]}
          textTransform="uppercase"
          borderRadius="full"
          px={3}
          py={1}
          fontSize="xs"
          letterSpacing="widest"
        >
          {motorcycle.status}
        </Badge>
      </Box>

      <Stack spacing={4} p={6}>
        <Text color="brand.500" textTransform="uppercase" fontSize="xs" letterSpacing="widest">
          {motorcycle.brand}
        </Text>
        <Heading size="md" color={textColor} lineHeight="1.1">
          {motorcycle.model}
        </Heading>
        <HStack spacing={4} color="gray.500" fontSize="sm">
          <Text>{motorcycle.year}</Text>
          <Text>•</Text>
          <Text>{formatKilometers(motorcycle.mileage)}</Text>
        </HStack>
        <Text fontSize="2xl" fontWeight="extrabold" color="brand.500">
          {formatPrice(motorcycle.price)}
        </Text>
        <HStack spacing={2} wrap="wrap">
          {motorcycle.financing_available && (
            <Badge colorScheme="yellow" variant="subtle">
              Financia
            </Badge>
          )}
          {motorcycle.accepts_trade && (
            <Badge colorScheme="cyan" variant="subtle">
              Aceita troca
            </Badge>
          )}
          {motorcycle.featured && (
            <Badge colorScheme="purple" variant="solid">
              Destaque
            </Badge>
          )}
        </HStack>
        <HStack spacing={3} pt={3}>
          <Button onClick={(event) => { event.stopPropagation(); navigate(`/moto/${motorcycle.id}`) }} flex={1} colorScheme="brand" variant="solid">
            Ver detalhes
          </Button>
          <Button
            as="a"
            href={`https://api.whatsapp.com/send?phone=5547997055451&text=Olá,%20tenho%20interesse%20na%20moto%20${encodeURIComponent(
              `${motorcycle.brand} ${motorcycle.model} ${motorcycle.year}`,
            )}%20no%20valor%20de%20${encodeURIComponent(formatPrice(motorcycle.price))}.`}
            target="_blank"
            rel="noreferrer"
            size="sm"
            flex={0.9}
            colorScheme="green"
            onClick={(event) => event.stopPropagation()}
          >
            WhatsApp
          </Button>
        </HStack>
      </Stack>
    </MotionBox>
  )
}

export default MotorcycleCard
