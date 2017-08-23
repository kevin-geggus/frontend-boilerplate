import shared from './fonts-shared';

let cookieDays = 1;

function setCookie() {
  const date = new Date();
    date.setTime(date.getTime() + (cookieDays * 24 * 60 * 60 * 1000));

    window.document.cookie = 'fonts-loaded=true; expires=' + date.toGMTString() + '; path=/';
}

if (!shared.check()) {
    require.ensure(['fontfaceobserver/fontfaceobserver'], function() {
        const FontFaceObserver = require('fontfaceobserver/fontfaceobserver');

        const observer = new FontFaceObserver('Montserrat');

        observer
            .load()
            .then(shared.loaded)
            .then(setCookie)
            .then(null, function(){})
        ;

    });
}
