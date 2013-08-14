Template.tools.events({
  'click input' : function () {
    // template data, if any, is available in 'this'
    Meteor.effects.showTools();
  }
});

Template.landing.events({
  'click .hungry-half': function(){
    Meteor.effects.showHungryButtons();
  },
  'click .chef-half': function(){
    Meteor.effects.showChefButtons();
  }
});

