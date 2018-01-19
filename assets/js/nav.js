//
// Nav
//

import templateContentNavItem from 'content-nav-item.handlebars';

let Nav = {
  submenus: {
    us: {
      'trashgod': null,
      'syadasti': null,
      'calgothu': null
    }
  },

  init: function() {
    const $menuBtn = $('.js-site-nav-btn');

    this.prepareURLParts(Site.path);
    this.loadTemplate(Site.path, '.js-content');

    // if('us' == Site.urlParts[0])

    // Toggle the menu
    $menuBtn.on('click', function(e) {
      $('.js-site-nav').toggleClass('is-active');
      $menuBtn.toggleClass('is-active');
      e.preventDefault();
    });

    // Handle home link
    $('.js-home-link').on('click', function(e) {
      const dest = $(this).attr('href');
      Nav.loadTemplate(dest, '.js-content');
      e.preventDefault();
    });

    // Change the view
    $('.js-site-nav-link').on('click', function(e) {
      const dest = $(this).attr('href');
      const parts = Nav.prepareURLParts(dest);
      Nav.loadTemplate(dest, '.js-content');
      Nav.loadSubmenu(parts);
      e.preventDefault();
    });

    // Change the content section
    $('.js-content').on('click', '.js-content-nav-link', function(e) {
      const dest = $(this).attr('href');
      Nav.loadTemplate(dest, '.js-content-body');
      e.preventDefault();
    });
  },

  preparePath: function(path) {
    return ('/' == path) ? 'home' : path.trimSlashes();
  },

  /**
   * Create an array of URL parts from a slash-separated path string
   *
   * @param  {string} path
   * @return {array}
   */
  prepareURLParts: function(path) {
    return path.trimSlashes().split('/');
  },

  /**
   * Inject the HTML for a given path into a target element
   *
   * Handles updating browser history and URL in address bar.
   *
   * @param  {string} path
   * @param  {string} targetSelector
   */
  loadTemplate: function(path, targetSelector) {
    const $target = $(targetSelector);
    path = this.preparePath(path);
    // console.log(path);

    $.get(`/static/html/${path}.html`, function(r) {
      $target.html(r);
      Nav.urlParts = Nav.prepareURLParts(path);
      if ('home' == path) { return; }
      Site.path = '/' + path + '/';
      // Update address bar
      history.pushState({path: path}, null, Site.path);
    });
  },

  loadSubmenu: function(urlParts) {
    if (urlParts.length === 0) {
      return;
    }

    const base = urlParts[0];

    if(!this.submenus.hasOwnProperty(base)) {
      return;
    }

    let html = '';
    const submenuData = Nav.submenus[base];
    const $target = $('.js-content-nav');

    Object.keys(submenuData).forEach((key) => {
      let label = submenuData[key] || key;
      html += templateContentNavItem({
        slug: key,
        label: label
      });
    });
    $target.html(html);
  },
};

export default Nav;
