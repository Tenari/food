Ratings = new Meteor.Collection('ratings');
// { rater: user_id, ratee: user_id, rating: 5,
//   details: { comments: 'he was chill.', order: order_id }}

var standardRatingInsertValidation = function(doc){
  return  !isNaN(doc.rating)
          && doc.rating > 0
          && doc.rating <= 5
          && doc.details
          && isNaN(doc.details.comments)
          && doc.details.order
          ;
};
Ratings.allow({
  insert: function(userId, doc){
    var order_collection, custom;
    if (Meteor.user().profile.hungry){
      order_collection = Orders.find({placer: userId, finished: "delivered", taker: doc.ratee});
      custom = true;
    } else {
      order_collection =  Orders.find({placer: doc.ratee, taker: userId, finished: "rated"});
      custom = true;
    }
    return  standardRatingInsertValidation(doc)
            && doc.rater == userId
            && order_collection.count() > 0
            && _.contains(_.pluck(order_collection.fetch(), '_id'), doc.details.order)
            && custom
            ;
  },
  update: function(userId, doc, fields, modifier){
    return true;
  },
  remove: function(userId, doc){
    return true;
  }
});
