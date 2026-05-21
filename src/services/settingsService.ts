import type { StoreSettings } from '../types'
import { mockStoreSettings } from '../data/mockData'
import { supabase, supabaseConfigured } from '../lib/supabase'

const STORAGE_KEY = 'neni_motos_store_settings'

const getLocalSettings = (): StoreSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return mockStoreSettings
    return JSON.parse(stored) as StoreSettings
  } catch (error) {
    console.error('Error reading local settings', error)
    return mockStoreSettings
  }
}

const setLocalSettings = (values: StoreSettings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
  } catch (error) {
    console.error('Error saving local settings', error)
  }
}

export const getStoreSettings = async (): Promise<StoreSettings> => {
  if (!supabaseConfigured || !supabase) {
    return getLocalSettings()
  }

  const { data, error } = await supabase.from('store_settings').select('*').limit(1).single()

  if (error || !data) {
    console.error('Supabase getStoreSettings error', error)
    return getLocalSettings()
  }

  setLocalSettings(data)
  return data
}

export const updateStoreSettings = async (values: Partial<StoreSettings>): Promise<StoreSettings | null> => {
  const storedValues = getLocalSettings()
  const updatedValues = { ...storedValues, ...values, updated_at: new Date().toISOString() }

  const dispatchSettingsUpdate = (updated: StoreSettings) => {
    setLocalSettings(updated)
    window.dispatchEvent(new Event('neniMotosSettingsUpdated'))
  }

  if (!supabaseConfigured || !supabase) {
    dispatchSettingsUpdate(updatedValues)
    return updatedValues
  }

  const { data, error } = await supabase
    .from('store_settings')
    .upsert(updatedValues, { onConflict: 'id' })
    .select()
    .single()

  if (error || !data) {
    console.error('Supabase updateStoreSettings error', error)
    dispatchSettingsUpdate(updatedValues)
    return updatedValues
  }

  dispatchSettingsUpdate(data)
  return data
}

export const applyPrimaryColor = (color: string) => {
  if (!color) return
  document.documentElement.style.setProperty('--brand-500', color)
  document.documentElement.style.setProperty('--brand-400', color)
  document.documentElement.style.setProperty('--brand-600', color)
  document.documentElement.style.setProperty('--brand-700', color)
  document.documentElement.style.setProperty('--brand-primary', color)
}
