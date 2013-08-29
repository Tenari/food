Template.rate_modal.events({
  'mouseenter .star':function(e){
    var $target = $(e.target);
    var which_star = parseInt($target.data('starnum'));

    $('.star').each(function(){
      if (parseInt($(this).data('starnum')) <= which_star)
        $(this).removeClass('star-off').addClass('star-on');
    });
  },
  'mouseleave .star':function(){
    $('.star').removeClass('star-on').removeClass('star-off').addClass('star-off');
  },
  'click .star': function(e){
    // variables finding
    var $tar = $(e.target);
    var $tar_grandparent = $tar.parent().parent();
    var rating_int = $tar.data('starnum');
    var comment = $tar_grandparent.children('textarea').val();
    var order_id = $tar_grandparent.parent().children('.order-link').attr('id');
    var order_obj = Orders.find(order_id).fetch()[0];
    var chef_id = order_obj.taker;

    // Data manipulation
    Ratings.insert({
      rater: Meteor.userId(),
      ratee: chef_id,
      rating: rating_int,
      details:{
        comments: comment,
        order: order_id
      }
    });
    Orders.update(order_id, {$set: {finished: "rated"}});

    // cleanup the modal
    $('.hidden-background').remove();
    $('.rate-modal').addClass('hide');
  }
});
