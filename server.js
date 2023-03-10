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

// [GET] /items/search?q=&type=less
server.get('/items/search', (req, res) => {
  const { q, type } = req.query;
  if (q.length > 0 && type === 'less') {
    const results = router.db
      .get('items')
      .flatMap(item => item.info.flatMap(info => info.data))
      .filter(
        (result) =>
          result.name.toLowerCase().includes(q.toLowerCase()) ||
          result.title.toLowerCase().includes(q.toLowerCase()) ||
          result.description.toLowerCase().includes(q.toLowerCase())
      )
      .slice(0, 5)
      .value();
    return res.json(results);
  } else if (q.length <= 0 ) [
    res.json({message: "The given data was invalid.",
    errors: {
      "q": [
        "The q field is required."
      ]
    },
    status_code: 422})
  ]
});

server.use(jsonServer.bodyParser);
// [GET] /items/data-name/:name
server.get('/items/data-name/:name', (req, res) => {
  const name = req.params.name
    const itemName = router.db
      .get('items')
      .flatMap(item => item.info.flatMap(info => info.data))
      .find({name})
      .value();
    return res.json(itemName)
});
// [GET] /items/:name/data-like/:like
server.get('/items/:name/data-like/:like', (req, res) => {
  const name = req.params.name
    const itemLike = router.db
      .get('items')
      .find({name})
      .flatMap(item => item.info.flatMap(info => info.data))
      .filter({like: true})
      .value();
    return res.json(itemLike)
});
// [GET] /items/data-category/:category
server.use('/items/data-category/:category', (req, res, next) => {
  const category = req.params.category
  if (req.method === 'GET') {
    const item = router.db
      .get('items')
      .flatMap(item => item.info.flatMap(info => info.data))
      .filter({category})
      .value();
    return res.json(item);
  }
  next();
});

// [GET] /items/info
server.get('/items/info', (req, res) => {
  const items = router.db.get('items').value();
  const result = items.map(company => ({
    id: company.info[0].id,
    name: company.info[0].name,
    title: company.info[0].title,
  }));
  res.jsonp(result);
});

// [GET] /items/search?q=&type=less
server.get('/items/search-info', (req, res) => {
  const { q, type } = req.query;
  if (q && type === 'less') {
    const items = router.db
      .get('items')
      .flatMap(company => ({
        id: company.info[0].id,
        search: company.info[0].search,
        name: company.info[0].name,
        title: company.info[0].title,
        description: company.info[0].description,
      }))
      .filter(
        (result) =>
          encodeURI(result.title.toLowerCase().includes(q.toLowerCase()))
      )
      .slice(0, 5)
      .value();
    return res.json(items);
  }
});


server.use(router);

// server.use(router);
server.listen(process.env.PORT || 5000, () => {
  console.log('JSON Server is running');
});
