$(function () {
    function debouncer( func , timeout ) {
        var timeoutID , timeout = timeout || 200;
        return function () {
            var scope = this , args = arguments;
            clearTimeout( timeoutID );
            timeoutID = setTimeout( function () {
                func.apply( scope , Array.prototype.slice.call( args ) );
            } , timeout );
        }
    }
    const menuToggle = () => {
        const menu = $('.menu')
        const button = $('.hamburger')
        const footer = $('.footer__copyright')
        button.on('click', function () {
            $(this).toggleClass('is-active')
            menu.slideToggle(500, function () {
                menu.toggleClass('menu--open')
                $('body').toggleClass('hidden')
            })
            footer.toggleClass('footer__copyright--open')
        })
        $(window).resize(function () {
            let w = $(window).width();
            if (w > 1000) {
                menu.removeAttr('style');
                button.removeClass('is-active')
                $('body').removeClass('hidden')
                footer.removeClass('footer__copyright--open')
            }
        });
    }
    const sliderTabs = () => {
        const content = $('.slider__box')
        const elem = $('.slider__link')
        content.hide()
        content.eq(4).show()
        elem.hover(function () {
            const elemId = $(this).attr('data-id')
            content.each(function () {
                const contentId = $(this).attr('data-content')
                if(elemId === contentId) {
                    content.hide()
                    $(this).show()
                }

            })
        })
    }
    const sliderCarousel = () => {
        function sliderResize() {
                const w = $(window).width()
                let slider = $('.slider__items')
                let elem = $('.slider__item--color-green')
                if(w <= 940) {
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
                    if(slider.hasClass('slick-initialized')) {
                       slider.slick('unslick');
                    }
                    elem.remove()
                    $('.slider__items>div:eq(3)').after(elem)
                }

        }
        sliderResize()
        $( window ).resize( debouncer( function ( e ) {
            sliderResize()
            sliderTabs()
        } ) );


    }
    sliderCarousel()
    sliderTabs()
    menuToggle()
})
