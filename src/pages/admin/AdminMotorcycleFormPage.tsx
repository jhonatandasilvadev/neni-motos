import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Heading, Stack, Text, useToast } from '@chakra-ui/react'
import MotorcycleForm from '../../components/MotorcycleForm'
import { createMotorcycle, getMotorcycleById, updateMotorcycle, saveMotorcycleImages } from '../../services/motorcycleService'
import type { Motorcycle } from '../../types'

const AdminMotorcycleFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [motorcycle, setMotorcycle] = useState<Partial<Motorcycle> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!id) {
      setMotorcycle({ featured: false, accepts_trade: false, financing_available: false, status: 'disponivel' })
      return
    }
    const load = async () => {
      const bike = await getMotorcycleById(id)
      setMotorcycle(bike ?? null)
    }
    void load()
  }, [id])

  const handleSubmit = async (values: Partial<Motorcycle>) => {
    setIsLoading(true)
    const images = values.images ?? []
    const valuesToSave = { ...values, images: [] }

    if (id) {
      const updated = await updateMotorcycle(id, valuesToSave)
      if (updated && images.length > 0) {
        await saveMotorcycleImages(id, images)
      }
      setIsLoading(false)
      if (updated) {
        toast({ title: 'Moto atualizada.', status: 'success', duration: 3000, isClosable: true })
        navigate('/dashboard/motos')
      } else {
        toast({ title: 'Erro ao atualizar.', status: 'error', duration: 4000, isClosable: true })
      }
      return
    }

    const created = await createMotorcycle(valuesToSave)
    setIsLoading(false)
    if (created) {
      if (images.length > 0) {
        await saveMotorcycleImages(created.id, images)
      }
      toast({ title: 'Moto cadastrada.', status: 'success', duration: 3000, isClosable: true })
      navigate('/dashboard/motos')
    } else {
      toast({ title: 'Erro ao cadastrar.', status: 'error', duration: 4000, isClosable: true })
    }
  }

  return (
    <Box>
      <Stack spacing={6}>
        <Heading size="lg">
          {id ? 'Editar moto' : 'Nova moto'}
        </Heading>
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
