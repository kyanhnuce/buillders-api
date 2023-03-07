const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
// server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

// Endpoint cho việc tìm kiếm item theo query parameters
server.get('/items/:name/search', (req, res) => {
  const { q, type } = req.query;
  const name = req.params.name;
  if (q && type === 'less') {
    const results = router.db
      .get('items')
      .find({ name })
      .get('data')
      .filter(
        (result) =>
          result.name.toLowerCase().includes(q.toLowerCase()) ||
          result.description.toLowerCase().includes(q.toLowerCase()),
      )
      .slice(0, 5)
      .value();
    return res.json(results);
  }
});

server.use(jsonServer.bodyParser);
server.use('/items/:name/data', (req, res, next) => {
  const name = req.params.name;
  if (req.method === 'GET') {
    const item = router.db
      .get('items')
      .find({ name })
      .get('data')
      .filter((item) => item.name)
      .value();
    return res.json(item);
  }
  next();
});

server.use(router);

// server.use(router);
server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running');
});
