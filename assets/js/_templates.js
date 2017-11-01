//
// Templates
//

Site.Template = {
  load: function(path, targetSelector) {
    const $target = $(targetSelector);
    path = (path == '/') ? '/us' : path.trimTrailingSlashes();

    $.ajax({
      url: `/static/html/${path}.html`,
      success: function(resp) {
        $target.html(resp);
        Site.path = path + '/';
      }
    });
  }
};
