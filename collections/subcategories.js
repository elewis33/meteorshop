SubCategories = new Mongo.Collection('subcategories');

// a single product
SubCategories.attachSchema(new SimpleSchema({
  name: {
    type: String,
    index: 1
  },
  desc: {
    type: String,
    optional: true
  },
  cat: {
    type: String,
    optional: false
  }
}));


// data access rules
SubCategories.allow({
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