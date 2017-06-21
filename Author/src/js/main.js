//slider1
;(function ($) {
    $(function () {
        //rule for slider
        $('.slider').slick({
            arrows: true,
            // autoplay: true,
            speed: 1500,
            dots: false,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
        //rule for fly scroll
        $('.fly').click(function () {
            var target = $(this).attr('href');
            $('html, body').animate({scrollTop: $(target).offset().top}, 800);
            return false;
        });
        //rule for hover in block "offers"
        $('.select__btn').hover(function () {
            $(this).closest('.select').siblings('.plan__title').toggleClass('active')
        });
        //rule for fixed menu
        $(window).on('scroll', function () {
            var object = $('.header');
            if ($(this).scrollTop() > 100) {
                object.addClass("fixed");
            } else {
                object.removeClass("fixed");
            }
        });
        //rule for form validation
        $.validator.addMethod("realname", function (value, element) {
            return this.optional(element) || /^[а-яё, a-z]+$/i.test(value);
        }, "Ведите свое имя без цифр");
        $('#form').validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true,
                    minlength: 3,
                    realname: true
                }
            }
        });
        //rule for responsive menu
        $('.header__menu-compact').on('click', function () {
            $(this).next().slideToggle(200)
        });
        $(window).on('resize', function () {
            var menu = $('.header__menu');
            if ($(window).width() >= 700){
                menu.show()
            }
            else {
                menu.hide()
            }
        });
    });


})(jQuery);

