/* Modal handler */
(function($) {
    'use strict';
    $(document).ready(function() {
        $('.modal-open').on('click', function() {
            var target = $(this).data('target');
            $(target).addClass('is-active');
        });
        $('.modal-close, .modal-background').on('click', function() {
            $(this).closest('.modal').removeClass('is-active');
        });
    });
})(jQuery);
