/* custom.js - site-specific scripts */
(function($) {
    'use strict';
    $(document).ready(function() {

        function decodeBase64(v) {
            try { return window.atob(v || ''); } catch(e) { return ''; }
        }

        function mountHtml(el, html) {
            if (!el || typeof html !== 'string' || !html.trim()) return;
            el.innerHTML = html;
            el.querySelectorAll('script').forEach(function(old) {
                var s = document.createElement('script');
                Array.from(old.attributes).forEach(function(a) { s.setAttribute(a.name, a.value); });
                if (old.textContent) s.textContent = old.textContent;
                old.parentNode.replaceChild(s, old);
            });
        }

        var slots = Array.from(document.querySelectorAll('[data-lazy-ad][data-ad-html]'));

        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function(entries) {
                entries.forEach(function(e) {
                    if (!e.isIntersecting) return;
                    mountHtml(e.target, decodeBase64(e.target.dataset.adHtml || ''));
                    io.unobserve(e.target);
                });
            }, {
                // rootMargin besar agar slot yang sudah di viewport juga kena trigger
                rootMargin: '600px 0px'
            });

            slots.forEach(function(s) { io.observe(s); });

            // Fallback: paksa mount semua slot yang sudah terlihat di viewport
            // setelah 300ms (antisipasi slot yang tidak kena IntersectionObserver)
            setTimeout(function() {
                slots.forEach(function(el) {
                    // Kalau sudah di-mount, innerHTML tidak kosong — skip
                    if (el.innerHTML.trim() !== '') return;
                    var rect = el.getBoundingClientRect();
                    var inView = rect.top < window.innerHeight + 600;
                    if (inView) {
                        mountHtml(el, decodeBase64(el.dataset.adHtml || ''));
                        io.unobserve(el);
                    }
                });
            }, 300);

        } else {
            // Browser lama: mount semua langsung
            slots.forEach(function(s) {
                mountHtml(s, decodeBase64(s.dataset.adHtml || ''));
            });
        }

    });
})(jQuery);