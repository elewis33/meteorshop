Meteor.subscribe('products');

Template.products.helpers({
  'productlist':function(){
  return Products.find({catName:Session.get('category')});
  },
  'catnotselected':function(){
      return Session.equals('category',null);
  },
  'category':function(){
      return Session.get('category_id');
  }
});

Template.products.events({
  'click .addProduct':function(e){
    e.preventDefault();
    ModalHelper.openProductModalFor(null);
  }
});

Template.product.events({
  'click .addcart':function(e,tmpl){
    var qty = tmpl.find('.prodqty').value;
    var product = this._id;
    var sessid = Meteor.default_connection._lastSessionId;
    Meteor.call('addToCart',qty,product,sessid);
  },

  'click .editProduct':function(e){
    e.preventDefault();
    product = $(e.target).closest('.product');
    productId = product.attr('data-id');
    ModalHelper.openProductModalFor(productId);
  }
});
