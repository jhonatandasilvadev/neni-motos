import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import type { Motorcycle } from '../types'
import { brands, brandModels } from '../data/vehicleData'
import ImageUploader from './ImageUploader'

interface MotorcycleFormProps {
  initialData?: Partial<Motorcycle>
  onSubmit: (values: Partial<Motorcycle>) => void
  isLoading?: boolean
}

const MotorcycleForm = ({ initialData = {}, onSubmit, isLoading = false }: MotorcycleFormProps) => {
  const [values, setValues] = useState<Partial<Motorcycle>>(initialData)

  useEffect(() => {
    setValues(initialData)
  }, [initialData])

  const handleChange = (
    field: keyof Motorcycle,
    value: string | number | boolean | Motorcycle['images'],
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const modelOptions = useMemo(() => {
    if (!values.brand) return []
    return brandModels[values.brand] ?? []
  }, [values.brand])

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 30 }, (_, index) => currentYear - index)
  }, [])

  useEffect(() => {
    if (values.brand && values.model && modelOptions.length > 0 && !modelOptions.includes(values.model)) {
      handleChange('model', '')
    }
  }, [values.brand, modelOptions])

  return (
    <Box as="form" onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSubmit(values) }}>
      <Stack spacing={6}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <FormControl>
            <FormLabel>Marca</FormLabel>
            <Select value={values.brand ?? ''} onChange={(e) => handleChange('brand', e.target.value)} required>
              <option value="">Selecione a marca</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Modelo</FormLabel>
            {modelOptions.length > 0 ? (
              <Select
                value={values.model ?? ''}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="Selecione o modelo"
                required
              >
                {modelOptions.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </Select>
            ) : (
              <Input value={values.model ?? ''} onChange={(e) => handleChange('model', e.target.value)} placeholder="Digite o modelo" required />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Ano</FormLabel>
            <Select
              value={values.year?.toString() ?? ''}
              onChange={(e) => handleChange('year', Number(e.target.value))}
              required
            >
              <option value="">Selecione o ano</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Ano/modelo</FormLabel>
            <Select
              value={values.model_year?.toString() ?? ''}
              onChange={(e) => handleChange('model_year', Number(e.target.value))}
              required
            >
              <option value="">Selecione o ano/modelo</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Preço</FormLabel>
            <Input type="number" value={values.price ?? ''} onChange={(e) => handleChange('price', Number(e.target.value))} required />
          </FormControl>
          <FormControl>
            <FormLabel>Km</FormLabel>
            <Input type="number" value={values.mileage ?? ''} onChange={(e) => handleChange('mileage', Number(e.target.value))} required />
          </FormControl>
          <FormControl>
            <FormLabel>Cilindrada</FormLabel>
            <Input type="number" value={values.engine_capacity ?? ''} onChange={(e) => handleChange('engine_capacity', Number(e.target.value))} required />
          </FormControl>
          <FormControl>
            <FormLabel>Cor</FormLabel>
            <Input value={values.color ?? ''} onChange={(e) => handleChange('color', e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Combustível</FormLabel>
            <Select value={values.fuel ?? 'Gasolina'} onChange={(e) => handleChange('fuel', e.target.value)}>
              <option>Gasolina</option>
              <option>Etanol</option>
              <option>Flex</option>
              <option>Elétrico</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Câmbio</FormLabel>
            <Select value={values.transmission ?? 'Manual'} onChange={(e) => handleChange('transmission', e.target.value)}>
              <option>Manual</option>
              <option>Automático</option>
              <option>Semiautomática</option>
              <option>CVT</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Partida</FormLabel>
            <Select value={values.starter ?? 'Elétrico'} onChange={(e) => handleChange('starter', e.target.value)}>
              <option>Elétrico</option>
              <option>Pedal</option>
              <option>Elétrico/Pedal</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Documentação</FormLabel>
            <Input value={values.documentation_status ?? ''} onChange={(e) => handleChange('documentation_status', e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select value={values.status ?? 'disponivel'} onChange={(e) => handleChange('status', e.target.value as Motorcycle['status'])}>
              <option value="disponivel">Disponível</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
            </Select>
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <FormControl display="flex" alignItems="center">
            <Checkbox isChecked={values.accepts_trade ?? false} onChange={(e) => handleChange('accepts_trade', e.target.checked)}>
              Aceita troca
            </Checkbox>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <Checkbox isChecked={values.financing_available ?? false} onChange={(e) => handleChange('financing_available', e.target.checked)}>
              Financia
            </Checkbox>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <Checkbox isChecked={values.featured ?? false} onChange={(e) => handleChange('featured', e.target.checked)}>
              Destaque
            </Checkbox>
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Descrição</FormLabel>
          <Textarea value={values.description ?? ''} onChange={(e) => handleChange('description', e.target.value)} rows={4} />
        </FormControl>

        <FormControl>
          <FormLabel>Observações</FormLabel>
          <Textarea value={values.notes ?? ''} onChange={(e) => handleChange('notes', e.target.value)} rows={3} />
        </FormControl>

        <FormControl>
          <FormLabel>Fotos</FormLabel>
          <ImageUploader
            uploadPath={values.id}
            images={((values.images ?? []) as Array<{ image_url?: string } | string>)
              .map((image) => (typeof image === 'string' ? image : image.image_url ?? ''))
              .filter(Boolean)}
            onAdd={(imageUrl) => {
              setValues((prev) => {
                const currentImages = prev.images ?? []
                return {
                  ...prev,
                  images: [
                    {
                      id: `${Date.now()}`,
                      motorcycle_id: prev.id ?? crypto.randomUUID(),
                      image_url: imageUrl,
                      sort_order: 1,
                      created_at: new Date().toISOString(),
                    },
                    ...currentImages.map((img, index) => ({
                      ...img,
                      sort_order: index + 2,
                    })),
                  ],
                }
              })
            }}
            onRemove={(imageUrl) => {
              setValues((prev) => ({
                ...prev,
                images: (prev.images ?? []).filter((img) => img.image_url !== imageUrl),
              }))
            }}
          />
        </FormControl>

        <Button type="submit" colorScheme="brand" isLoading={isLoading}>
          Salvar moto
        </Button>
      </Stack>
    </Box>
  )
}

export default MotorcycleForm
