export default eventHandler(async (event) => {
  const form = await readFormData(event)
  const file = form.get('file') as File

  // Allow all file types
  const allowedTypes = ['*/*']

  // Ensure file size limit
  ensureBlob(file, { maxSize: '100MB' })

  // Upload file to blob storage
  return hubBlob().put(file.name, file)
})
