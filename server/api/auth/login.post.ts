export default defineEventHandler(async (event) => {
  const db = event.context.db;
  // load the request body
  const {username, password} = await readBody(event)

  return {
    error: null,
    msg: "ok",
    data: {
      username,
      password,
    },
  };
});

