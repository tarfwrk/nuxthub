export default eventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const db = hubDatabase();
    const message = await db.prepare('UPDATE messages SET ? WHERE id = ?')
      .bind([event.body, id])
      .run();
    return message;
   });