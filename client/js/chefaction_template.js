Template.chefaction.helpers({
  action: function(){
    return Session.get('chef-action') == undefined;
  }
});
Template.chefaction.rendered = function(){
  $('.chef-half .landing-action').hide().fadeIn();
};
