Meteor.subscribe('cart');
Meteor.subscribe('cartitems');
// Meteor.subscribe('cartsComposite');

//TODO - get the helper for the composite view working
Template.cart_items_composite.helpers({
  'carts': function(user) {
    return Cart.find({owner: Meteor.userId()}).fetch();
  },

  'cartItems': function() {
    return CartItems.find({user:Meteor.userId(), cart_id:this._id});
  }
});

Template.cart_items_composite.onCreated(function(){
  console.log("The 'cart_items_composite' template was just created.");
});

Template.cart_items_composite.onRendered(function(){
  console.log("The 'cart_items_composite' template was just rendered.");
});

Template.cart_items_composite.onDestroyed(function(){
  console.log("The 'cart_items_composite' template was just destroyed.");
});
