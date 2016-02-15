/**
 * Created by elewis on 1/31/16.
 */
ModalHelper = {};

ModalHelper.openProductModalFor = function(productId) {
  Session.set ('selectedProductId', productId);
  // Modal.show('productModal');
  if(Session.get('selectedProductId') == null) {
    Modal.show('productModalNew');
  } else {
    Modal.show('productModalEdit');
  };
};


ModalHelper.openCartModalFor = function(cartId) {
  Session.set ('selectedCartId', cartId);
  // Modal.show('productModal');
  if(Session.get('selectedCartId') == null) {
    Modal.show('cartModalNew');
  } else {
    Modal.show('cartModalEdit');
  };
};

ModalHelper.openCategoryModalFor = function(categId) {
  Session.set ('selectedCategoryId', categId);
  // Modal.show('productModal');
  if (Session.get ('selectedCategoryId') == null) {
    Modal.show ('categoryModalNew');
  } else {
    Modal.show ('categoryModalEdit');
  }
  ;
};



