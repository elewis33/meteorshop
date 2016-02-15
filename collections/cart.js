// map the mongo collection to the collections object
Cart = new Mongo.Collection('cart');
// attach the schema to it
Cart.attachSchema(new SimpleSchema({
  cartName: {
    type: String,
    index: 1,
    unique: false
  },
  desc: {
    type: String,
    optional: true
  },
  totalCost: {
    type: Number,
    decimal: true,
    optional: true
  },
  'private': {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  },
  owner:{
    type: String,
    autoValue: function(){
      return Meteor.userId();
    }
  }

}));

// data access rules
Cart.allow({
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