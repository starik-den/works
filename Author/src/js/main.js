//slider1
;(function ($) {

    $(function () {
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
        $('.fly').click(function () {
            var target = $(this).attr('href');
            $('html, body').animate({scrollTop: $(target).offset().top}, 800);
            return false;
        });
        $('.select__btn').hover(function () {
            $(this).closest('.select').siblings('.plan__title').toggleClass('active')
        });
        $(window).on('scroll', function () {
            var object = $('.header');
            if ($(this).scrollTop() > 100) {
                object.addClass("fixed");
            } else {
                object.removeClass("fixed");
            }
        });
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
    });


})(jQuery);

