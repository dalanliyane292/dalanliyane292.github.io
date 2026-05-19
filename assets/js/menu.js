/* Menu / navigation toggle */
(function($) {
    'use strict';
    $(document).ready(function() {
        // mobile nav toggle
        $('#nav-toggle').on('click', function() {
            $('nav').toggleClass('open');
        });
    });
})(jQuery);
