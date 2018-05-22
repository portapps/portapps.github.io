var actionCards = {

  init : function(mainSelector) {
    if ($(mainSelector).length <= 0) {
      return;
    }

    $(mainSelector + " .item-inner").matchHeight();
  }
};