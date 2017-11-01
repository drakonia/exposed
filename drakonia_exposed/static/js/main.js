'use strict';

//
// Utilities
//

String.prototype.replaceAll = function (search) {
  var replacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return this.replace(new RegExp(search, 'g'), replacement);
};
"use strict";

// eslint-disable-next-line no-unused-vars
jQuery(document).ready(function ($) {
  Site.Nav.init();
  Site.Template.load(Site.path);
  Site.Whispers.init();
});
'use strict';

//
// Nav
//

Site.Nav = {
  init: function init() {
    var $menu = $('.js-site-nav');
    var $menuBtn = $('.js-site-nav-btn');
    var $menuLink = $('.js-site-nav-link');

    // Toggle the menu
    $menuBtn.on('click', function (e) {
      $menu.toggleClass('is-active');
      $menuBtn.toggleClass('is-active');
      e.preventDefault();
    });

    // Change the view
    $menuLink.on('click', function (e) {
      var dest = $(this).attr('href');
      Site.Template.load(dest);
      e.preventDefault();
    });
  }
};
'use strict';

//
// Templates
//

Site.Template = {
  load: function load(path) {
    var name = this.getName(path);

    $.ajax({
      url: '/static/html/' + name + '.html',
      success: function success(resp) {
        $('.js-content').html(resp);
        Site.path = path;
      }
    });
  },

  getName: function getName(path) {
    // Load the "Us" module by default
    return path == '/' ? 'us' : path.replaceAll('/');
  }
};
'use strict';

//
// Whispers
//


Site.Whispers = {
  init: function init() {
    setTimeout(function () {
      var whisperIndex = Math.floor(Math.random() * this.whispers.length);
      $('.js-whispers').attr('src', this.whispers[whisperIndex]);
    }, 45000 + Math.floor(Math.random() * 10000));
  },

  whispers: ['/media/voices/rehtaerb_nawom.wav', '/media/voices/rehtaerb.wav', '/media/voices/retlehs_kees.wav', '/media/voices/setadpu_erom.wav', '/media/voices/tsacdaord_ycnegreme.wav', '/media/voices/tset_a_ton.wav', '/media/voices/mlac_niamer.wav', '/media/voices/jingle_03c.wav', '/media/voices/jingle_03d.wav', '/media/voices/jingle_03f.wav', '/media/voices/jingle_06a.wav', '/media/voices/jingle_11a.wav', '/media/voices/jingle_12a.wav']
};
//# sourceMappingURL=main.js.map
