/**
* Theme: Zircos Admin Template
* Author: Coderthemes
* Module/App: Main Js
*/
var resizefunc = [];


$(document).on('click', "#sidebar-menu .parent-menu", function () {
    if (!$("#wrapper").hasClass("enlarged")) {
        if (!$(this).hasClass("subdrop")) {
            console.log('11');

            $("ul", $(this).parents("ul:first")).slideUp(350);
            $("a", $(this).parents("ul:first")).removeClass("subdrop");
            $("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

            // open our new menu and add the open class
            $(this).next("ul").slideDown(350);
            $(this).addClass("subdrop");
            $(".pull-right i", $(this).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
            $(".pull-right i", $(this).siblings("ul")).removeClass("md-remove").addClass("md-add");
        } else if ($(this).hasClass("subdrop")) {
            console.log('22');

            $(this).removeClass("subdrop");
            $(this).next("ul").slideUp(350);
            $(".pull-right i", $(this).parent()).removeClass("md-remove").addClass("md-add");
        }
    }
});
// $(document).on('click', ".open-left", function () {
//   $("#wrapper").toggleClass("enlarged");
//   $("#wrapper").addClass("forced");
//   // Time Picker

//   if ($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
//     $("body").removeClass("fixed-left").addClass("fixed-left-void");
//   } else if (!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
//     $("body").removeClass("fixed-left-void").addClass("fixed-left");
//   }

//   if ($("#wrapper").hasClass("enlarged")) {
//     $(".left ul").removeAttr("style");
//   } else {
//     $(".subdrop").siblings("ul:first").show();
//   }

//   toggle_slimscroll(".slimscrollleft");
//   $("body").trigger("resize");
// });

// !function ($) {
//   "use strict";

//   var Sidemenu = function () {
//     this.$body = $("body"),
//       this.$openLeftBtn = $(".open-left"),
//       this.$menuItem = $("#sidebar-menu a")
//   };



//   //menu item click


// }(window.jQuery),


//   function ($) {
//     "use strict";

//     var FullScreen = function () {
//       this.$body = $("body"),
//         this.$fullscreenBtn = $("#btn-fullscreen")
//     };

//     //turn on full screen
//     // Thanks to http://davidwalsh.name/fullscreen
//     FullScreen.prototype.launchFullscreen = function (element) {
//       if (element.requestFullscreen) {
//         element.requestFullscreen();
//       } else if (element.mozRequestFullScreen) {
//         element.mozRequestFullScreen();
//       } else if (element.webkitRequestFullscreen) {
//         element.webkitRequestFullscreen();
//       } else if (element.msRequestFullscreen) {
//         element.msRequestFullscreen();
//       }
//     },
//       FullScreen.prototype.exitFullscreen = function () {
//         if (document.exitFullscreen) {
//           document.exitFullscreen();
//         } else if (document.mozCancelFullScreen) {
//           document.mozCancelFullScreen();
//         } else if (document.webkitExitFullscreen) {
//           document.webkitExitFullscreen();
//         }
//       },
//       //toggle screen
//       FullScreen.prototype.toggle_fullscreen = function () {
//         var $this = this;
//         var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
//         if (fullscreenEnabled) {
//           if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
//             $this.launchFullscreen(document.documentElement);
//           } else {
//             $this.exitFullscreen();
//           }
//         }
//       },
//       //init sidemenu
//       FullScreen.prototype.init = function () {
//         var $this = this;
//         //bind
//         $this.$fullscreenBtn.on('click', function () {
//           $this.toggle_fullscreen();
//         });
//       },
//       //init FullScreen
//       $.FullScreen = new FullScreen, $.FullScreen.Constructor = FullScreen

//   }(window.jQuery),



//   //main app module
//   function ($) {
//     "use strict";

//     var App = function () {
//       this.VERSION = "1.0.0",
//         this.AUTHOR = "Coderthemes",
//         this.SUPPORT = "coderthemes@gmail.com",
//         this.pageScrollElement = "html, body",
//         this.$body = $("body")
//     };

//     //on doc load
//     App.prototype.onDocReady = function (e) {
//       FastClick.attach(document.body);
//       resizefunc.push("initscrolls");
//       resizefunc.push("changeptype");

//       $('.animate-number').each(function () {
//         $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-duration")));
//       });

//       //RUN RESIZE ITEMS
//       $(window).resize(debounce(resizeitems, 100));
//       $("body").trigger("resize");

//       // right side-bar toggle
//       $('.right-bar-toggle').on('click', function (e) {

//         $('#wrapper').toggleClass('right-bar-enabled');
//       });


//     },
//       //initilizing
//       App.prototype.init = function () {
//         var $this = this;
//         //document load initialization
//         $(document).ready($this.onDocReady);

//         //init fullscreen
//         $.FullScreen.init();
//       },

//       $.App = new App, $.App.Constructor = App

//   }(window.jQuery),

//   //initializing main application module
//   function ($) {
//     "use strict";
//     $.App.init();
//   }(window.jQuery);



// /* ------------ some utility functions ----------------------- */
// //this full screen
// var toggle_fullscreen = function () {

// }

// function executeFunctionByName(functionName, context /*, args */) {
//   var args = [].slice.call(arguments).splice(2);
//   var namespaces = functionName.split(".");
//   var func = namespaces.pop();
//   for (var i = 0; i < namespaces.length; i++) {
//     context = context[namespaces[i]];
//   }
//   return context[func].apply(this, args);
// }
// var w, h, dw, dh;
// var changeptype = function () {
//   w = $(window).width();
//   h = $(window).height();
//   dw = $(document).width();
//   dh = $(document).height();

//   if (jQuery.browser.mobile === true) {
//     $("body").addClass("mobile").removeClass("fixed-left");
//   }

//   if (!$("#wrapper").hasClass("forced")) {
//     if (w > 1024) {
//       $("body").removeClass("smallscreen").addClass("widescreen");
//       $("#wrapper").removeClass("enlarged");
//     } else {
//       $("body").removeClass("widescreen").addClass("smallscreen");
//       $("#wrapper").addClass("enlarged");
//       $(".left ul").removeAttr("style");
//     }
//     if ($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
//       $("body").removeClass("fixed-left").addClass("fixed-left-void");
//     } else if (!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
//       $("body").removeClass("fixed-left-void").addClass("fixed-left");
//     }

//   }
//   toggle_slimscroll(".slimscrollleft");
// }


// var debounce = function (func, wait, immediate) {
//   var timeout, result;
//   return function () {
//     var context = this, args = arguments;
//     var later = function () {
//       timeout = null;
//       if (!immediate) result = func.apply(context, args);
//     };
//     var callNow = immediate && !timeout;
//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//     if (callNow) result = func.apply(context, args);
//     return result;
//   };
// }

// function resizeitems() {
//   if ($.isArray(resizefunc)) {
//     for (i = 0; i < resizefunc.length; i++) {
//       window[resizefunc[i]]();
//     }
//   }
// }

// function initscrolls() {
//   if (jQuery.browser.mobile !== true) {
//     //SLIM SCROLL
//     $('.slimscroller').slimscroll({
//       height: 'auto',
//       size: "5px"
//     });

//     $('.slimscrollleft').slimScroll({
//       height: 'auto',
//       position: 'right',
//       size: "5px",
//       color: '#dcdcdc',
//       wheelStep: 5
//     });
//   }
// }
// function toggle_slimscroll(item) {
//   if ($("#wrapper").hasClass("enlarged")) {
//     $(item).css("overflow", "inherit").parent().css("overflow", "inherit");
//     $(item).siblings(".slimScrollBar").css("visibility", "hidden");
//   } else {
//     $(item).css("overflow", "hidden").parent().css("overflow", "hidden");
//     $(item).siblings(".slimScrollBar").css("visibility", "visible");
//   }
// }


// $(document).ready(function () {
//   $("#sidebar-menu a").each(function () {
//     if (this.href == window.location.href) {
//       $(this).addClass("active");
//       $(this).parent().addClass("active"); // add active to li of the current link
//       $(this).parent().parent().prev().addClass("active"); // add active class to an anchor
//       $(this).parent().parent().prev().click(); // click the item to make it drop
//     }
//   });
// });