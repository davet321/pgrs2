/*
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Modified
*/


(function ($) {
    var raptorUrls = [
        '/images/raptors/raptor.png',
        '/images/raptors/raptor1.png',
        '/images/raptors/raptor2.png',
        '/images/raptors/raptor3.png',
        '/images/raptors/raptor4.png',
        '/images/raptors/raptor5.png',
    ];
    var raptorCounter = 0;

    $.fn.raptorize = function (options) {
        var urlSuffix = window.location.pathname.split('/')[1];
        if (urlSuffix) {
            var randomImageUrl = '/' + urlSuffix + raptorUrls[Math.floor(Math.random() * raptorUrls.length)];
        } else {
            var randomImageUrl = raptorUrls[Math.floor(Math.random() * raptorUrls.length)];
        }
        //Yo' defaults
        var defaults = {
            enterOn: 'timer', //timer, konami-code, click
            delayTime: 100 //time before raptor attacks on timer mode
        };

        //Extend those options
        var options = $.extend(defaults, options);

        return this.each(function () {

            var _this = $(this);

            $("#elRaptor").remove();
            //Raptor Vars
            var raptorImageMarkup = '<img style="display: none;z-index:30000" src="' + randomImageUrl + '" />';
            var locked = false;

            //Append Raptor and Style
            var raptor = $(raptorImageMarkup);
            $('body').append(raptor);
            raptor.css({
                "position": "fixed",
                "bottom": "-310px",
                "right": "0",
                "display": "block"
            })

            init();

            function init() {
                var image = new Image();
                image.onload = function () { initAfterImageLoad() };
                image.src = randomImageUrl;
            }

            // Animating Code
            function initAfterImageLoad() {
                locked = true;

                // Movement Hilarity
                raptor.animate({
                    "bottom": "0"
                }, function () {

                    $(this).animate({
                        "bottom": "-20px"
                    }, 100, function () {
                        var offset = (($(this).position().left) + 1000);
                        $(this).delay(300).animate({
                            "right": offset
                        }, 300, function () {
                          raptor = $('#elRaptor').css({
                            "bottom": "-700px",
                            "right" : "0"
                          })
                          raptor.remove();
                          locked = false;
                        })
                    });
                });
            }
        }); //each call
    } //orbit plugin call
})(jQuery);

(function ($) {
    // konami code - up up down down left right left right b a
    var code = String.fromCharCode(38, 38, 40, 40, 37, 39, 37, 39, 66, 65);
    var codeBuffer = "";
    $(document).keyup(function (e) {
        codeBuffer += String.fromCharCode(e.which);
        if (code.substring(0, codeBuffer.length) == codeBuffer) {
            if (code.length == codeBuffer.length) {
                $("body").raptorize();
                codeBuffer = String.fromCharCode(38, 38, 40, 40, 37, 39, 37, 39, 66);
            }
        } else {
            codeBuffer = "";
        }
    });
})(jQuery);
