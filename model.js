Orders = new Meteor.Collection('orders');
/*{ 
    placer: userId, 
    taker: userId, 
    finished: 'started'
    details: { 
        food: 'sandwich',
        type: 'delivery',
        max_distance: 5,
        location: { 
            address: '3105 Bay Ridge Ct', 
            lat: 25.129837,
            lng: -95.1345
        }
        expire: --timestamp--,
        specifics: '--user's message here--',
        price: 5,
        placed: --timestamp--,
        phone: '281-857-0913'
    }
  }*/

if (Meteor.isServer){
  var isValidFood = function(food){
    return isNaN(food) &&
           (  food == "pizza" 
           || food == "sandwich" 
           || food == "meal"
           || food == "weird"
           || food == "chinese"
           || food == "mexican"
           || food == "italian");
  };

  Orders.allow({
    insert: function(userId, doc){
      return  userId 
              && Meteor.user().profile.hungry
              && doc.placer === userId
              && doc.taker === "noneyet"
              && doc.details
              && !isNaN(doc.details.expire)
              && isValidFood(doc.food)
              && doc.location
              && isNaN(doc.location.address)
              && !isNaN(doc.location.lat)
              && !isNaN(doc.location.lng)
              // checks on phone number
              && !isNaN(doc.placed) && doc.placed < doc.expire;
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
