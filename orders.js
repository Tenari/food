Orders = new Meteor.Collection('orders');
/*{ 
    placer: userId, 
    taker: userId, 
    finished: 'nottaken'
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
        placed: --timestamp--,
        specifics: '--user's message here--',
        price: 5,
        phone: '281-857-0913'
    }
  }*/

var isValidFood = function(food){
  return isNaN(food) 
         && _.contains(["pizza", "sandwich", "meal", "weird", "chinese", "mexican", "italian"], food);
};

Orders.allow({
  insert: function(userId, doc){
    return  userId 
            && Meteor.user().profile.hungry
            && doc.placer === userId
            && doc.taker == "noneyet"
            && doc.finished == "nottaken"
            && doc.details
            && isValidFood(doc.details.food) // see line 24
            && _.contains(['delivery', 'pickup'], doc.details.type)
            && !isNaN(doc.details.max_distance)
            && doc.details.max_distance < 40
            && doc.details.location
            && isNaN(doc.details.location.address)
            && !isNaN(doc.details.location.lat)
            && !isNaN(doc.details.location.lng)
            && !isNaN(doc.details.expire)
            && !isNaN(doc.details.placed)
            && (doc.details.placed < doc.details.expire)
            && isNaN(doc.details.specifics)
            && !isNaN(doc.details.price)
            // phone number checks
            ;
  },
  update: function(userId, doc, fields, modifier){
    return  userId                                  // must be logged in to update Orders.
            && fields.length == 1                   // only one field allowed at a time
            && (( !Meteor.user().profile.hungry     // !hungry => is_chef, because only chefs can update orders
                  && ((fields[0] =='taker'          // on the 'taker' 
                       && doc.taker == "noneyet"    // wasn't already taken
                       && _.isEqual(modifier, {$set: {taker: Meteor.userId()}})) // taking it for himself
                    || (fields[0] == 'finished'     // or 'finished' fields
                       && doc.taker == userId       // chef has already taken the order
                       && modifier.$set             // the $set modifier exists
                       && _.contains(['fullyfinished', 'started', 'delivered'], modifier.$set.finished) ))) // and it is one of these valid options
               || (Meteor.user().profile.hungry     // OR, if he's hungry,
                  && fields[0] == 'finished'        // he can only update the finished field
                  && doc.placer == userId           // on orders he has placed
                  && 'rated' == modifier.$set.finished )) // and he's setting it to a reasonable value
            ;
  },
  remove: function(userId, doc){
  // return true; // for development only
    return  userId == doc.placer          // only remove your own orders
            && doc.taker == "noneyet"     // can't remove an order that's already been taken--that'd be mean
            && doc.details.expire > new Date().getTime() // the order hasn't expired
            ; 
  }
});
