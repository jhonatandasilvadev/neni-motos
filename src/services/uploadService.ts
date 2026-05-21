import { supabase, supabaseConfigured } from '../lib/supabase'

const BUCKET = 'motorcycle-images'

const safeFileName = (fileName: string) =>
  fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.-]/g, '-')
    .toLowerCase()

const getStorageKey = (file: File, folder = 'motorcycles') => {
  const extension = file.name.split('.').pop() || 'webp'
  return `${folder}/${crypto.randomUUID()}.${extension}`
}

const createDataUrlFromFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Falha ao gerar preview da imagem.'))
      }
    }
    reader.onerror = () => reject(new Error('Falha ao ler o arquivo de imagem.'))
    reader.readAsDataURL(file)
  })

export const uploadImage = async (file: File, uploadPath?: string): Promise<string> => {
  if (!supabaseConfigured || !supabase) {
    return createDataUrlFromFile(file)
  }

  const fileName = `${crypto.randomUUID()}.${file.name.split('.').pop() ?? 'webp'}`
  const key = uploadPath ? `motorcycles/${uploadPath}/${fileName}` : getStorageKey(file)

  console.log('UPLOAD FILE', file.name, file.type, file.size)

  const { data, error } = await supabase.storage.from(BUCKET).upload(key, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: file.type,
  })

  if (error) {
    console.error('Supabase uploadImage error', error)
    throw error
  }

  const publicUrlResult = supabase.storage.from(BUCKET).getPublicUrl(data.path)
  const publicUrl = publicUrlResult.data?.publicUrl

  if (!publicUrl) {
    console.error('Supabase getPublicUrl error', publicUrlResult)
    throw new Error('URL pública não gerada após upload.')
  }

  console.log('UPLOAD URL', publicUrl)

  return publicUrl
}

export const deleteImage = async (pathOrUrl: string): Promise<boolean> => {
  if (!supabaseConfigured || !supabase) return false

  const path = pathOrUrl.includes('/storage/v1/object/public/')
    ? pathOrUrl.split(`/storage/v1/object/public/${BUCKET}/`)[1]
    : pathOrUrl

  const { error } = await supabase.storage.from(BUCKET).remove([path])

  if (error) {
    console.error('Supabase deleteImage error', error)
    return false
  }

  return true
}