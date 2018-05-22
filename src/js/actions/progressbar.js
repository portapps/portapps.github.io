var actionProgressbar = {

  init : function(mainSelector) {
    if ($(mainSelector).length <= 0) {
      return;
    }

    $(".progressbar-fill").delay(1000).queue(function () {
      var time = $(this).attr("data-time") || 2;
      $(this).css("width", "100%").css("transition", "width " + time + "s ease-in-out");
    });
  }
};