import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Heading, Stack, Text, useToast } from '@chakra-ui/react'
import MotorcycleForm from '../../components/MotorcycleForm'
import {
  createMotorcycle,
  getMotorcycleById,
  updateMotorcycle,
  saveMotorcycleImages,
} from '../../services/motorcycleService'
import type { Motorcycle } from '../../types'

const normalizeImagesForSave = (motorcycleId: string, images: any[] = []) =>
  images
    .map((image, index) => {
      if (typeof image === 'string') {
        return {
          motorcycle_id: motorcycleId,
          image_url: image,
          sort_order: index + 1,
        }
      }

      return {
        motorcycle_id: motorcycleId,
        image_url: image.image_url ?? image.url ?? '',
        sort_order: image.sort_order ?? index + 1,
      }
    })
    .filter((image) => !!image.image_url)

const AdminMotorcycleFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [motorcycle, setMotorcycle] = useState<Partial<Motorcycle> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) {
      setMotorcycle({
        id: crypto.randomUUID(),
        featured: false,
        accepts_trade: false,
        financing_available: false,
        status: 'disponivel',
        images: [],
      })
      return
    }

    const load = async () => {
      try {
        const bike = await getMotorcycleById(id)
        setMotorcycle(bike ?? null)
      } catch (error) {
        console.error('Erro ao carregar moto:', error)
        toast({
          title: 'Erro ao carregar moto.',
          description: error instanceof Error ? error.message : JSON.stringify(error),
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }

    void load()
  }, [id, toast])

  const getErrorDescription = (error: unknown) => {
    const anyError = error as any

    if (!error) return 'Erro desconhecido.'

    const parts: string[] = []
    if (typeof anyError.message === 'string') parts.push(anyError.message)
    if (anyError.code) parts.push(`Código: ${anyError.code}`)
    if (anyError.details) parts.push(`Detalhes: ${anyError.details}`)
    if (anyError.hint) parts.push(`Hint: ${anyError.hint}`)

    return parts.length > 0 ? parts.join(' | ') : String(error)
  }

  const handleSubmit = async (values: Partial<Motorcycle>) => {
    setIsLoading(true)

    try {
      const images = Array.isArray(values.images) ? values.images : []
      const { images: _images, ...valuesToSave } = values

      if (id) {
        const updated = await updateMotorcycle(id, valuesToSave)

        if (!updated) {
          throw new Error('A moto não foi atualizada. Verifique os dados e tente novamente.')
        }

        const imageRows = normalizeImagesForSave(id, images)
        await saveMotorcycleImages(id, imageRows)

        toast({
          title: 'Moto atualizada.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })

        navigate('/dashboard/motos')
        return
      }

      const created = await createMotorcycle(valuesToSave)

      if (!created?.id) {
        throw new Error('A moto não foi cadastrada. O Supabase não retornou um ID válido.')
      }

      const imageRows = normalizeImagesForSave(created.id, images)
      await saveMotorcycleImages(created.id, imageRows)

      toast({
        title: 'Moto cadastrada.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      navigate('/dashboard/motos')
    } catch (error) {
      console.error('Erro ao salvar moto:', error)

      toast({
        title: id ? 'Erro ao atualizar.' : 'Erro ao cadastrar.',
        description: getErrorDescription(error),
        status: 'error',
        duration: 7000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box>
      <Stack spacing={6}>
        <Heading size="lg">{id ? 'Editar moto' : 'Nova moto'}</Heading>

        {motorcycle ? (
          <MotorcycleForm initialData={motorcycle} onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <Text>Carregando formulário...</Text>
        )}
      </Stack>
    </Box>
  )
}

export default AdminMotorcycleFormPage