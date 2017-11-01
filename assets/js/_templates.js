//
// Templates
//


/* global Site */


Site.Template = {
  load: function(path) {
    const name = this.getName(path);

    $.ajax({
      url: `/static/html/${name}.html`,
      success: function(resp) {
        $('.js-content').html(resp);
        Site.path = path;
      }
    });
  },

  getName: function(path) {
    // Load the "Us" module by default
    return (path == '/') ? 'us' : path.replaceAll('/');
  }
};
