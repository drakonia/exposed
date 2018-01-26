//
// Whispers
//

export const Whispers = {
  init() {
    setTimeout(function() {
      let i = Math.floor(Math.random() * Whispers.whispers.length);
      $('.js-whispers').attr('src', Whispers.whispers[i]);
    }, 45000 + Math.floor(Math.random() * 10000));
  },

  whispers: [
    '/media/voices/rehtaerb_nawom.wav',
    '/media/voices/rehtaerb.wav',
    '/media/voices/retlehs_kees.wav',
    '/media/voices/setadpu_erom.wav',
    '/media/voices/tsacdaord_ycnegreme.wav',
    '/media/voices/tset_a_ton.wav',
    '/media/voices/mlac_niamer.wav',
    '/media/voices/jingle_03c.wav',
    '/media/voices/jingle_03d.wav',
    '/media/voices/jingle_03f.wav',
    '/media/voices/jingle_06a.wav',
    '/media/voices/jingle_11a.wav',
    '/media/voices/jingle_12a.wav'
  ]
};
