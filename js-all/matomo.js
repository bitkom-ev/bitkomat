<!-- Matomo -->

var _paq = window._paq = window._paq || [];
/* Basic Matomo setup */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

/* Additional Matomo setup */
(function () {
    var matomoUrlPrimary = 'https://matomo.bitkom.org/';
    var siteIdPrimary = '30';
    var matomoUrlSecondary = 'https://bitkommitgliederportal.matomo.cloud/';
    var siteIdSecondary = '4';
    var secondaryTrackerUrl = 'https://cdn.matomo.cloud/bitkommitgliederportal.matomo.cloud/matomo.js';
    var secondaryWebsiteId = '4';

    // Set up primary tracker
    _paq.push(['setTrackerUrl', matomoUrlPrimary + 'matomo.php']);
    _paq.push(['setSiteId', siteIdPrimary]);

    // Set up secondary tracker
    _paq.push(['addTracker', matomoUrlSecondary + 'matomo.php', siteIdSecondary]);

    // Defer Matomo script loading until after the main content has loaded
    window.addEventListener('load', () => {
        loadMatomoScript(matomoUrlPrimary + 'matomo.js');
    });

    function loadMatomoScript(src) {
        var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
        g.async = true;
        g.defer = true;
        g.src = src;
        s.parentNode.insertBefore(g, s);
    }

    // Load primary Matomo script
    loadMatomoScript(matomoUrlPrimary + 'matomo.js');

    // Load secondary Matomo script
    loadMatomoScript(secondaryTrackerUrl);

})();

<!-- End Matomo Code -->
