Meteor.startup(function(){
    // add some see items to the products, categories and subcategories collections
    if(Products.find().count() === 0){
      Products.insert({thumb:'hammer-framing.jpg',name:'Framing Hammer',desc:'Framers hammer with claws',price:12.43,catName:'Hammers'});
      Products.insert({thumb:'hammer-small-sledge.jpg',name:'Small Sledge Hammer',desc:'Small sledge hammer with claws',price:14.75,catName:'Hammers'});
      Products.insert({thumb:'saw-small-finish.jpg',name:'Small Trim Saw',desc:'Trim saw, for use with meter box',price:8.50,catName:'Saws'});
      Products.insert({thumb:'saw-jab-saw.jpg',name:'Jab Saw',desc:'Jab saw, for use in wallboard applcations',price:9.50,catName:'Saws'});
      Products.insert({thumb:'power-rigid-driver.jpg',name:'Rigid Power Drill/Driver',desc:'18V Driver and Drill',price:12.43,catName:'Handheld Power Tools'});
      Products.insert({thumb:'power-milw-driver.jpg',name:'Milwaukee Power Drill/Driver',desc:'18V Driver and Drill',price:8.50,catName:'Handheld Power Tools'});
      Products.insert({thumb:'comp-dewalt-4.5gal.jpg',name:'Dewalt 4.5 Gallon Compressor',desc:'Dewalt 4.5 Gallon Compresson',price:119.50,catName:'Shop Power Tools'});
      Products.insert({thumb:'plywood-4x8.jpg',name:'4ft. X 8ft. Finished Plywood',desc:'4ft. X 8ft. Plywood, finished one side',price:22.43,catName:'Sheet Goods'});
      Products.insert({thumb:'framing-2x4x10.jpg',name:'2in. X 4in. X 10ft. framing',desc:'2in. X 4in. X 10ft. framing',price:3.42,catName:'Framing'});
      Products.insert({thumb:'osb-4x8.jpg',name:'4ft. X 8ft. X 5/8in. Oriented Strand Board',desc:'4ft. X 8ft. X 5/8in. Oriented Strand Board',price:8.50,catName:'Sheet Goods'});
      Products.insert({thumb:'framing-2x4x96.jpg',name:'2in. X 4in. X 96in. Framing',desc:'2in. X 4in. X 96in framing',price:2.89,catName:'Framing'});
      Products.insert({thumb:'framing-2x6x8.jpg',name:'2in. X 6in. X 8ft. Framing',desc:'2in. X 4in. X 8ft. Framing',price:3.25,catName:'Framing'});
      Products.insert({thumb:'framing-2x6x10.jpg',name:'2in. X 6in. X 10ft. Framing',desc:'2in. X 4in. X 10ft. Framing',price:3.45,catName:'Framing'});
      Products.insert({thumb:'icf-60x160x12.jpg',name:'10 pack 60in. X 160in. X 12in Insulated Concrete Form',desc:'10 pack 60in. X 160in. X 12in Insulated Concrete Form',price:339.00,catName:'Forms'});
      Products.insert({thumb:'sonotube-8x48.jpg',name:'8in. X 48in. Sonotube',desc:'8in. X 48in. Sonotube',price:8.25,catName:'Forms'});
    }

    if(Categories.find().count() === 0){
        var lu_cat_id = Categories.insert({name:'Lumber'});
        var hw_cat_id = Categories.insert({name:'Hardware'});
        var tool_cat_id = Categories.insert({name:'Tools'});
        var found_cat_id = Categories.insert({name:'Foundation'});
        SubCategories.insert({name:'Plywood',cat:lu_cat_id});
        SubCategories.insert({name:'Framing',cat:lu_cat_id});
        SubCategories.insert({name:'Nails',cat:hw_cat_id});
        SubCategories.insert({name:'Screws',cat:hw_cat_id});
        SubCategories.insert({name:'Bolts/Nuts',cat:hw_cat_id});
        SubCategories.insert({name:'Saws',cat:tool_cat_id});
        SubCategories.insert({name:'Hammers',cat:tool_cat_id});
        SubCategories.insert({name:'Levels',cat:tool_cat_id});
        SubCategories.insert({name:'Measuring',cat:tool_cat_id});
        SubCategories.insert({name:'Handheld Power Tools',cat:tool_cat_id});
        SubCategories.insert({name:'Shop Power Tools',cat:tool_cat_id});
        SubCategories.insert({name:'Forms',cat:found_cat_id});
    }
});


Meteor.methods({
    //delete when live - removes all items from the collections
    removeAll:function(){
        Products.remove({});
        Categories.remove({});
        CartItems.remove({});
        Cart.remove({});
    },

    addToCart:function(qty,product,session){
      if(qty > 0){
        CartItems.insert({qty:qty,product:product,sessid:session,user:Meteor.userId()});
      } else {
        console.log('Quantity is Zero');
      }
    },

    removeCartItem:function(id){
      CartItems.remove({_id:id});
    },

    createNewCart:function(cartName,user){
      var cart_id = Cart.insert({name: cartName, createdBy: user, createdOn: new Date (), private: true});
      CartItems.update({user:user}, {$set: {cart_id: cart_id}}, {multi:true, upsert:false});
    },

    updateCart:function(cartName,user,session) {
      // save a new cart and add the cart items to it or update an existing cart
      var cart = Cart.findOne({name: cartName});
        // console.log('cart is undefined');
        cart_id = Cart.insert ({name: cartName, createdBy: user, createdOn: new Date (), private: true});
        var cartItems = CartItems.find({session:session});
        cartItems.forEach(function(item){
          var new_item_id = CartItems.insert(doc);
          CartItems.update({_id:new_item_id}, {$set: {cart_id: cart._id}});
        })
        // console.log('cart._id is ' + cart._id);
        CartItems.update ({cart_id: cart._id}, {$set: {cart_id: cart._id}}, {multi: true, upsert: false})
    }
});