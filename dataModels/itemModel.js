const mongoose = require('mongoose');

const { Schema } = mongoose;

const itemModel = new Schema(
  {
    product: { type: String },
    gender: { type: String },
    price: { type: Number },
    discount: { type: Number },
    availble: { type: Boolean, deafult: true },
    avatar: { type: String }
  }
);

module.exports = mongoose.model('Item', itemModel);

await mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });