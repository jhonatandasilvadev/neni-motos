export type MotorcycleStatus = 'disponivel' | 'reservado' | 'vendido'

export interface MotorcycleImage {
  id: string
  motorcycle_id: string
  image_url: string
  sort_order: number
  created_at: string
}

export interface Motorcycle {
  id: string
  brand: string
  model: string
  year: number
  model_year: number
  price: number
  mileage: number
  engine_capacity: number
  color: string
  fuel: string
  transmission: string
  starter: string
  documentation_status: string
  accepts_trade: boolean
  financing_available: boolean
  status: MotorcycleStatus
  featured: boolean
  description: string
  notes: string
  created_at: string
  updated_at: string
  images: MotorcycleImage[]
}

export interface StoreSettings {
  id: string
  store_name: string
  logo_url: string
  whatsapp: string
  instagram: string
  facebook: string
  email: string
  address: string
  opening_hours: string
  home_title: string
  home_subtitle: string
  primary_color: string
  updated_at: string
}
