//
// Nav
//

Site.Nav = {
  init: function() {
    const $menu = $('.js-site-nav');
    const $menuBtn = $('.js-site-nav-btn');
    const $menuLink = $('.js-site-nav-link');

    // Toggle the menu
    $menuBtn.on('click', function(e) {
      $menu.toggleClass('is-active');
      $menuBtn.toggleClass('is-active');
      e.preventDefault();
    });

    // Change the view
    $menuLink.on('click', function(e) {
      const dest = $(this).attr('href');
      Site.Template.load(dest);
      e.preventDefault();
    });
  }
};
