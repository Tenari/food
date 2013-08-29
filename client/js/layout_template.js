Template.layout.events({
  'click .hidden-background': function(e){
    $('.rate-modal').addClass('hide');
    $(e.target).remove();
  }
});
