import './utils';
import Nav from './nav';
import Whispers from './whispers';

jQuery(document).ready(function($) {
  $('html').attr('class', 'js');

  Nav.init();
  Whispers.init();
});
