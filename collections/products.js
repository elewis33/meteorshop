// get the mongo collection
Products = new Mongo.Collection("products");

// a single product
Products.attachSchema(new SimpleSchema({
  name: {
    type: String,
    index: 1
  },
  desc: {
    type: String,
    optional: true
  },
  price: {
    type: Number,
    decimal: true,
    optional: true
  },
  catName: {
    type: String,
    optional: true
  },
  thumb: {
    type: String,
    optional: true
  }
}));


// data access rules
Products.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});