const _ = require('lodash');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

// // Custom route to handle GET /items/:name
// server.get('/items/:name/:name/:name/:name', (req, res) => {
//   const name = req.params.name;
//   const items = router.db
//     .get('items')
//     .find({ name })
//     .value();
//   if (items) {
//     res.json(user);
//   } else {
//     res.sendStatus(404);
//   }
// });

// // Custom route to handle GET /items/:departmentId/users/:userId
// server.get('/items/:name/admixture/:name/sika-viscocrete/:name', (req, res) => {
//   const name = req.params.name;
//   const item = router.db
//     .get('items')
//     .find({ name })
//     .get('admixture')
//     .find({ name })
//     .get('sika-viscocrete')
//     .find({ name })
//     .value();
//   if (item) {
//     res.json(item);
//   } else {
//     res.sendStatus(404);
//   }
// });

// server.get('/items/:itemName/admixtures/:admixtureName/viscocretes/:viscocreteName/datas/:dataName', (req, res) => {
//   const itemName = req.params.itemName;
//   const admixtureName = req.params.admixtureName;
//   const viscocreteName = req.params.viscocreteName;
//   const dataName = req.params.dataName;
//   const item = _.find(router.db.get('items').value(), { name: itemName });
//   if (item) {
//     const admixture = _.find(item.admixtures, { name: admixtureName });
//     if (admixture) {
//       const viscocrete = _.find(admixture.viscocretes, { name: viscocreteName });
//       if (viscocrete) {
//         const data = _.find(admixture.datas, { name: dataName });
//         if (data) {
//           res.json(data);
//         } else {
//           res.sendStatus(404);
//         }
//       } else {
//         res.sendStatus(404);
//       }
//     } else {
//       res.sendStatus(404);
//     }
//   } else {
//     res.sendStatus(404);
//   } 
// });

server.get('/departments/:departmentName/projects/:projectName', (req, res) => {
  const departmentName = req.params.departmentName;
  const projectName = req.params.projectName;
  const department = _.find(router.db.get('departments').value(), { name: departmentName });
  if (department) {
    const project = _.find(department.projects, { name: projectName });
    if (project) {
      res.json(project);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});


server.use(router)
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running')
})
