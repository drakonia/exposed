//
// Nav
//

Site.Nav = {
  init: function() {
    const $menu = $('.js-site-nav');
    const $menuBtn = $('.js-site-nav-btn');
    const $menuLink = $('.js-site-nav-link');
    const $content = $('.js-content');

    // Toggle the menu
    $menuBtn.on('click', function(e) {
      $menu.toggleClass('is-active');
      $menuBtn.toggleClass('is-active');
      e.preventDefault();
    });

    // Change the view
    $menuLink.on('click', function(e) {
      const dest = $(this).attr('href');
      Site.Template.load(dest, '.js-content');
      e.preventDefault();
    });

    // Change the content section
    $content.on('click', '.js-content-nav-link', function(e) {
      const dest = $(this).attr('href');
      Site.Template.load(dest, '.js-content-body');
      e.preventDefault();
    });
  }
};
