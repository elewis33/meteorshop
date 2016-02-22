Meteor.subscribe('cart');
Meteor.subscribe('cartitems');

Template.cart.cartitems = function(){
  debugger;
};

var TAX_RATE = 0.0675;

Template.registerHelper('taxrate', function(){
  return TAX_RATE;
});

Template.cart.events({
    'click .removeci':function(){
        Meteor.call('removeCartItem',this._id);
    },

    'click .newCart':function(e,tmpl){
        Session.set('selectedCartId', null);
        var cartTotal = Session.get('cartTotal');
        ModalHelper.openCartModalFor(null);
    },

    'click .editCart':function(e){
      e.preventDefault();
      cart = $(e.target).closest('.cartlink');
      cartId = cart.attr('data-id');
      ModalHelper.openCartModalFor(cartId);
    }

});

// cart helpers
Template.cart.helpers({
  // display cart items in the cart template
  'cartitems':function(){
    var shopCart = [];
    var cartItems = CartItems.find({user:Meteor.userId()});
    var total = 0;
    cartItems.forEach(function(cartitem){
      // extend the cart item so we can add more properties
      var item = _.extend(cartitem,{});
      var product = Products.findOne({_id:cartitem.product});
      cartitem.productname = product.name;
      cartitem.price = (Number(product.price) * cartitem.qty);
      total += cartitem.price;
      shopCart.push(cartitem);
    });
    shopCart.subtotal = total;
    shopCart.tax = shopCart.subtotal * TAX_RATE;
    shopCart.total = shopCart.subtotal + shopCart.tax;
    Session.set('cartTotal', shopCart.total);
    return shopCart;
  },

  'allOwnerCarts':function(){
    return Cart.find({owner:Meteor.userId()});
  }
});

Template.cartModalNew.events({
  'click #save': function(e) {
    Modal.hide('cartModalNew');
  }
});

Template.cartModalNew.helpers({
  'getSession': function () {
    return Meteor.default_connection._lastSessionId;
  },

  'getCartTotal': function() {
    var cartTotal = Number(Session.get('cartTotal')).toFixed(2);
    return cartTotal;
  }
});

Template.cartModalNew.render = function() {
    var cartTotal = Number(Session.get('cartTotal')).toFixed(2);
   // $('input[name="totalCost"]').val(cartTotal);
    // return cartTotal;
};

Template.cartModalEdit.events({
  'click #save': function(e) {
    Modal.hide('productModalNew');
  }
});

Template.cartModalEdit.helpers({
  'selectedCartDoc': function () {
    return Cart.findOne(Session.get("selectedCartId"));
  }
});