Template.categories.helpers({
	'Categories':function(){
      // get all categories
	    return Categories.find();
	
	},
	'SubCategories':function(){
    // get subcategories for specified category
		return SubCategories.find({cat:this._id});
	}
}) 
