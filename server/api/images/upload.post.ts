export default eventHandler(async (event) => {
  const form = await readFormData(event)
  const file = form.get('file') as File

  // Validate file type
  const allowedTypes = ['image/png', 'image/jpeg', 'video/mp4']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Only images and videos are allowed.')
  }

  // Ensure file size limit
  ensureBlob(file, { maxSize: '10MB' })

  // Upload file to blob storage
  return hubBlob().put(file.name, file)
})
