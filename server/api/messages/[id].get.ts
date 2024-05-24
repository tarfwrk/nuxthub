export default eventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const db = hubDatabase()
  
    const message = await db.prepare('SELECT * FROM messages WHERE id = ?', ).bind(id).first()

    return message
  })