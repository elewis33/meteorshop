Projects = new Mongo.Collection('projects');

// a single product
Projects.attachSchema(new SimpleSchema({
  name: {
    type: String,
    index: 1
  },
  desc: {
    type: String,
    optional: true
  },
  start_date: {
    type: Number,
    decimal: true,
    optional: true
  },
  end_date: {
    type: String,
    optional: true
  },
  owner: {
    type: String,
    optional: true
  },
  'private': {
    type: Boolean,
    optional: false
  },
  totalCost: {
    type: Number,
    decimal: true,
    optional: true
  }
}));


// data access rules
Projects.allow({
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