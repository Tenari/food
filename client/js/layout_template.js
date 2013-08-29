var kill_modal_fn = function(){
  $('.rate-modal').addClass('hide');
  $('.hidden-background').remove();
};

Template.layout.events({
  'click .hidden-background': kill_modal_fn,
  'click .modal-close': kill_modal_fn
});
