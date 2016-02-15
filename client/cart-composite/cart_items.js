Meteor.subscribe('cartItems');


Template.cartItems.helpers({
  'carts': function(cartId) {
    return Cart.find({_id:cartId});
  },

  'cartItem': function() {
    // We use this helper inside the {{#each posts}} loop, so the context
    // will be a post object. Thus, we can use this.authorId.
    return CartItems.find({cart_id:this._id});
  }
})