Router.configure({
  layout: "layout",
  notFoundTemplate: "404"
});

var authControllerFn = function() {
  if (Meteor.user() != null)
    this.render();
  else
    this.render("404", {});
};

Router.map(function(){
  this.route('home', {path:"/"});
  this.route('help');
  this.route('legal');
  this.route('about');
  this.route('account-less');

  this.route('open_orders_chef', {}, authControllerFn);
  this.route('current_orders_chef', {}, authControllerFn);

  this.route('orderform', {}, authControllerFn);
  this.route('open_orders_hungry', {}, authControllerFn);
  this.route('started_orders_hungry', {}, authControllerFn);
  this.route('need_to_rate', {}, authControllerFn);
  this.route('full_order_history', {}, authControllerFn);

  this.route('profile', {
    path: '/profile/:_id',
    data: function(){
      return Meteor.users.findOne(this.params._id);
    }
  });
});

