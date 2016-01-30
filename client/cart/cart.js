Template.cart.cartitems = function(){
   
};
Template.cart.helpers({
  // display of cart items in the cart template
    'cartitems':function(){
        var shopCart = [];
        var cartItems = CartItems.find({});
        var total = 0;

    cartItems.forEach(function(cartitem){
        //debugger;
        var item = _.extend(cartitem,{});
        var product = Products.findOne({_id:cartitem.product});
        cartitem.productname = product.name;
        cartitem.price = (Number(product.price) * cartitem.qty);
        total += cartitem.price;
        shopCart.push(cartitem);
    });
    shopCart.subtotal = total;
    shopCart.tax = shopCart.subtotal * .0675;
    shopCart.total = shopCart.subtotal + shopCart.tax;
    return shopCart; 
    }
})

Template.cart.events({
    'click .removeci':function(evt,tmpl){
        Meteor.call('removeCartItem',this._id);
    },
    'click .createCart':function(evt,tmpl){
      //debugger;
       var name = tmpl.find('.cartName').value;
       Meteor.call('createNewCart',name, Meteor.userId());
    }
});