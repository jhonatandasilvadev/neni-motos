import { supabase, supabaseConfigured } from '../lib/supabase'

const BUCKET = 'motorcycle-images'

const getStorageKey = (file: File) => `${Date.now()}-${file.name}`

const createDataUrlFromFile = (file: File): Promise<string | null> =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => resolve(null)
    reader.readAsDataURL(file)
  })

export const uploadImage = async (file: File, path?: string): Promise<string | null> => {
  if (!supabaseConfigured || !supabase) {
    return createDataUrlFromFile(file)
  }

  const key = path ?? getStorageKey(file)
  const { data, error } = await supabase.storage.from(BUCKET).upload(key, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    console.error('Supabase uploadImage error', error)
    return createDataUrlFromFile(file)
  }

  const { data: urlData, error: urlError } = await supabase.storage.from(BUCKET).createSignedUrl(data.path, 60 * 60 * 24)

  if (urlError) {
    console.error('Supabase uploadImage signed url error', urlError)
    return createDataUrlFromFile(file)
  }

  return urlData.signedUrl
}

export const deleteImage = async (path: string): Promise<boolean> => {
  if (!supabaseConfigured || !supabase) return false

  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) {
    console.error('Supabase deleteImage error', error)
    return false
  }

  return true
}
