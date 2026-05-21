import { useEffect, useState, type FormEvent } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Image,
} from '@chakra-ui/react'
import type { StoreSettings } from '../types'

interface SettingsFormProps {
  initialData: Partial<StoreSettings>
  onSubmit: (values: Partial<StoreSettings>) => void
  isLoading?: boolean
}

const SettingsForm = ({ initialData, onSubmit, isLoading = false }: SettingsFormProps) => {
  const [values, setValues] = useState<Partial<StoreSettings>>(initialData)

  useEffect(() => {
    setValues(initialData)
  }, [initialData])

  return (
    <Box as="form" onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSubmit(values) }}>
      <Stack spacing={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <FormControl>
            <FormLabel>Nome da loja</FormLabel>
            <Input value={values.store_name ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, store_name: e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>WhatsApp</FormLabel>
            <Input value={values.whatsapp ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, whatsapp: e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>Instagram</FormLabel>
            <Input value={values.instagram ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, instagram: e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>Facebook</FormLabel>
            <Input value={values.facebook ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, facebook: e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={values.email ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>Endereço</FormLabel>
            <Input value={values.address ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, address: e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>Horário de atendimento</FormLabel>
            <Input value={values.opening_hours ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, opening_hours: e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>Cor principal</FormLabel>
            <Input type="color" value={values.primary_color ?? '#ff9300'} onChange={(e) => setValues((prev) => ({ ...prev, primary_color: e.target.value }))} />
          </FormControl>
          <FormControl>
            <FormLabel>URL do logo</FormLabel>
            <Input value={values.logo_url ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, logo_url: e.target.value }))} placeholder="https://..." />
          </FormControl>
          <FormControl>
            <FormLabel>Upload do logo</FormLabel>
            <Button as="label" variant="outline" colorScheme="brand" width="full">
              Escolher arquivo
              <input
                type="file"
                hidden
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => {
                    setValues((prev) => ({ ...prev, logo_url: reader.result as string }))
                  }
                  reader.readAsDataURL(file)
                }}
              />
            </Button>
          </FormControl>
        </SimpleGrid>

        {values.logo_url && (
          <Box border="1px solid" borderColor="gray.200" rounded="2xl" overflow="hidden" maxW="xs">
            <Image src={values.logo_url} alt="Logo da loja" objectFit="contain" width="full" height="120px" />
          </Box>
        )}

        <FormControl>
          <FormLabel>Título da home</FormLabel>
          <Input value={values.home_title ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, home_title: e.target.value }))} />
        </FormControl>
        <FormControl>
          <FormLabel>Subtítulo da home</FormLabel>
          <Textarea value={values.home_subtitle ?? ''} onChange={(e) => setValues((prev) => ({ ...prev, home_subtitle: e.target.value }))} rows={4} />
        </FormControl>

        <Button type="submit" colorScheme="brand" isLoading={isLoading}>
          Salvar configurações
        </Button>
      </Stack>
    </Box>
  )
}

export default SettingsForm
