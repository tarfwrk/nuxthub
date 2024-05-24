export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = hubDatabase();
  const { text } = await readBody(event);

  const result = await db
    .prepare('UPDATE messages SET text = ?, updated_at = ? WHERE id = ?')
    .bind(text, Date.now(), id)
    .run();

  if (result.changes === 0) {
    return { error: 'Message not found' };
  }

  return { message: 'Message updated successfully' };
});