// helper to get the product categories out of the database
Meteor.subscribe('products');
Meteor.subscribe('subcategories');
Meteor.subscribe('categories');


// get an alphabetized list of subcategories for select list options
Template.registerHelper('optCategories', function(){
  return SubCategories.find({},{sort:{name:1}})
    .map(function(s){
      return {label:s.name, value:s.name};
  });
});

Template.productModalNew.events({
  'click #save': function(e) {
    Modal.hide('productModalNew');
  }
});

Template.productModalEdit.helpers({
  'selectedProductDoc': function () {
    return Products.findOne(Session.get("selectedProductId"));
  }
});

Template.productModalEdit.events({
  'click #save': function(e) {
    Modal.hide('productModalNew');
  }
});
