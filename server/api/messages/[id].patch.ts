export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const db = hubDatabase();
  const { text } = await readBody(event);

  const result = await db
    .prepare('UPDATE messages SET text = ?1, SET updated_at = ?2 WHERE id = ?')
    .bind(text, Date.now())
    .run();

  if (result.changes === 0) {
    return { error: 'Message not found' };
  }

  return { message: 'Message updated successfully' };
});