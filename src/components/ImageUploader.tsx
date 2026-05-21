import { useState, useRef } from 'react'
import { Button, IconButton, Stack, Text, VStack, useToast, Image as ChakraImage, Box } from '@chakra-ui/react'
import { Trash2, Upload, ArrowUpLeft } from 'lucide-react'
import { uploadImage } from '../services/uploadService'

interface ImageUploaderProps {
  images: string[]
  onAdd: (imageUrl: string) => void
  onRemove: (imageUrl: string) => void
}

const ImageUploader = ({ images, onAdd, onRemove }: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false)
  const toast = useToast()
  const dropRef = useRef<HTMLDivElement | null>(null)

  const isValidImageFile = (file: File) => {
    return file.type.startsWith('image/') || /\.(png|jpe?g|gif|webp)$/i.test(file.name)
  }

  const handleFilesList = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList)
    const valid = files.filter(isValidImageFile)
    if (valid.length === 0) {
      toast({ title: 'Nenhuma imagem válida encontrada.', status: 'error', duration: 3000, isClosable: true })
      return
    }

    setUploading(true)
    try {
      const uploads = await Promise.all(valid.map(async (file) => {
        try {
          const url = await uploadImage(file)
          return url
        } catch (err) {
          return null
        }
      }))

      for (const url of uploads) {
        if (url) onAdd(url)
      }

      toast({ title: `${uploads.filter(Boolean).length} arquivo(s) enviado(s).`, status: 'success', duration: 2000, isClosable: true })
    } finally {
      setUploading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => handleFilesList(e.target.files)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFilesList(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()

  return (
    <Stack spacing={4}>
      <Box
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        p={4}
        border="2px dashed"
        borderColor="gray.200"
        rounded="lg"
        textAlign="center"
        bg="white"
        _dark={{ bg: 'surface.800', borderColor: 'whiteAlpha.100' }}
      >
        <Button as="label" leftIcon={<Upload />} colorScheme="brand" cursor="pointer" isLoading={uploading}>
          Selecionar ou arrastar fotos
          <input type="file" hidden multiple onChange={handleInputChange} accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/*" />
        </Button>
        <Text mt={3} fontSize="sm" color="gray.600" _dark={{ color: 'whiteAlpha.700' }}>
          Arraste e solte vários arquivos aqui ou clique para selecionar. Suporta WebP. As imagens serão enviadas ao salvar a moto.
        </Text>
      </Box>

      {images.length > 0 && (
        <VStack align="stretch" spacing={3}>
          {images.map((image) => (
            <Box key={image} p={0} bg="transparent" rounded="2xl" border="1px solid" borderColor="gray.100" _dark={{ borderColor: 'whiteAlpha.100' }}>
              <Box position="relative">
                <ChakraImage
                  src={image}
                  alt="Preview"
                  objectFit="cover"
                  w="100%"
                  maxH="420px"
                  fallbackSrc="https://via.placeholder.com/1080x720?text=Imagem+indispon%C3%ADvel"
                />
                <IconButton
                  aria-label="Remover imagem"
                  icon={<Trash2 />}
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  position="absolute"
                  top={2}
                  right={2}
                  onClick={() => {
                    onRemove(image)
                    toast({ title: 'Foto removida.', status: 'info', duration: 2000, isClosable: true })
                  }}
                />
              </Box>
            </Box>
          ))}
        </VStack>
      )}

      <Box p={3} bg="blue.50" rounded="lg" border="1px solid" borderColor="blue.200" _dark={{ bg: 'blue.900', borderColor: 'blue.700' }} display="flex" gap={2} alignItems="flex-start">
        <ArrowUpLeft size={16} style={{ marginTop: '4px', flexShrink: 0 }} />
        <Text fontSize="xs" color="blue.700" _dark={{ color: 'blue.200' }}>
          {images.length > 0
            ? `${images.length} foto(s) anexada(s).`
            : 'Arraste arquivos aqui ou use o botão para selecionar várias fotos.'}
        </Text>
      </Box>
    </Stack>
  )
}

export default ImageUploader
