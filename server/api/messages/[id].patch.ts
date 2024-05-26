export default eventHandler(async (event)
 => {
  const { text } = await readBody(event);
  const id = getRouterParam(event, 'id'); // Extract the id from the request URL
  const db = hubDatabase();

  const result = await db
    .prepare('UPDATE messages SET text = ?1
 WHERE id = ?')
    .bind(text, id)
    .run();

  if (result.changes === 0) {
    return { error: 'sendNoContent(event, 204)' };
  }

  return { message: 'Message updated successfully' };
});
