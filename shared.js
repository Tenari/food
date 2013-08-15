Router.configure({
  layout: "layout",
  renderTemplates: {
    'title': {to: 'title'}
  }
});

Router.map(function(){
  this.route('primary', {path:"/"});
  this.route('help');
  this.route('legal');
  this.route('about');
  this.route('account-less');
});
