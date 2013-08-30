Meteor.startup(function(){
  // create the countdown timer interval.
  var timer_id = window.setInterval(function(){
    $('.time').each(function(){
      var $me = $(this);
      var current_time = parseInt($me.text());

      if (current_time > 0)
        $me.text(current_time - 1);
    });
  },1000);// 1000ms = 1s
  
  // store the timer_id in case we want to stop the timer.
  Session.set('coundown-timer', timer_id);
});
