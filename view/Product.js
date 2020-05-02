define(function() {
  let ka;
  let productInfo;
  const pagePath = "/ppprototype";
  let self = {
    initialization: function(k) {
      ka = k;
    },
    // mount
    mount: function(option) {
      // option.pid
      $("#main-logo").on("click", function(e) {
        location.href = pagePath;
      });
      mapping(option);
      initComponents();
    },
    // un mount
    unmount: function() {}
  };
  return self;

  function mapping(option) {
    const pid = option.pid;
    const itemInfo = ka.getKuproductInfo(pid);
    self.$(".map-ns").text(pid);
    self.$(".map-demo").css({
      width: itemInfo.iframewh[0],
      height: itemInfo.iframewh[1]
    });
    self
      .$(".map-demo")
      .attr(
        "src",
        pagePath + "/items/" + pid + "/dist/index.html?bust={{version}}"
      );
    self.$(".map-zipurl").attr("href", pagePath + "/items/" + pid + ".zip");
    self.$(".dp-zip-info").html(itemInfo.zipInfo);
    self.$(".codepen-include." + pid).show();
  }

  function initComponents() {
    (function() {
      // init status
      $$(".macaos-accordion.macaos-control-wrapper").each(function() {
        uiInit($(this));
        $(this).attr("macaos-init", "true");
      });

      function uiInit($ui) {
        $ui.find(".card-header").on("click", function() {
          var $card = $(this).closest(".card");
          var cacheStatus = $card.attr("macaos-status");
          $ui.find(".card").attr("macaos-status", "close");
          if (cacheStatus == "close") {
            $card.attr("macaos-status", "open");
          }
          uiActive($ui);
        });
        uiActive($ui);
      }

      // change active
      function uiActive($ui, activeIdx) {
        $ui.find(".card").each(function() {
          var $card = $(this);
          var isInit = $ui.attr("macaos-init") == "true";
          if ($card.attr("macaos-status") == "open") {
            // state open
            if (isInit) {
              $card.find(".card-body").slideDown("700", "easeInOutCubic");
            } else {
              $card.find(".card-body").show();
            }
            $card.find(".icon-status").removeClass("icon-macaos-plus");
            $card.find(".icon-status").addClass("icon-macaos-minus");
          } else {
            // state close
            $card.attr("macaos-status", "close");
            if (isInit) {
              $card.find(".card-body").slideUp("700", "easeInOutCubic");
            } else {
              $card.find(".card-body").hide();
            }
            $card.find(".icon-status").removeClass("icon-macaos-minus");
            $card.find(".icon-status").addClass("icon-macaos-plus");
          }
        });
      }

      // get namespace jquery object
      function $$(selector) {
        return $("#macaos-accordion-02 " + selector);
      }
    })();
  }
});
