var actionCdTop = {

  init : function(mainSelector) {
    if ($(mainSelector).length <= 0) {
      return;
    }

    // Hide or show the "back to top" link
    $(window).scroll(function(){
      if ($(this).scrollTop() > 300) {
        $(mainSelector).addClass("cd-is-visible")
      } else {
        $(mainSelector).removeClass("cd-is-visible cd-fade-out");
      }
      if ($(this).scrollTop() > 1200) {
        $(mainSelector).addClass("cd-fade-out");
      }
    });

    // Smooth scroll to top
    $(mainSelector).on("click", function(event){
      event.preventDefault();
      $("body, html").animate({
          scrollTop: 0
        }, 700
      );
    });
  }
};