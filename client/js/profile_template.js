var handleAddress = function(){
  Meteor.shared.validateAddress('own-address');

  var address = $('#address').val();
  Session.set('own-address', address);
};

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
