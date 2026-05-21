import { Box, Center, IconButton, Image, Stack, Text, useColorModeValue, Flex } from '@chakra-ui/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { MotorcycleImage } from '../types'

interface MotorcycleGalleryProps {
  images: MotorcycleImage[]
}

const MotorcycleGallery = ({ images }: MotorcycleGalleryProps) => {
  const [selected, setSelected] = useState(0)
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order)
  const imageCount = sortedImages.length
  const current = sortedImages[selected] ?? null

  const bg = useColorModeValue('gray.100', 'surface.800')
  const subText = useColorModeValue('gray.500', 'whiteAlpha.700')

  const movePrevious = () => setSelected((prev) => (prev - 1 + imageCount) % imageCount)
  const moveNext = () => setSelected((prev) => (prev + 1) % imageCount)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') movePrevious()
      if (e.key === 'ArrowRight') moveNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [imageCount])

  return (
    <Stack spacing={4}>
      <Box position="relative" borderRadius="2xl" overflow="hidden" boxShadow="xl" bg={bg}>
        {current ? (
          <Flex align="center" justify="center" w="100%" h={{ base: '440px', md: '760px' }} bg={useColorModeValue('gray.100', 'surface.800')}>
            <Image
              src={current.image_url}
              alt="Moto"
              objectFit="contain"
              maxH={{ base: '420px', md: '740px' }}
              w="100%"
              fallbackSrc="https://via.placeholder.com/1080x720?text=Imagem+indispon%C3%ADvel"
            />
          </Flex>
        ) : (
          <Box h={{ base: '440px', md: '760px' }} />
        )}

        {imageCount > 1 && (
          <>
            <IconButton
              aria-label="Imagem anterior"
              icon={<ArrowLeft />}
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              colorScheme="blackAlpha"
              bg="whiteAlpha.700"
              _dark={{ bg: 'whiteAlpha.200' }}
              onClick={movePrevious}
            />
            <IconButton
              aria-label="Próxima imagem"
              icon={<ArrowRight />}
              position="absolute"
              right={3}
              top="50%"
              transform="translateY(-50%)"
              colorScheme="blackAlpha"
              bg="whiteAlpha.700"
              _dark={{ bg: 'whiteAlpha.200' }}
              onClick={moveNext}
            />
          </>
        )}
      </Box>

      {imageCount > 1 && (
        <Center>
          <Stack direction="row" spacing={3} overflowX="auto" px={2}>
            {sortedImages.map((img, index) => (
              <Box
                key={img.id}
                cursor="pointer"
                borderRadius="md"
                overflow="hidden"
                border="2px solid"
                borderColor={selected === index ? 'brand.400' : 'transparent'}
                boxShadow={selected === index ? 'lg' : 'none'}
                onClick={() => setSelected(index)}
                minW="100px"
              >
                <Image src={img.image_url} alt={`Miniatura ${index + 1}`} objectFit="cover" h="80px" w="100%" fallbackSrc="https://via.placeholder.com/300x200?text=Imagem+indispon%C3%ADvel" />
              </Box>
            ))}
          </Stack>
        </Center>
      )}

      <Text color={subText} fontSize="sm">
        Use as setas, clique nas miniaturas ou use as teclas de seta para navegar.
      </Text>
    </Stack>
  )
}

export default MotorcycleGallery
