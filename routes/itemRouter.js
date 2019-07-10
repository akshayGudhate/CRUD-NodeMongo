const express = require('express');
const itemController = require('../controllers/itemController');

function routes(Item) {

  const itemRouter = express.Router();
  const controller = itemController(Item);
  itemRouter.route('/items')
    .post(controller.post)
    .get(controller.get);

  //Middleware for the finding the item....
  itemRouter.use('/items/:itemID', (req, res, next) => {
    Item.findById(req.params.itemID, (err, item) => {
      if (err) {
        return res.status(404).send(err);
      }
      if (item) {
        req.item = item;
        return next();
      }
      return res.sendStatus(404);
    });
  })

  itemRouter.route('/items/:itemID')
    .get((req, res) => {
      res.json(req.item);
    })

    .put((req, res) => {
      const { item } = req;

      item.avatar = req.body.avatar;
      item.product = req.body.product;
      item.price = req.body.price;
      item.discount = req.body.discount;
      item.availble = req.body.availble;

      item.save();

      return res.status(201).json(item);
    })

    .delete((req, res) => {
      req.item.remove((err) => {
        if (err) {
          res.send(err);
        }
        res.sendStatus(204);
      });

    });

  return itemRouter;
}

module.exports = routes;