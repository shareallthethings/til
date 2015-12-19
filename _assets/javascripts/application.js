//= require zepto.min
//= require zepto/fx
//= require zepto/fx_methods
//= require plugins/ohsnap.min
//= require plugins/clipboard.min

var clipboard = new Clipboard('.permalink');

clipboard.on('success', function(e) {
  //Give a feedback to the user.
  ohSnap("Link copied to your clipboard", { duration: '2000', color: 'green' });
  setTimeout(function(){
    window.open(e.text, '_blank')
  }, 2100);
});

clipboard.on('error', function(e) {
  // Safari not support it. Open the link in a new tab.
  ohSnap("This browser does not supported the copy. Redirecting...", { duration: '2000', color: 'red' });

  setTimeout(function(){
    var url = $(e.trigger).data('clipboard-text');

    window.location.href = url;
  }, 2000);
});
