var enterStar = function(e){
  var $target = $(e.target);
  var which_star = parseInt($target.data('starnum'));

  $('.star').each(function(){
    if (parseInt($(this).data('starnum')) <= which_star)
      $(this).removeClass('star-off').addClass('star-on');
  });
};
var exitStar = function(){
  $('.star').removeClass('star-on').removeClass('star-off').addClass('star-off');
};
var rate = function(e){
  // variables finding
  var hungry = Meteor.user().profile.hungry;
  var $tar = $(e.target);
  var $tar_grandparent = $tar.parent().parent();
  var rating_int = $tar.data('starnum');
  var comment = $tar_grandparent.children('textarea').val();
  var order_id = $tar_grandparent.parent().children('.order-link').attr('id');
  var order_obj = Orders.findOne(order_id);
  var ratee;
  if(hungry)
    ratee = order_obj.taker; 
  else
    ratee = order_obj.placer;

  // Data manipulation
  Ratings.insert({
    rater: Meteor.userId(),
    ratee: ratee,
    rating: rating_int,
    details:{
      comments: comment,
      order: order_id
    }
  });
  
  if (hungry)
    Orders.update(order_id, {$set: {finished: "rated"}});
  else
    Orders.update(order_id, {$set: {finished: "fullyfinished"}});

  // cleanup the modal
  $('.hidden-background').remove();
  $('.rate-modal').addClass('hide');
};

var modal_obj = {
  'mouseenter .star': enterStar,
  'mouseleave .star': exitStar,
  'click .star': rate
};
Template.rate_modal.events(modal_obj);
Template.chef_rate_modal.events(modal_obj);
