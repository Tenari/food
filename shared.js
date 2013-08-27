Router.configure({
  layout: "layout",
  renderTemplates: {
    'title': {to: 'title'}
  }
});

Router.map(function(){
  this.route('primary', {path:"/"});
  this.route('help');
  this.route('legal');
  this.route('about');
  this.route('account-less');
});

Orders = new Meteor.Collection('orders');
// { placer: user_id, taker: user_id,
//   details: { food: 'sandwich', type: 'delivery', max_distance: 5,
//              location: { address: '3105 Bay Ridge Ct', zip: '77546',
//                          city: 'friendswood', state: 'TX', country: 'USA' }
//              expire: '--timestamp--', specifics: '--user's message here--'
//              price: 5, phone: '281-857-0913'}}
if (Meteor.isServer){
  Orders.deny({
    insert: function(userId, doc){
      return Orders.find({placer: userId, taker:"noneyet"}).count() != 0;
    }
  });
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
