Meteor.subscribe('categories');
Meteor.subscribe('subcategories');


Template.registerHelper('optParentCats', function(){
  return Categories.find({},{sort:{name:1}})
    .map(function(s){
      return {label:s.name, value:s._id};
    });
});

Template.categories.helpers({
	'Categories':function(){
      // get all categories
	    return Categories.find({},{sort:{name:1}});
	},

	'SubCategories':function(){
    // get subcategories for specified category
		return SubCategories.find({cat:this._id},{sort:{name:1}});
	}

});

Template.categories.events({
  'click .catName':function(e){
    e.preventDefault();
    var cat_name = e.target.textContent;
    var category = Categories.findOne({name:cat_name});
    Session.set('selectedParentCat', category._id)
    ModalHelper.openCategoryModalFor(null);
    },

    'click .addProduct':function(e){
      e.preventDefault();
      ModalHelper.openProductModalFor(null);
    }
});

Template.categoryModalNew.events({
  'click #save':function(e){
  Modal.hide('categoryModalNew');
  }
})

Template.categoryModalNew.rendered = function() {
  var selectedVal = Session.get('selectedParentCat');
  $("#cat").val(selectedVal).change();
};


