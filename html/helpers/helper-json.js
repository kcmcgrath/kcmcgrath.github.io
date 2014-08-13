(function() {
  module.exports.register = function(Handlebars, options) {

    // Customize this helper
    Handlebars.registerHelper('json', function(str) {
      return JSON.stringify(str);
    });

  };
}).call(this);
