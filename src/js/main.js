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

  function filterApps() {
    var filter = $.trim($("#searchapp").val()).toLowerCase();
    var showInactive = $("#show-inactive-apps").is(":checked");

    $(".cards-wrapper .item-enable").each(function () {
      var item = $(this);
      var appName = item.data("app") || "";
      var appLabel = item.find(".title").text();
      var appStatus = item.data("status");
      var matchesStatus = showInactive || appStatus === "ok";
      var matchesSearch = (appName + " " + appLabel).toLowerCase().indexOf(filter) > -1;

      item.toggle(matchesStatus && matchesSearch);
    });
  }

  // Search app
  if ($("#searchapp").length > 0) {
    $("#searchapp").on("keyup input", filterApps);
    $("#show-inactive-apps").on("change", filterApps);
    filterApps();
  }

  actionCdTop.init(".cd-top");
  actionHome.init(".home");
  actionProgressbar.init(".progressbar");
  actionCards.init(".card-section");
  actionAppDownload.init(".download-list");
});
