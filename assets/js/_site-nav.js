//
// Nav
//

Site.Nav = {
  init: function() {
    const $menuBtn = $('.js-site-nav-btn');

    this.setURLParts(Site.path);
    this.loadTemplate(Site.path, '.js-content');

    if('us' == Site.urlParts[0])

    // Toggle the menu
    $menuBtn.on('click', function(e) {
      $('.js-site-nav').toggleClass('is-active');
      $menuBtn.toggleClass('is-active');
      e.preventDefault();
    });

    // Handle home link
    $('.js-home-link').on('click', function(e) {
      const dest = $(this).attr('href');
      Site.Nav.loadTemplate(dest, '.js-content');
      e.preventDefault();
    });

    // Change the view
    $('.js-site-nav-link').on('click', function(e) {
      const dest = $(this).attr('href');
      Site.Nav.loadTemplate(dest, '.js-content');
      e.preventDefault();
    });

    // Change the content section
    $('.js-content').on('click', '.js-content-nav-link', function(e) {
      const dest = $(this).attr('href');
      Site.Nav.loadTemplate(dest, '.js-content-body');
      e.preventDefault();
    });
  },

  preparePath: function(path) {
    return ('/' == path) ? 'home' : path.trimSlashes();
  },

  setURLParts: function(path) {
    Site.urlParts = path.trimSlashes().split('/');
    // console.log(Site.urlParts);
  },

  loadTemplate: function(path, targetSelector) {
    const $target = $(targetSelector);
    path = this.preparePath(path);
    // console.log(path);

    $.ajax({
      url: `/static/html/${path}.html`,
      success: function(resp) {
        $target.html(resp);
        Site.Nav.setURLParts(path);
        if ('home' == path) { return; }
        Site.path = '/' + path + '/';
        // Update address bar
        history.pushState({path: path}, null, Site.path);
      }
    });
  }
};
