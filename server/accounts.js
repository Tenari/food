Accounts.onCreateUser(function(options, user){
  user.profile = {
    integrity: 0
  };

  if(options.profile.hungry){
    user.profile.hungry = true;
  }else{  // The user is a chef
    user.profile.hungry = false;
  }
  return user;
});
