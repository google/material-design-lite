$(document).ready(function() {
  $("#sideMenu").swipe({
    swipeRight: function(event, distance, duration, fingerCount, fingerData) {
      $(".mdl-layout__drawer").addClass("is-visible").attr("aria-hidden", "false");
      $(".mdl-layout__drawer-button").attr("aria-expanded", "true");
      $(".mdl-layout__obfuscator").addClass("is-visible");
    },
    threshold: 0
  });
  $(".mdl-layout__drawer").swipe({
    swipeStatus: function(event, phase, direction, distance) {
      if (direction == "left") {
        $(".mdl-layout__drawer.is-visible").css({
          "-webkit-transform": "translateX(" + (-1.5 * distance) + "px)",
          "transform": "translateX(" + (-1.5 * distance) + "px)"
        });
        if ((phase == "cancel" || phase == "end") && distance > 100) {
          $(".mdl-layout__drawer").attr("aria-hidden", "true").removeClass("is-visible").attr("style", "");
          $(".mdl-layout__drawer-button").attr("aria-expanded", "true");
          $(".mdl-layout__obfuscator").removeClass("is-visible");
        }
        if ((phase == "cancel" || phase == "end") && distance < 100) {
          $(".mdl-layout__drawer").attr("style", "");
        }
      }
    },
    allowPageScroll: "horizontal"
  });
});
