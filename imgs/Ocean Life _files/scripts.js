/* jshint esversion: 6 */

(function ($, Drupal, once) {
  Drupal.behaviors.a_clean_whatAreFossilFuels = {
    attach: function (context) {
      $(once('setHeightIframe', '.node-110499 iframe', context)).each(function () {
        let width = $(this).width();
        let height = parseFloat($(this).attr('id')) / 100;
        $(this).height(width * height);
        // console.log(width + ' * ' + height);

        $(window).resize(function () {
          // console.log(width + ' * ' + height + 'px Resized');
          width = $('.node-110499 iframe').width();
          $('.node-110499 iframe').height(width * height);
        });
      });

      $(once('setHeightIframe', '.timeline-section-header.not-intro_wrapper', context)).each(function () {

        let height = $(this).height();
        let titleHeight = $(this).children('.timeline-section__title-box').children('.timeline-section__title').height() + 40;
        let textHeight = $(this).children('.timeline-section__title-box').children('.timeline-section__intro-text').height();
        let wrapperHeight = textHeight + titleHeight;


        if((height - wrapperHeight) < 322) {
          $(this).height(wrapperHeight + 322);
          // console.log(height + ':' + (wrapperHeight + 322));
        }

        $(window).resize(function () {
          $('.timeline-section-header.not-intro_wrapper').each(function () {
            height = $(this).height();
            titleHeight = $(this).children('.timeline-section__title-box').children('.timeline-section__title').height() + 40;
            textHeight = $(this).children('.timeline-section__title-box').children('.timeline-section__intro-text').height();
            wrapperHeight = textHeight + titleHeight;

            $(this).height(wrapperHeight + 322);
            // console.log(height + ':' + (wrapperHeight + 322));
          });
        });

      });
    }
  };

  let scroll = false;
  let url = window.location.href;
  if (url.indexOf('?f[0]=') != -1 || url.indexOf('?f%5B0%5D=') != -1) {
    scroll = true;
  }

  let tray = 0;
  if ($('body').hasClass('toolbar-tray-open')) {
    tray = 39;
  }

  let toolbar = 0;
  if ($('body').hasClass('toolbar-horizontal')) {
    toolbar = 39;
  }
  let toolTray = tray + toolbar;

  // 'use strict';
  let offSet;
  if ($('.l-navigation__grid').css('height') == '57px') {
    offSet = 0;
  }
  else {
    offSet = 40;
  }

  let wrap = $('.l-navigation');
  let eTop = $(wrap).offset().top + offSet;

  // Generic function that runs on window resize.
  function resizeStuff() {
    if (!$('.l-navigation__grid').hasClass('fixed')) {
      if ($('.l-navigation__grid').css('height') == '57px') {
        offSet = 0;
      }
      else {
        offSet = 40;
      }

      eTop = $(wrap).offset().top + offSet;
    }
    else {
    }
  }

  // Custom GA Stuff
  if ($('body').hasClass('user-logged-in')) {
    // Do Nothing
    notLoggedIn = 0;
  }

  $(document).ready(function () {
    /* Set timer to pin GA to no bounce */
    // setTimeout("timedCount()", 45000);
  });

  // Runs function once on window resize.
  let TO = false;
  $(window).resize(function () {
    if (TO !== false) {
      clearTimeout(TO);
    }

    // 200 is time in miliseconds.
    TO = setTimeout(resizeStuff, 200);
  }).resize();

  Drupal.behaviors.a_clean_oceanScrollFilter = {
    attach: function (context, settings) {
      // once('setScroll');
      $(once('setScroll', '.scrollFilter', context)).each(function () {
        if (scroll) {
          $('html,body').animate({scrollTop: $(this).offset().top}, 'slow');
        }
      });
    }
  };

  Drupal.behaviors.a_clean_oceanTreeOfLife = {
    attach: function (context, settings) {
      // once('setHeight');
      $(once('setHeight', '.node-110448 iframe', context)).each(function () {
        let width = $(this).width();
        $(this).height(width * 0.863);

        // console.log(width * 0.9643 + 'px 2');

        $(window).resize(function () {
          // console.log(width * 0.9643 + 'px 3');
          width = $('.node-110448 iframe').width();
          $('.node-110448 iframe').height(width * 0.863);
        });
      });

      $(once('setHeight2', '.node-110447 iframe', context)).each(function () {
        let width = $(this).width();
        $(this).height(width * 1.86);

        // console.log(width * 1.86 + 'px');

        $(window).resize(function () {
          width = $('.node-110447 iframe').width();
          $('.node-110447 iframe').height(width * 1.86);
          // console.log(width * 1.86 + 'px - Resize');
        });
      });
    }
  };

  function setIntro() {
    if ($('.overview-top__wrapper ul').css('display') == 'none') {
      if ($('.intro-aside-wrapper .intro-text.desktop').length > 0) {
        $('.intro-aside-wrapper .intro-text.desktop').insertBefore('.side-overview');
        $('.intro-aside-wrapper .intro-text').removeClass('desktop');
        $('.intro-aside-wrapper .intro-text').addClass('mobile');
      }
    }
    else {
      if ($('.intro-aside-wrapper .intro-text.mobile').length > 0) {
        $('.intro-aside-wrapper .intro-text.mobile').insertAfter('.side-overview');
        $('.intro-aside-wrapper .intro-text').addClass('desktop');
        $('.intro-aside-wrapper .intro-text').removeClass('mobile');
      }
    }
  }

  Drupal.behaviors.a_clean_oceanShowOverviewMenu = {
    attach: function (context, settings) {
      // once('showOvrMnu')
      $(once('.node-page--node-type-overview', context)).each(function () {
        // $('.overview-top__wrapper ul').show(400);
        // e.preventDefault();
        if ($('.topic-menu .l-constrain .responsive-menu-toggle-icon ').css('display') === 'block') {
          setIntro();
        }

        $(window).resize(function () {
          // console.log($('.topic-menu .l-constrain .responsive-menu-toggle-icon ').css('display'));
          if ($('.topic-menu .l-constrain .responsive-menu-toggle-icon ').css('display') === 'none') {
            $('.overview-top__wrapper ul').css('display', 'block');
          } else {
            $('.overview-top__wrapper ul').css('display', 'none');
          }

          setIntro();
        });

        $('.overview-top__wrapper .responsive-menu-toggle-icon', context).on('click', function (e) {
          e.preventDefault();
          $('.overview-top__wrapper ul').toggle(400);
          return null;
        });
      });
    }
  };

  Drupal.behaviors.a_clean_oceanShowTimelineMenu = {
    attach: function (context, settings) {
      $(once('showTimeMnu', '.node-page--node-type-timeline', context)).each(function () {
        // $('.overview-top__wrapper ul').show(400);
        // e.preventDefault();

        $(window).resize(function () {
          if ($('.overview-top__wrapper').innerWidth() > 700) {
            // console.log($('.overview-top__wrapper').innerWidth());
            // if ($('.overview-top__wrapper ul.menu--overview-top').css('display') == 'none') {
            //   $('.overview-top__wrapper ul.menu--overview-top').toggle(50);
            // }
          }

          setIntro();
        });

        $('.overview-top__wrapper .responsive-menu-toggle-icon', context).on('click', function (e) {
          e.preventDefault();
          $('.overview-top__wrapper ul').toggle(400);
          return null;
        });
      });
    }
  };

  Drupal.behaviors.a_clean_oceanExpandMenu = {
    attach: function (context, settings) {
      $(once('menuExpanded', '.l-navigation .menu--main li.has-subnav', context)).each(function () {


        $(this).hover(function () {
          $(this).toggleClass('menu-expanded');
        });

        $(this).focusin(function () {
          // alert( "Handler for .focus() called." );
          $(this).addClass('menu-expanded');
        });

        $(this).focusout(function () {
          let elem = $(this);
          setTimeout(function () {
            let hasFocus = !!(elem.find(':focus').length > 0);
            if (!hasFocus) {
              $(elem).removeClass('menu-expanded');
            }
          }, 10);
        });
      });
    }
  };


  Drupal.behaviors.a_clean_oceanExpandMenu2 = {
    attach: function (context, settings) {
      $(once('menuExpanded2', '.l-navigation .menu--main-menu-topic li.has-subnav', context)).each(function () {
        $(this).hover(function () {
          $(this).toggleClass('menu-expanded');
        });

        $(this).focusin(function () {
          // alert( "Handler for .focus() called." );
          $(this).addClass('menu-expanded');
        });

        $(this).focusout(function () {
          let elem = $(this);
          setTimeout(function () {
            let hasFocus = !!(elem.find(':focus').length > 0);
            if (!hasFocus) {
              $(elem).removeClass('menu-expanded');
            }
          }, 10);
        });
      });
    }
  };

  Drupal.behaviors.a_clean_oceanMoveSearch = {
    attach: function (context, settings) {
      $(once('moveSearch', '#views-exposed-form-op-site-search-default #edit-actions input', context)).each(function () {
        $(this).insertAfter(".form-item--id-search-api-fulltext input");
        $(this).attr('value', 'Search');
      });
    }
  };

  Drupal.behaviors.a_clean_oceanOpenFilter = {
    attach: function (context, settings) {
      $(once('openFilter', '.search-filter__facet h2', context)).each(function () {
        $(this).click(function () {
          if ($(this).siblings('.facets-widget-checkbox').hasClass('filter-open')) {
            $(this).siblings('.facets-widget-checkbox').hide(400);
          }
          else {
            $(this).siblings('.facets-widget-checkbox').show(400);
          }

          $(this).siblings('.facets-widget-checkbox').toggleClass('filter-open');
        });
      });
    }
  };

  Drupal.behaviors.a_clean_oceanSVGMap = {
    attach: function (context, settings) {
      $(once('closeFilter', '.svgmap', context)).each(function () {
        if (typeof mwhsInfo != 'undefined') {
          // alert(1);
          /* Start SVG */
          let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute('name', 'svgMap');
          svg.setAttribute('id', 'mwhsMapSVG');
          svg.setAttribute('width', '900px');
          svg.setAttribute('height', '444px');
          svg.setAttribute('viewBox', '0 0 900 446');
          svg.setAttribute('preserveAspectRatio', 'none');
          svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

          let svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image'); //Create a circle in SVG's namespace

          let mapImg = $('#mapImg');

          // $('#mapImg').hide();
          // $('#mwhsMap').hide();

          svgimg.setAttribute("x", 0);
          svgimg.setAttribute("y", 0);
          svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', $(mapImg).attr('src'));
          svgimg.setAttribute("width", $(mapImg).attr('width'));
          svgimg.setAttribute("height", $(mapImg).attr('height'));

          svg.appendChild(svgimg);

          let newElement;
          let anchor;
          for (var mwhs in mwhsInfo) {
            newElement = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); //Create a circle in SVG's namespace
            newElement.setAttribute("cx", mwhsInfo[mwhs].cx);
            newElement.setAttribute("cy", mwhsInfo[mwhs].cy);
            newElement.setAttribute("r", mwhsInfo[mwhs].r);
            newElement.style.stroke = "red";
            newElement.style.fill = "transparent";
            newElement.style.strokeWidth = "1";

            anchor = document.createElementNS("http://www.w3.org/2000/svg", 'a');
            anchor.setAttributeNS('http://www.w3.org/1999/xlink', 'href', mwhsInfo[mwhs].href);
            anchor.setAttribute("id", mwhsInfo[mwhs].id);
            anchor.setAttribute("class", mwhsInfo[mwhs].class);
            anchor.setAttribute("name", mwhsInfo[mwhs].name);
            anchor.appendChild(newElement);
            svg.appendChild(anchor);
          }

          $('.svgmap map').append(svg);

          $('figure img').each(function () {
            $(this).siblings('figcaption').css('max-width', $(this).attr('width') + 'px');
          });
        }
      });
    }
  };
  Drupal.behaviors.a_clean_oceanFixedMenu = {
    attach: function (context, settings) {
      $(once('mainMenuStatic', '.l-navigation', context)).each(function () {

        // node-page--node-type-story-map
        if ($('.leaflet-map').length || $('.node-page--node-type-story-map').length) {
          $('#main').css('margin-top', '58px');
          $(wrap).addClass('fixed');
          $('.l-navigation__grid').addClass('fixed');
          $('.site-logo').addClass('fixed');

          setHover();

        } else {
          $(window).bind('scroll', function () {
            if ($(window).scrollTop() >= (eTop - 17 - toolTray)) {
              $('#main').css('margin-top', '58px');
              $(wrap).addClass('fixed');
              $('.l-navigation__grid').addClass('fixed');
              $('.site-logo').addClass('fixed');
            } else {
              $(wrap).removeClass('fixed');
              $('#main').css('margin-top', '0');
              $('.l-navigation__grid').removeClass('fixed');
              $('.site-logo').removeClass('fixed');
            }
            setHover();
          });
        }
      });

      $(once('overviewMenuStatic', '.overview-top__wrapper', context)).each(function () {
        let wrap2 = $('.overview-top__wrapper');
        let eTop2 = $(wrap2).offset().top;

        $(window).bind('scroll', function () {
          // console.log($(window).scrollTop() + 39);
          if (($(window).scrollTop() + 39) >= (eTop2 - 45 - toolTray)) {
            $(wrap2).addClass('fixed');
          }
          else {
            $(wrap2).removeClass('fixed');
          }
        });
      });

      $(once('addthisSide', '.social--addthis-side', context)).each(function () {
        var wrap3 = $('.social--addthis-side');
        var eTop3 = $(wrap3).offset().top;

        $(window).bind('scroll', function () {
          if (($(window).scrollTop() + 215) >= eTop3) {
            $(wrap3).addClass('fixed');
          }
          else {
            $(wrap3).removeClass('fixed');
          }
        });
      });
    }
  };

  Drupal.behaviors.a_clean_oceanScroll = {
    attach: function (context, settings) {
      $('.section_link a', context).on('click', function (e) {
        e.preventDefault();
        let dest = $(this).attr('href');

        let wrap2 = $('.overview-top__wrapper');

        let offset = 305 + 60 + 16;
        if ($(wrap).hasClass('fixed') && $(wrap2).hasClass('fixed')) {
          offset = 118 + 60 + 16;
        }
        else if ($(wrap).hasClass('fixed') && !$(wrap2).hasClass('fixed')) {
          offset = 210 + 60 + 16;
        }

        console.log(offset);

        $('html,body').animate({scrollTop: ($(dest).offset().top - offset)}, 1500);

        if ($('.responsive-menu-toggle-icon.overview_menu').css('display') == 'block') {
          $('.overview-top__wrapper ul').toggle(400);
        }

        return null;
      });
    }
  };

  Drupal.behaviors.a_clean_oceanSlideShow = {
    attach: function (context, settings) {
      $(once('a_clean_oceanSlideShow', '.open-popup-link', context)).each(function () {
        $('.open-popup-link').magnificPopup({
          type: 'inline',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 2], // Will preload 0 - before current, and 2 after
          },
          callbacks: {
            change: function () {
              let isLogged = $('body').hasClass('logged-in');
            },
            open: function () {
              let selectorID = this.content.selector;
              // checkSizeSlide(selectorID);
            },
            afterChange: function () {
              let selectorID = this.content.selector;
              // checkSizeSlide(selectorID);
            },
            resize: function () {
              let selectorID = this.content.selector;
              // checkSizeSlide(selectorID);
            },
          }
        });
      });
    }
  };


  let slide_pos = 0;
  let slide_len = 0;
  let slide_int;
  let restart;

  $(document).ready(function () {
    var $next = $('.next');
    var $prev = $('.prev');

    slide_len = $(".slideshow_item").length - 1;

    $(".slideshow_item:gt(0)").hide();

    slide_int = setInterval(function () {
      setAuto();
    }, 5000);

    $next.click(function () {
      if (slide_pos < slide_len) {
        clearInterval(slide_int);
        clearTimeout(restart);
        slide_pos++;
        changeIt(slide_pos);
        restart = setTimeout(function () {
          slide_int = setInterval(function () {
            setAuto();
          }, 5000);
        }, 500);
      }
      return false;
    })

    $prev.click(function () {
      if (slide_pos > 0) {
        clearInterval(slide_int);
        clearTimeout(restart);
        slide_pos--;
        changeIt(slide_pos);
        restart = setTimeout(function () {
          slide_int = setInterval(function () {
            setAuto();
          }, 5000);
        }, 500);
      }
      return false;
    });
  });


  Drupal.behaviors.a_clean_oceanSetMenuHover = {
    attach: function (context, settings) {
      if ($('.l-navigation .menu--main').length > 0) {
        $(once('setMenuHover', '.l-navigation .menu--main', context)).each(function () {
          setHover();
        });
      } else {
        $(once('setMenuHover', '.l-navigation .menu--main-menu-topic', context)).each(function () {
          setHover();
        });
      }
    }
  };

  function setHover() {
    let position = $('#main').position();

    if ($('.l-navigation .menu--main').length > 0) {
      let positionMenu = $('.l-navigation .menu--main .menu__item.has-subnav').position();
      setHoverTemp(position, positionMenu);
    } else if($('.l-navigation .menu--main-menu-topic').length > 0) {
      let positionMenu = $('.l-navigation .menu--main-menu-topic .menu__item.has-subnav').position();
      setHoverTemp(position, positionMenu);
    }
  }

  function setHoverTemp(position, positionMenu) {
    let top = (position.top - positionMenu.top);

    let addOffset = 2;
    let toolTray2 = 0;
    if ($('.l-constrain.l-navigation__grid').hasClass('fixed')) {
      addOffset = 19;
      toolTray2 = toolTray;
    }

    $('.l-navigation .menu__subnav').css('top', (top - addOffset - toolTray2) + 'px');

    if ($('.overview .overview-top__wrapper').hasClass('fixed')) {
      $('.l-navigation .menu__subnav').css('border', '1px solid white');
    }

    if (!$('.menu__item.has-subnav .link-hover').length) {
      $('.menu__item.has-subnav').prepend("<div class='link-hover'></div>");
    }

  }


  function setAuto() {
    slide_pos = (slide_pos == slide_len ? 0 : (slide_pos + 1));
    changeIt(slide_pos);
  }

  function changeIt() {
    $(".slideshow_item").fadeOut(1000);
    $(".slideshow_item:eq(" + slide_pos + ")").fadeIn(1000);
  }

})(jQuery, Drupal, once);