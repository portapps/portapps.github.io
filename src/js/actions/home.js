var actionHome = {

  init : function(mainSelector) {
    if ($(mainSelector).length <= 0) {
      return;
    }

    $(mainSelector + " .item").matchHeight();
  }
};