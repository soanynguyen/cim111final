/* ===========================================================
 * jquery-tiltedpage-scroll.js v1.2.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create a beautiful 3D tilted effect on scroll
 * with Tilted Page Scroll plugin
 *
 * https://github.com/peachananr/tiltedpage-scroll
 * 
 * License: GPL v3
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    sectionContainer: "> section",
    angle: 50,
    opacity: true,
    scale: true,
    outAnimation: true
  };
  
  $(document).ready(function(){
    $(".main").tiltedpage_scroll({
      angle: 20
    });
  });
  

  (function(){
    var bsa = document.createElement('script');
       bsa.type = 'text/javascript';
       bsa.async = true;
       bsa.src = '//s3.buysellads.com/ac/bsa.js';
    (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(bsa);
  })();

var _gaq=[['_setAccount','UA-11278966-1'],['_trackPageview']]; // Change UA-XXXXX-X to be your site's ID
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s)}(document,'script'));


  $.fn.tiltedpage_scroll = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this);
        
    el.find(settings.sectionContainer).addClass("tps-section");
    
    el.find('.tps-section').each(function(){
      var el2 = $(this); 
      el2.wrapInner("<div class='tps-wrapper'></div>");
    });
    
    function isElementInViewport (el3) {
      var docViewTop = $(window).scrollTop(),
          docViewBottom = docViewTop + $(window).height(),
          elemTop = el3.offset().top,
          elemBottom = elemTop + el3.outerHeight(true);
          
      return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) );
    }
  
    function elementVisibilityMayChange (el4) {
      
      if ( isElementInViewport(el4) ) {
        el4.addClass("tps-inview")
      } else {
        el4.removeClass("tps-inview")
      }
    }
    
   
  
    $(window).on('DOMContentLoaded load resize scroll', function() {
      el.find(settings.sectionContainer).each(function(){
        elementVisibilityMayChange($(this));
      });

      
      el.find('.tps-section.tps-inview > .tps-wrapper').each(function(index){
        var el2 = $(this),
            opacity = 0,
            st = $(window).scrollTop(),
            deg = ((el2.parent().offset().top - el2.parent().height()) - st) / $(window).height() * (settings.angle * 3),
            scale = ((st + $(window).height() - (el2.parent().offset().top - el2.parent().height())) / ($(window).height() )) ;
            if(scale > 1) scale = 1;
            if(deg < 0) deg = 0;
            
        if(st > el2.parent().offset().top) {

          if (settings.outAnimation == false) {
            opacity = 1;
            if(opacity < 0) opacity = 0;
            if (deg < 0) deg = 0;
          } else {
            opacity = ((el2.parent().offset().top + ($(window).height() * 1.2) - st)) / ($(window).height()); 
            opacity = Math.pow(opacity,25);
            deg = (el2.parent().offset().top - st) / $(window).height() * (settings.angle * 3);
            scale = ((st + $(window).height() - el2.parent().offset().top ) / ($(window).height() )) ;
          }
          
          
        } else {
          if(index != 0) {
            var opacity = ((st + $(window).height() - el2.parent().offset().top + (el2.height()/2))/ $(window).height());

            if(opacity > 1) { opacity = 1; }
        
          } else {
            opacity = 1;
            deg = 0;
            scale = 1;
          }
        }
        
        if (settings.scale == false) scale = 1;
        if (settings.angle == false) deg = 0;
        if (settings.opacity == false) opacity = 1;
        
        el2.css({
          'transform': 'rotateX(' + deg + 'deg) scale('+scale+', '+scale+')',
          opacity: opacity
        });
      });
    }); 

  }

  $(window).load(function(){
      $("#sticky").sticky({ topSpacing: 0 });
    });

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var slice = Array.prototype.slice; // save ref to original slice()
    var splice = Array.prototype.splice; // save ref to original slice()

  var defaults = {
      topSpacing: 0,
      bottomSpacing: 0,
      className: 'is-sticky',
      wrapperClassName: 'sticky-wrapper',
      center: false,
      getWidthFrom: '',
      widthFromWrapper: true, // works only when .getWidthFrom is empty
      responsiveWidth: false,
      zIndex: 'inherit'
    },
    $window = $(window),
    $document = $(document),
    sticked = [],
    windowHeight = $window.height(),
    scroller = function() {
      var scrollTop = $window.scrollTop(),
        documentHeight = $document.height(),
        dwh = documentHeight - windowHeight,
        extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i],
          elementTop = s.stickyWrapper.offset().top,
          etse = elementTop - s.topSpacing - extra;

        //update height in case of dynamic content
        s.stickyWrapper.css('height', s.stickyElement.outerHeight());

        if (scrollTop <= etse) {
          if (s.currentTop !== null) {
            s.stickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'z-index': ''
              });
            s.stickyElement.parent().removeClass(s.className);
            s.stickyElement.trigger('sticky-end', [s]);
            s.currentTop = null;
          }
        }
        else {
          var newTop = documentHeight - s.stickyElement.outerHeight()
            - s.topSpacing - s.bottomSpacing - scrollTop - extra;
          if (newTop < 0) {
            newTop = newTop + s.topSpacing;
          } else {
            newTop = s.topSpacing;
          }
          if (s.currentTop !== newTop) {
            var newWidth;
            if (s.getWidthFrom) {
                padding =  s.stickyElement.innerWidth() - s.stickyElement.width();
                newWidth = $(s.getWidthFrom).width() - padding || null;
            } else if (s.widthFromWrapper) {
                newWidth = s.stickyWrapper.width();
            }
            if (newWidth == null) {
                newWidth = s.stickyElement.width();
            }
            s.stickyElement
              .css('width', newWidth)
              .css('position', 'fixed')
              .css('top', newTop)
              .css('z-index', s.zIndex);

            s.stickyElement.parent().addClass(s.className);

            if (s.currentTop === null) {
              s.stickyElement.trigger('sticky-start', [s]);
            } else {
              // sticky is started but it have to be repositioned
              s.stickyElement.trigger('sticky-update', [s]);
            }

            if (s.currentTop === s.topSpacing && s.currentTop > newTop || s.currentTop === null && newTop < s.topSpacing) {
              // just reached bottom || just started to stick but bottom is already reached
              s.stickyElement.trigger('sticky-bottom-reached', [s]);
            } else if(s.currentTop !== null && newTop === s.topSpacing && s.currentTop < newTop) {
              // sticky is started && sticked at topSpacing && overflowing from top just finished
              s.stickyElement.trigger('sticky-bottom-unreached', [s]);
            }

            s.currentTop = newTop;
          }

          // Check if sticky has reached end of container and stop sticking
          var stickyWrapperContainer = s.stickyWrapper.parent();
          var unstick = (s.stickyElement.offset().top + s.stickyElement.outerHeight() >= stickyWrapperContainer.offset().top + stickyWrapperContainer.outerHeight()) && (s.stickyElement.offset().top <= s.topSpacing);

          if( unstick ) {
            s.stickyElement
              .css('position', 'absolute')
              .css('top', '')
              .css('bottom', 0)
              .css('z-index', '');
          } else {
            s.stickyElement
              .css('position', 'fixed')
              .css('top', newTop)
              .css('bottom', '')
              .css('z-index', s.zIndex);
          }
        }
      }
    },
    resizer = function() {
      windowHeight = $window.height();

      for (var i = 0, l = sticked.length; i < l; i++) {
        var s = sticked[i];
        var newWidth = null;
        if (s.getWidthFrom) {
            if (s.responsiveWidth) {
                newWidth = $(s.getWidthFrom).width();
            }
        } else if(s.widthFromWrapper) {
            newWidth = s.stickyWrapper.width();
        }
        if (newWidth != null) {
            s.stickyElement.css('width', newWidth);
        }
      }
    },
    methods = {
      init: function(options) {
        return this.each(function() {
          var o = $.extend({}, defaults, options);
          var stickyElement = $(this);

          var stickyId = stickyElement.attr('id');
          var wrapperId = stickyId ? stickyId + '-' + defaults.wrapperClassName : defaults.wrapperClassName;
          var wrapper = $('<div></div>')
            .attr('id', wrapperId)
            .addClass(o.wrapperClassName);

          stickyElement.wrapAll(function() {
            if ($(this).parent("#" + wrapperId).length == 0) {
                    return wrapper;
            }
});

          var stickyWrapper = stickyElement.parent();

          if (o.center) {
            stickyWrapper.css({width:stickyElement.outerWidth(),marginLeft:"auto",marginRight:"auto"});
          }

          if (stickyElement.css("float") === "right") {
            stickyElement.css({"float":"none"}).parent().css({"float":"right"});
          }

          o.stickyElement = stickyElement;
          o.stickyWrapper = stickyWrapper;
          o.currentTop    = null;

          sticked.push(o);

          methods.setWrapperHeight(this);
          methods.setupChangeListeners(this);
        });
      },

      setWrapperHeight: function(stickyElement) {
        var element = $(stickyElement);
        var stickyWrapper = element.parent();
        if (stickyWrapper) {
          stickyWrapper.css('height', element.outerHeight());
        }
      },

      setupChangeListeners: function(stickyElement) {
        if (window.MutationObserver) {
          var mutationObserver = new window.MutationObserver(function(mutations) {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
              methods.setWrapperHeight(stickyElement);
            }
          });
          mutationObserver.observe(stickyElement, {subtree: true, childList: true});
        } else {
          if (window.addEventListener) {
            stickyElement.addEventListener('DOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
            stickyElement.addEventListener('DOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            }, false);
          } else if (window.attachEvent) {
            stickyElement.attachEvent('onDOMNodeInserted', function() {
              methods.setWrapperHeight(stickyElement);
            });
            stickyElement.attachEvent('onDOMNodeRemoved', function() {
              methods.setWrapperHeight(stickyElement);
            });
          }
        }
      },
      update: scroller,
      unstick: function(options) {
        return this.each(function() {
          var that = this;
          var unstickyElement = $(that);

          var removeIdx = -1;
          var i = sticked.length;
          while (i-- > 0) {
            if (sticked[i].stickyElement.get(0) === that) {
                splice.call(sticked,i,1);
                removeIdx = i;
            }
          }
          if(removeIdx !== -1) {
            unstickyElement.unwrap();
            unstickyElement
              .css({
                'width': '',
                'position': '',
                'top': '',
                'float': '',
                'z-index': ''
              })
            ;
          }
        });
      }
    };

  // should be more efficient than using $window.scroll(scroller) and $window.resize(resizer):
  if (window.addEventListener) {
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', resizer, false);
  } else if (window.attachEvent) {
    window.attachEvent('onscroll', scroller);
    window.attachEvent('onresize', resizer);
  }

  $.fn.sticky = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };

  $.fn.unstick = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method ) {
      return methods.unstick.apply( this, arguments );
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.sticky');
    }
  };
  $(function() {
    setTimeout(scroller, 0);
  });
}));

  
}(window.jQuery);
