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
        "/items/" + pid + "/pack.min/dist/index.html?bust={{version}}"
      );
    self
      .$(".map-zipurl")
      .attr("href", "/items/" + pid + "/pack.min/" + pid + "-min.zip");
    self.$(".dp-zip-info").html(itemInfo.zipInfo);
    self.$(".codepen-include." + pid).show();
  }

  function initComponents() {
    (function() {
      // init status
      $$(".kareui-accordion.kareui-control-wrapper").each(function() {
        uiInit($(this));
        $(this).attr("kareui-init", "true");
      });

      function uiInit($ui) {
        $ui.find(".card-header").on("click", function() {
          var $card = $(this).closest(".card");
          var cacheStatus = $card.attr("kareui-status");
          $ui.find(".card").attr("kareui-status", "close");
          if (cacheStatus == "close") {
            $card.attr("kareui-status", "open");
          }
          uiActive($ui);
        });
        uiActive($ui);
      }

      // change active
      function uiActive($ui, activeIdx) {
        $ui.find(".card").each(function() {
          var $card = $(this);
          var isInit = $ui.attr("kareui-init") == "true";
          if ($card.attr("kareui-status") == "open") {
            // state open
            if (isInit) {
              $card.find(".card-body").slideDown("700", "easeInOutCubic");
            } else {
              $card.find(".card-body").show();
            }
            $card.find(".icon-status").removeClass("icon-kareui-plus");
            $card.find(".icon-status").addClass("icon-kareui-minus");
          } else {
            // state close
            $card.attr("kareui-status", "close");
            if (isInit) {
              $card.find(".card-body").slideUp("700", "easeInOutCubic");
            } else {
              $card.find(".card-body").hide();
            }
            $card.find(".icon-status").removeClass("icon-kareui-minus");
            $card.find(".icon-status").addClass("icon-kareui-plus");
          }
        });
      }

      // get namespace jquery object
      function $$(selector) {
        return $("#kareui-accordion-02 " + selector);
      }
    })();
  }
});
