export default eventHandler(async (event) => {
  if (event.req.method !== 'PATCH') {
    return { error: 'Method not allowed' };
  }

  const { id, text } = await readBody(event);
  const db = hubDatabase();

  const existingMessage = await db
    .prepare('SELECT * FROM messages WHERE id = ?')
    .bind(id)
    .first();

  if (!existingMessage) {
    return { error: 'Message not found' };
  }

  const updatedFields = {};
  if (text !== undefined) {
    updatedFields.text = text;
  }
  updatedFields.updated_at = Date.now();

  const result = await db
    .prepare('UPDATE messages SET ? WHERE id = ?')
    .bind([updatedFields, id])
    .run();

  if (result.changes === 0) {
    return { error: 'Message not found' };
  }

  return { message: 'Message updated successfully' };
});