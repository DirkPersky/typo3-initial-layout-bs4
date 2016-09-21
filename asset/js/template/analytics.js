// Disable tracking if the opt-out cookie exists.
if(typeof gaProperty != 'undefined'){
  var disableStr = 'ga-disable-' + gaProperty;
  if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true;
  }

  // Opt-out function
  // <a href="javascript:gaOptout()">Click here to opt-out of Google Analytics</a>
  function gaOptout() {
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    window[disableStr] = true;
  }

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', gaProperty, 'auto');
  ga('set', 'anonymizeIp', true);
  ga('require', 'displayfeatures');
  ga('send', 'pageview');

  jQuery(document).ready(function($){
    $('html').addClass('analytics');
  });
}
