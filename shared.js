Router.configure({
  layout: "layout",
  renderTemplates: {
    'title': {to: 'title'}
  }
});

Router.map(function(){
  this.route('home', {path:"/"});
  this.route('help');
  this.route('legal');
  this.route('about');
  this.route('account-less');

  this.route('profile_chef');
  this.route('open_orders_chef');
  this.route('current_orders_chef');

  this.route('orderform');
  this.route('own_profile');
  this.route('open_orders_hungry');
  this.route('started_orders_hungry');
  this.route('need_to_rate');
  this.route('full_order_history');
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
