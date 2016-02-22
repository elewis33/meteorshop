Session.setDefault('category', null);

FlowRouter.route('/estimates', {
  name: 'estimates',
  action: function() {
    BlazeLayout.render("layout", {left_sidebar: "categories", main_body: "cart_items_composite"});
  }
});

FlowRouter.route('/category/:name', {
  action: function(params) {
    console.log(params.name);
    Session.set('category', params.name);
    BlazeLayout.render("layout", {left_sidebar: "categories", main_body: "products", cart:"cart"});
  }
});