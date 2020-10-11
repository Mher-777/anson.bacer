$(function () {
    function debouncer(func, timeout) {
        var timeoutID, timeout = timeout || 200;
        return function () {
            var scope = this, args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                func.apply(scope, Array.prototype.slice.call(args));
            }, timeout);
        }
    }

    const menuToggle = () => {
        const menu = $('.menu')
        const button = $('.hamburger')
        const footer = $('.footer__copyright')
        const search = $('.header__search')
        button.on('click', function () {
            $(this).toggleClass('is-active')
                $('.content').toggleClass('content--close')
                $('.footer__row').toggleClass('footer__row--close')
                search.toggleClass('header__search--open')
                menu.toggleClass('menu--open')
            if($(this).hasClass('is-active')) {
                footer.slideDown(300)
                footer.addClass('footer__copyright--open')
                $('body').addClass('hidden')
            } else {
                footer.slideUp(300, function () {
                    footer.removeClass('footer__copyright--open')
                    search.removeClass('header__search--open')
                    footer.removeAttr('style');
                    $('body').removeClass('hidden')
                })
            }
        })
        $(window).resize(function () {
            let w = $(window).width();
            if (w > 1000) {
                $('.content').removeClass('content--close')
                $('.footer__row').removeClass('footer__row--close')
                search.removeClass('header__search--open')
                menu.removeAttr('style');
                menu.removeClass('menu--open')
                button.removeClass('is-active')
                $('body').removeClass('hidden')
                footer.removeClass('footer__copyright--open')
            }
        });
    }
    const sliderTabs = () => {
        const content = $('.slider__box')
        const elem = $('.slider__link')

        function sliderTabsResponsive(check) {
            content.hide()
            content.eq(4).show()
            let w = $(window).width();
            if(w >= 940) {
                elem.hover(function () {
                    const elemId = $(this).attr('data-id')
                    content.each(function () {
                        const contentId = $(this).attr('data-content')
                        if (elemId === contentId) {
                            content.hide()
                            $(this).show()
                        }
                    })
                })
            }else {
                elem.on('click', function () {
                    const elemId = $(this).attr('data-id')
                    content.each(function () {
                        const contentId = $(this).attr('data-content')
                        if (elemId === contentId) {
                            content.hide()
                            $(this).show()
                        }

                    })
                })
            }

        }

        sliderTabsResponsive()
        $(window).resize(debouncer(function (e) {
            sliderTabsResponsive()
        }));
    }
    const sliderCarousel = () => {
        function sliderResize() {
            const w = $(window).width()
            let slider = $('.slider__items')
            let elem = $('.slider__item--color-green')
            if (w <= 940) {
                elem.remove()
                $('.slider__inner').append(elem)
                slider.not('.slick-initialized').slick({
                    centerMode: true,
                    centerPadding: '80px',
                    slidesToShow: 4,
                    arrows: false,
                    dots: true,
                    dotsClass: 'pagination',
                    touchThreshold: 20,
                    responsive: [
                        {
                            breakpoint: 863,
                            settings: {
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 661,
                            settings: {
                                slidesToShow: 2,
                                centerPadding: '110px',
                            }
                        },
                        {
                            breakpoint: 601,
                            settings: {
                                slidesToShow: 2,
                                centerPadding: '85.5px',
                            }
                        },
                        {
                            breakpoint: 521,
                            settings: {
                                slidesToShow: 1,
                                centerPadding: '160px',
                                variableWidth: true
                            }
                        }
                    ]
                });
                slider.slick('refresh');
                return false
            } else {
                if (slider.hasClass('slick-initialized')) {
                    slider.slick('unslick');
                }
                elem.remove()
                $('.slider__items>div:eq(3)').after(elem)
            }

        }

        sliderResize()
        $(window).resize(debouncer(function (e) {
            sliderResize()
            sliderTabs()
        }));


    }

    sliderCarousel()
    sliderTabs()
    menuToggle()
})
let scrollPrev = 0;
let header = document.querySelector('.header')
window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;
    if(scrolled >= 100 && scrolled > scrollPrev) {
        header.style.top = -header.offsetHeight + 'px';
    } else {
        header.style.top = 0;
    }
    scrollPrev = scrolled;
});
function WepP(callback) {
    let webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMw' +
        'AgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    webP.onload = webP.onerror = function () {
        callback(webP.height === 2);
    };
}


WepP(function(supported) {
    let html = $('html')
    if(supported) {
        html.addClass('supported-webp')
    } else {
        html.addClass('no-supported-webp')
    }

});

