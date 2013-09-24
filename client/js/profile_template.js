var handleAddress = function(){
  Meteor.shared.validateAddress('own-address');

  var address = $('#address').val();
  Session.set('own-address', address);
};
Template.profile.helpers({
  integrity: function(){
    var id = Meteor.userId();
    var ratings = Ratings.find({ratee: id});
    var count = ratings.count();
    ratings = ratings.fetch();

    var sum = 0;
    for(var i = 0; i < ratings.length; i++){
      sum = sum + parseInt(ratings[i].rating);
    }
    
    var raw_integrity = Math.log(count) * (sum / count);
//    Meteor.users.update(id, {$set: {"profile.integrity": raw_integrity}});

/*    var own_team = Meteor.users.find({"profile.hungry":Meteor.user().profile.hungry}).fetch();

    var biggest = 0;
    for(i = 0; i < own_team.length; i++){
      if (parseInt(own_team[i].profile.integrity) > biggest)
        biggest = parseInt(own_team[i].profile.integrity);
    }*/

    var biggest = 10;
    var adjusted_integrity = Math.min(((raw_integrity / biggest) * 100), 100);
    if (isNaN(adjusted_integrity)) return 0;
    return parseInt(adjusted_integrity);
  },
  logged_in_and_own_profile: function(){
    return Meteor.userId() && Meteor.userId() == this._id;
  }
});

Template.profile.events({
  'click #show-address': function(e){
    var elem = $('#address-block');
    if (elem.hasClass("hide")){
      elem.removeClass("hide");
    } else {
      elem.addClass("hide");
    }
  },
  'change': function(e){
    handleAddress();
  },
  'click #set-address': function(e){
    handleAddress();

    Meteor.users.update( Meteor.userId(), {$set: {"profile.location": {
      address: Session.get('own-address'),
      lat: Session.get('lat'),
      lng: Session.get('lng')
    }}});
  }
});
