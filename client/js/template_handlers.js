Template.tools.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined')
      console.log("You pressed the button");
    
  }
});

Template.landing.events({
  'click .hungry-half': function(){
    Session.set('half','hungry');
  },
  'click .chef-half': function(){
    Session.set('half','chef');
  }
});
Template.landing.hungry = function(){
  return Session.equals('half','hungry');
};
Template.landing.chef = function(){
  return Session.equals('half','chef');
};
