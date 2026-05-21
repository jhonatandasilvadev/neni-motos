import type { Motorcycle, MotorcycleStatus } from '../types'
import { mockMotorcycles } from '../data/mockData'
import { supabase, supabaseConfigured } from '../lib/supabase'

const STORAGE_KEY = 'neni_motos_motorcycles'
const DATA_VERSION_KEY = 'neni_motos_data_version'
const CURRENT_DATA_VERSION = '2'

const normalizeMotorcycleImages = (images: Motorcycle['images'] = []) =>
  [...images]
    .filter((image) => !!image?.image_url)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

const clearStoredMotorcyclesIfNeeded = () => {
  try {
    const storedVersion = localStorage.getItem(DATA_VERSION_KEY)
    if (storedVersion !== CURRENT_DATA_VERSION) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION)
    }
  } catch (error) {
    console.error('Error clearing stored motorcycles on version update', error)
  }
}

const normalizeMotorcycle = (motorcycle: Motorcycle): Motorcycle => ({
  ...motorcycle,
  images: normalizeMotorcycleImages(motorcycle.images),
})

const loadLocalMotorcycles = (): Motorcycle[] => {
  try {
    clearStoredMotorcyclesIfNeeded()
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as Motorcycle[]
    }

    const initialData: Motorcycle[] = mockMotorcycles
    saveLocalMotorcycles(initialData)
    return initialData
  } catch (error) {
    console.error('Error reading local motorcycles', error)
    return []
  }
}

const saveLocalMotorcycles = (motorcycles: Motorcycle[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(motorcycles))
  } catch (error) {
    console.error('Error saving local motorcycles', error)
  }
}

const mapMotorcycle = (record: any): Motorcycle => ({
  ...record,
  images: (record.motorcycle_images ?? []).map((image: any) => ({
    id: image.id,
    motorcycle_id: image.motorcycle_id,
    image_url: image.image_url,
    sort_order: image.sort_order,
    created_at: image.created_at,
  })),
})

export const getMotorcycles = async (): Promise<Motorcycle[]> => {
  if (!supabaseConfigured || !supabase) return loadLocalMotorcycles()

  const { data, error } = await supabase
    .from('motorcycles')
    .select('*, motorcycle_images(*)')
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Supabase getMotorcycles error', error)
    return loadLocalMotorcycles()
  }

  return data.map(mapMotorcycle)
}

export const getMotorcycleById = async (id: string): Promise<Motorcycle | null> => {
  if (!supabaseConfigured || !supabase) {
    return loadLocalMotorcycles().find((bike) => bike.id === id) ?? null
  }

  const { data, error } = await supabase
    .from('motorcycles')
    .select('*, motorcycle_images(*)')
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error('Supabase getMotorcycleById error', error)
    return loadLocalMotorcycles().find((bike) => bike.id === id) ?? null
  }

  return mapMotorcycle(data)
}

export const filterMotorcycles = (motorcycles: Motorcycle[], query: {
  search?: string
  minPrice?: number
  maxPrice?: number
  year?: number
  maxKm?: number
  engineCapacity?: number
  status?: MotorcycleStatus
  onlyAvailable?: boolean
  sortBy?: 'recent' | 'priceLow' | 'priceHigh' | 'kmLow' | 'yearNew'
}): Motorcycle[] => {
  let items = [...motorcycles]

  if (query.search) {
    const normalized = query.search.toLowerCase()
    items = items.filter((bike) =>
      [bike.brand, bike.model].some((value) => value.toLowerCase().includes(normalized)),
    )
  }

  if (query.minPrice !== undefined) {
    items = items.filter((bike) => bike.price >= query.minPrice!)
  }

  if (query.maxPrice !== undefined) {
    items = items.filter((bike) => bike.price <= query.maxPrice!)
  }

  if (query.year !== undefined) {
    items = items.filter((bike) => bike.year === query.year)
  }

  if (query.maxKm !== undefined) {
    items = items.filter((bike) => bike.mileage <= query.maxKm!)
  }

  if (query.engineCapacity !== undefined) {
    items = items.filter((bike) => bike.engine_capacity === query.engineCapacity!)
  }

  if (query.status) {
    items = items.filter((bike) => bike.status === query.status)
  }

  if (query.onlyAvailable) {
    items = items.filter((bike) => bike.status === 'disponivel')
  }

  switch (query.sortBy) {
    case 'priceLow':
      items.sort((a, b) => a.price - b.price)
      break
    case 'priceHigh':
      items.sort((a, b) => b.price - a.price)
      break
    case 'kmLow':
      items.sort((a, b) => a.mileage - b.mileage)
      break
    case 'yearNew':
      items.sort((a, b) => b.year - a.year)
      break
    default:
      items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  return items
}

export const createMotorcycle = async (motorcycle: Partial<Motorcycle>): Promise<Motorcycle | null> => {
  if (!supabaseConfigured || !supabase) {
    const stored = loadLocalMotorcycles()
    const id = motorcycle.id ?? `${Date.now()}`
    const timestamp = new Date().toISOString()
    const newMotorcycle: Motorcycle = {
      id,
      brand: motorcycle.brand ?? 'Unknown',
      model: motorcycle.model ?? 'Sem nome',
      year: motorcycle.year ?? new Date().getFullYear(),
      model_year: motorcycle.model_year ?? new Date().getFullYear(),
      price: motorcycle.price ?? 0,
      mileage: motorcycle.mileage ?? 0,
      engine_capacity: motorcycle.engine_capacity ?? 0,
      color: motorcycle.color ?? 'Desconhecida',
      fuel: motorcycle.fuel ?? 'Gasolina',
      transmission: motorcycle.transmission ?? 'Manual',
      starter: motorcycle.starter ?? 'Elétrico',
      documentation_status: motorcycle.documentation_status ?? '',
      accepts_trade: motorcycle.accepts_trade ?? false,
      financing_available: motorcycle.financing_available ?? false,
      status: motorcycle.status ?? 'disponivel',
      featured: motorcycle.featured ?? false,
      description: motorcycle.description ?? '',
      notes: motorcycle.notes ?? '',
      created_at: timestamp,
      updated_at: timestamp,
      images: normalizeMotorcycleImages(motorcycle.images),
    }
    saveLocalMotorcycles([newMotorcycle, ...stored])
    return newMotorcycle
  }

  const { data, error } = await supabase.from('motorcycles').insert([motorcycle]).select().single()

  if (error || !data) {
    console.error('Supabase createMotorcycle error', error)
    return null
  }

  return { ...data, images: [] }
}

export const updateMotorcycle = async (id: string, values: Partial<Motorcycle>): Promise<Motorcycle | null> => {
  if (!supabaseConfigured || !supabase) {
    const stored = loadLocalMotorcycles()
    const updated = stored.map((bike) =>
      bike.id === id
        ? normalizeMotorcycle({
            ...bike,
            ...values,
            images: normalizeMotorcycleImages(values.images ?? bike.images),
            updated_at: new Date().toISOString(),
          })
        : bike,
    )
    saveLocalMotorcycles(updated)
    return updated.find((bike) => bike.id === id) ?? null
  }

  const { data, error } = await supabase
    .from('motorcycles')
    .update(values)
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    console.error('Supabase updateMotorcycle error', error)
    return null
  }

  return { ...data, images: [] }
}

export const saveMotorcycleImages = async (motorcycleId: string, images: any[]): Promise<boolean> => {
  if (!supabaseConfigured || !supabase) {
    const stored = loadLocalMotorcycles()
    const updated = stored.map((bike) =>
      bike.id === motorcycleId
        ? normalizeMotorcycle({
            ...bike,
            images: images.map((img, index) => ({
              id: img.id ?? `${Date.now()}-${index}`,
              motorcycle_id: motorcycleId,
              image_url: img.image_url,
              sort_order: index + 1,
              created_at: img.created_at ?? new Date().toISOString(),
            })),
            updated_at: new Date().toISOString(),
          })
        : bike,
    )
    saveLocalMotorcycles(updated)
    return true
  }

  try {
    const imagesToInsert = images
      .filter((img) => img.image_url)
      .map((img, index) => ({
        motorcycle_id: motorcycleId,
        image_url: img.image_url,
        sort_order: index + 1,
      }))

    if (imagesToInsert.length === 0) return true

    const { error } = await supabase.from('motorcycle_images').insert(imagesToInsert)
    if (error) {
      console.error('Error saving motorcycle images', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error in saveMotorcycleImages', error)
    return false
  }
}

export const deleteMotorcycle = async (id: string): Promise<boolean> => {
  if (!supabaseConfigured || !supabase) {
    const stored = loadLocalMotorcycles()
    const updated = stored.filter((bike) => bike.id !== id)
    saveLocalMotorcycles(updated)
    return true
  }

  const { error } = await supabase.from('motorcycles').delete().eq('id', id)
  if (error) {
    console.error('Supabase deleteMotorcycle error', error)
    return false
  }

  return true
}

export const getStatusCounts = (motorcycles: Motorcycle[]) => ({
  total: motorcycles.length,
  disponivel: motorcycles.filter((bike) => bike.status === 'disponivel').length,
  reservado: motorcycles.filter((bike) => bike.status === 'reservado').length,
  vendido: motorcycles.filter((bike) => bike.status === 'vendido').length,
  featured: motorcycles.filter((bike) => bike.featured).length,
})
