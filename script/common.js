

function addfavorite() {
  try {
    if (document.all) {
      window.external.addFavorite(location.href, document.title);
    } else if (window.sidebar) {
      window.sidebar.addPanel(document.title, location.href);
    }
  } catch (e) {
    alert("加入收藏失败,当前浏览器版本不支持,请按Ctrl + D 键进行收藏!");
    //window.external.addToFavoritesBar(location.href,document.title);
  }
}

function openNew(url) {
  window.open(url, "_blank", "");
}

$(document).ready(function() {
  var timer;
  $(".nav ul li").hover(
    function() {
      if (timer) {
        clearTimeout(timer);
      }
      $(".nav ul li").removeClass("on");
      $(this).addClass("on");
    },
    function() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout("{$('.nav ul li').removeClass('on');}", 100);
    }
  );
  $(".nav ul li .xiala").hover(
    function() {
      clearTimeout(timer);
    },
    function() {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout("{$('.nav ul li').removeClass('on');}", 100);
    }
  );
  $(".hover")
    .children()
    .hover(
      function() {
        $(this).addClass("cur");
      },
      function() {
        $(this).removeClass("cur");
      }
    );
  $(".curhover").hover(
    function() {
      $(this).addClass("cur");
    },
    function() {
      $(this).removeClass("cur");
    }
  );
});

function setCurrentLeft(curpath, target) {
  $(target)
    .find("a")
    .each(function() {
      if (
        $(this).attr("href") == curpath ||
        curpath.indexOf($(this).attr("href")) > 0
      ) {
        $(this)
          .parent()
          .addClass("cur");
        return false;
      }
    });
}

function copyText(txt) {
  var clipBoardContent = txt;
  try {
    window.clipboardData.setData("Text", clipBoardContent);
    alert("复制成功，请粘贴到你的QQ/MSN上推荐给你的好友");
  } catch (e) {
    window.prompt(
      "复制以下内容，请粘贴到你的QQ/MSN上推荐给你的好友",
      clipBoardContent
    );
  }
}

(function($) {
  $.fn.extend({
    ImgAd: function(opt, callback) {
      //参数初始化
      if (!opt) var opt = {};
      var slideBox = null,
        slideTimeout,
        isPlaying = false,
        imgBox = this,
        pager = null,
        pagerAnchorBuilder = null,
        next = null,
        prev = null;
      var currIndex = 0,
        _this = this.children().eq(0),
        _num = this.children().length;
      var speed = opt.speed ? parseInt(opt.speed, 10) : 500, //卷动速度，数值越大，速度越慢（毫秒）
        timer = opt.timer ? parseInt(opt.timer, 10) : 4000; //滚动的时间间隔（毫秒）
      if (opt.pager) {
        pager = $(opt.pager);
        slideBox = $(opt.pager);
      }
      if (opt.next) {
        next = $(opt.next);
      }
      if (opt.prev) {
        prev = $(opt.prev);
      }
      _this.addClass("img-on");

      ad_init();
      function ad_init() {
        _this.show();
        addSlide();
        ad_paly();
        if (next) {
          next.click(function() {
            clearTimeout(slideTimeout);
            ad_start(currIndex + 1);
            ad_paly();
            return false;
          });
        }
        if (prev) {
          prev.click(function() {
            clearTimeout(slideTimeout);
            if (currIndex == 0) {
              currIndex == _num;
            }
            ad_start(currIndex - 1);
            ad_paly();
            return false;
          });
        }
      }

      function addSlide() {
        if (pager) {
          for (var i = 0; i < _num; i++) {
            var sd = imgBox.children().eq(i);
            sd.css("z-index", _num * 10 - i);
            createPagerAnchor(i, sd);
          }
          pager
            .children()
            .eq(0)
            .addClass("activeSlide");
        }
      }

      function createPagerAnchor(idx, slide) {
        var a;
        if ($.isFunction(opt.pagerAnchorBuilder)) {
          a = opt.pagerAnchorBuilder(idx, slide);
        } else {
          a = '<a href="#">' + (idx + 1) + "</a>";
        }
        if (!a) {
          return;
        }
        $a = $(a);
        $a.bind("click", function() {
          if (idx == slideBox.find("a.activeSlide").index()) {
            ad_paly();
            return false;
          }
          clearTimeout(slideTimeout);
          ad_start(idx);
          return false;
        });
        $a.appendTo(pager);
      }

      function ad_paly() {
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(function() {
          ad_start(currIndex + 1);
        }, timer);
      }

      function ad_start(index) {
        if (isPlaying) {
          return false;
        }
        isPlaying = true;
        index = Math.abs((index + _num) % _num);
        currIndex = index;
        var currBanner = imgBox.children(".img-on");
        var nextBanner = imgBox.children().eq(index);
        if (currBanner[0] == nextBanner[0]) return;
        //nextBanner.show();
        $(nextBanner)
          .css({
            opacity: 0
          })
          .show();

        if (slideBox)
          slideBox
            .find("a")
            .removeClass("activeSlide")
            .eq(index)
            .addClass("activeSlide");

        currBanner.stop(true, false).animate(
          {
            opacity: 0
          },
          {
            duration: speed,
            step: function(p) {
              nextBanner.css({
                opacity: 1 - p
              });
            },
            complete: function() {
              currBanner.hide().removeClass("img-on");
              nextBanner.addClass("img-on");
              isPlaying = false;
            }
          }
        );
        ad_paly();
      }
    }
  });
})(jQuery);
