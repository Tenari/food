Meteor.effects = {
  fadeToggle: function(flag_name, $toFade, fade_duration){
    if(fade_duration == undefined) {fade_duration = 400;}

    if(Session.equals(flag_name, true)){
      Session.set(flag_name, false);
      $toFade.fadeOut(fade_duration);
    } else {
      Session.set(flag_name, true);
      $toFade.fadeIn(fade_duration);
    }
  },
  showTools: function(){
    Meteor.effects.fadeToggle('toolsOn', $('.tools ul'));
  }
};
