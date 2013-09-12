Router.configure({
  layout: "layout",
  notFoundTemplate: "404",
  renderTemplates: {
    'title': {to: 'title'}
  }
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

Orders = new Meteor.Collection('orders');
// { placer: user_id, taker: user_id, finished: 'started'
//   details: { food: 'sandwich', type: 'delivery', max_distance: 5,
//              location: { address: '3105 Bay Ridge Ct', zip: '77546',
//                          city: 'friendswood', state: 'TX', country: 'USA' }
//              expire: '--timestamp--', specifics: '--user's message here--'
//              price: 5, phone: '281-857-0913'}}
if (Meteor.isServer){
//  Orders.deny({
//    insert: function(userId, doc){
////    return Orders.find({placer: userId, taker:"noneyet"}).count() != 0;
////    do real validations
//      return true;
//    }
//  });
  Orders.allow({
    insert: function(userId, doc){
      return true;
    },
    update: function(userId, doc, fields, modifier){
      return fields.length == 1 && (fields[0] =='taker' || fields[0] == 'finished');
    },
    remove: function(userId, doc){
      // return userId == doc.placer;
      return true;
    }
  });
}
Ratings = new Meteor.Collection('ratings');
// { rater: user_id, ratee: user_id, rating: 5,
//   details: { comments: 'he was chill.', order: order_id }}
