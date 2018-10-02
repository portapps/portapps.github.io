$(document).ready(function(){
  // Hack related to: https://github.com/twbs/bootstrap/issues/10236
  $(window).on("load resize", function() {
    $(window).trigger("scroll");
  });

  // Smooth scrolling
  $("a.scrollto").on("click", function(e) {
    var target = this.hash;
    e.preventDefault();
    $("body").scrollTo(target, 800, { offset: 0, "axis": "y" });
  });

  // Web fonts
  WebFont.load({
    google: {
      families: [
        'Lora:400,700,400italic,700italic',
        'Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
      ]
    }
  });

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Search app
  if ($("#searchapp").length > 0) {
    $("#searchapp").keyup(function () {
      var filter = $(this).val(), count = 0;
      $(".cards-wrapper .item-enable").each(function () {
        var current = $('.item-enable').attr('data-app');
        if ($(this).text().search(new RegExp(filter, "i")) < 0) {
          $(this).hide();
        } else {
          $(this).show();
          count++;
        }
      });
    });
  }

  actionCdTop.init(".cd-top");
  actionHome.init(".home");
  actionProgressbar.init(".progressbar");
  actionCards.init(".card-section");
});