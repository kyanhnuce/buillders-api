const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Custom route to handle GET /users/:username
server.get('/items/:name/:name/:name/:name', (req, res) => {
  const username = req.params.username;
  const user = router.db
    .get('items')
    .find({ username })
    .value();
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

server.use(router)
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})
