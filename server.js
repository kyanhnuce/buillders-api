const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// Custom route to handle GET /items/:name
server.get('/items/:name/:name/:name/:name', (req, res) => {
  const name = req.params.name;
  const items = router.db
    .get('items')
    .find({ name })
    .value();
  if (items) {
    res.json(items);
  } else {
    res.sendStatus(404);
  }
});

server.use(router)
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})
