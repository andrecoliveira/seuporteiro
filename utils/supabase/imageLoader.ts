const projectId = 'bklgmpvxceomqfzebvdg'

interface Parameters {
  filename: string
  folder: string
  width: number
  quality?: number
}

export default function supabaseLoader({
  filename,
  folder,
  width,
  quality,
}: Parameters) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/${folder}/${filename}?width=${width}&quality=${
    quality || 75
  }`
}
