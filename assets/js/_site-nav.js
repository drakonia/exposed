jQuery(document).ready(function($) {

  let $menu = $('.js-site-nav');
  let $menuBtn = $('.js-site-nav-btn');
  // let $menuItem = $('.js-site-nav-item');

  $menuBtn.click(function(e) {
    e.preventDefault();
    $menu.toggleClass('is-active');
    $menuBtn.toggleClass('is-active');
  });

  // $menuItem.click(function(e) {
  //   e.preventDefault();
  //   $(this).toggleClass('is-active');
  // });

});
