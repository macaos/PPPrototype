define(function() {
  var ka;
  var self = {
    initialization: function(k) {
      ka = k;
      makeGridItems();
      makeInfiniteGrid();
    },
    infiniteGrid: null,
    // mount
    mount: function() {
      self.$(".menu").on("click", function(e) {
        ka.loadView($(this).attr("rel"));
      });
    },
    // un mount
    unmount: function() {}
  };
  return self;

  function makeGridItems() {
    var html = '<div class="grid-sizer"></div>';
    $.each(kuproductList, function(i, item) {
      html +=
        '<div class="grid-item" data-itemname="' +
        item.publicName +
        '">' +
        '<div class="thumb-cover"><img class="thumb" log-id="thumb-' +
        item.publicName +
        '" src="./imgs/thumb-' +
        item.publicName +
        '.png" /></div>' +
        '<div class="title">' +
        item.publicName.replace(/kareui-/, "") +
        "</div>" +
        '<div class="btns-fc" style="height:80px;">' +
        "</div>" +
        "</div>";
    });
    $("#grid-container").html(html);

    $(".btn-fc.btn-demo,.grid-item .thumb").on("click", function() {
      ka.showLoading();
      const pid = $(this)
        .closest(".grid-item")
        .data("itemname");
      if (pid) location.href = "/?pid=" + pid;
    });

    $(".btn-fc.btn-download").on("click", function() {
      const pid = $(this)
        .closest(".grid-item")
        .data("itemname");
      window.location.href = "/items/" + pid + "/pack.min/" + pid + "-min.zip";
    });

    $(".btn-fc.btn-buy").on("click", function() {
      // const pid = $(this).closest('.grid-item').data('itemname');
      // paydom.openPayment(pid);
      // ka.resources.Popoverlay.openModal(pid, 'buy-now');
      window.open($(this).attr("etsylink"));
    });
  }

  function makeInfiniteGrid() {
    self.infiniteGrid = new eg.InfiniteGrid(".grid", {
      horizontal: false,
      transitionDuration: 0.2
    });
    setTimeout(function() {
      // self.infiniteGrid.layout();
      $(".grid").css("opacity", 1);
    }, 1000);

    // return;
    // var grid = document.querySelector('.grid');
    // imagesLoaded(grid, function() {
    //     self.infiniteGrid = new eg.InfiniteGrid(".grid", {
    //         horizontal: false,
    //         transitionDuration: 0.2
    //     });
    //     setTimeout(function() {
    //         self.infiniteGrid.layout();
    //     }, 1000)

    // });
  }

  var kmarket = {
    showModal: function() {
      $("body").addClass("open-modal");
      $("#wrapper-popup").show();
    },
    hideModal: function() {
      $("body").removeClass("open-modal");
      $("#wrapper-popup").hide();
    }
  };

  function onTouchmove(e) {
    e.preventDefault();
  }
});
