"use strict";

$(function() {
    //ローディング
   var loadCount = 0, //loading状況の初期化
       imgLength = $("img").size(); //読み込む画像の数を取得

   $("img").each(function() {
       var src = $(this).attr("src");
       $("<img>")
           .attr("src", src)
           .load(function() {
               loadCount++; //画像が読み込まれたら、loading状況を更新
           });
   });

   var timerLoader = setInterval(function() { //一定間隔でloading状況をローディングバーに反映
       if ((loadCount / imgLength) * 100 == 100) { //100%読み込まれたらローディングバーを隠す

           //ロード完了！

           clearInterval(timerLoader);

           $("#loader").transition({
               "opacity": 0
           }, 750, "easeOutCubic", function() {
               $(this).remove();
           });

           initMain();
       }
   }, 1000);

    // smooth scroll
    var smoothscroll = function smoothscroll(position, speed) {
        $('body,html').animate({
            scrollTop: position
        }, speed, 'easeOutExpo');
    };
    $('a[href^="#"]').on('click', function() {
        var s = 1400; // ミリ秒
        var href = $(this).attr('href');
        var target = $(href == "#" || href == "" ? 'html' : href);
        var p = target.offset().top;
        smoothscroll(p, s);
        return false;
    });

    //メインスライダー
    if (window.parent.screen.width <= 1024) {
        var _slide = $(".main-visual .sp li");
    } else {
        var _slide = $(".main-visual .pc li");
    }
    var _speed = 5000;
    var _fadespeed = 3000;
    var _page = 1;

    function initMain() {
        _slide.css({
            "opacity": 0
        })
        _slide.eq(0).css({
            "opacity": 1
        })
        setSlideMain();
    }

    function setSlideMain() {
        _slide.eq(_page - 1).find('img').transition({
            delay: 0,
            // "transform": "translateX(-30px)"
            "transform": "scale(1.1)"
        }, _speed + _fadespeed, "linear", function() {

        });
        setInterval(function() {

            //FADEOUT
            _slide.eq(_page - 1).transition({
                "opacity": 0
            }, _fadespeed, "easeOutCubic", function() {});
            if (_page < _slide.length) {
                _page++;
            } else {
                _page = 1;
            }

            //FADEIN
            _slide.eq(_page - 1).transition({
                "opacity": 1
            }, _fadespeed, "easeOutCubic", function() {});

            _slide.eq(_page - 1).find('img').css({
                "transform": "scale(1)"
            })
            _slide.eq(_page - 1).find('img').transition({
                delay: 0,
                "transform": "scale(1.1)"
            }, _speed + _fadespeed, "linear", function() {

            });
        }, _speed)
    }




    // menu
    $('.grobalNav-toggleButton').on('click', function () {
      $('.header-inner').toggleClass('isMenuOpening');
    });
    $('.grobalNav a').on('click', function () {
      $('.header-inner').removeClass('isMenuOpening');
    });

    // concept-photos
    var slickOptionCencept = {
        speed: 10000,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',
        dots: false,
        slidesToShow: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        centerMode: true,
        variableWidth: true
    };

    $('.concept-photos').slick(slickOptionCencept);

    // menu-photos
    var slickOptionMenuList = {
        speed: 500,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'ease',
        dots: true,
        dotsClass: 'slick-dots',
        slidesToShow: 1,
        pauseOnFocus: false,
        pauseOnHover: false,
        centerMode: false,
        variableWidth: true

    };

    $('.menulist-photos').slick(slickOptionMenuList);

    // # fadein contents
    $('.js-fadein').on('inview', function(event, isInView) {
        var target = $(this);
        if (isInView) {
            target.addClass('isShown');
            $(this).off('inview');
        }
    });

    // ScrollReveal
    window.sr = ScrollReveal({ reset: false });
    // bottom
    sr.reveal('.sr-bottom', { distance: "40px", delay: "0", duration: "2000" });
    // left
    sr.reveal('.sr-left', { origin: "left", distance: "40px", delay: "0", duration: "2000" });
    // right
    sr.reveal('.sr-right', { origin: "right", distance: "40px", delay: "0", duration: "1000" });
    // opacity
    sr.reveal('.sr-opacity', { distance: "0", delay: "300" });
});
