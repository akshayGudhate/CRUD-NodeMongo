function itemController(Item) {

  function post(req, res) {
    const item = new Item(req.body);
    item.save();
    return res.status(201).json(item);
  }

  function get(req, res) {
    const query = {};
    if (req.query.gender) {
      query.gender = req.query.gender;
    }
    Item.find(query, (err, items) => {
      if (err) {
        return res.status(404).send(err);
      }
      return res.json(items);
    });
  }
  return { post, get };
}
module.exports = itemController;