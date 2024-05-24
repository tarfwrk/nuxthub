export default eventHandler(async (event) => {
  const db = hubDatabase();
  const { text } = await readBody(event);

  const result = await db
    .prepare('UPDATE messages SET text = ?1 WHERE id = ?')
    .bind(text)
    .run();

  if (result.changes === 0) {
    return { error: 'sendNoContent(event, 204)' };
  }

  return { message: 'Message updated successfully' };
});
