//used in directives.js > menuScrollTo

var scrol = (function(){

  var that ={

    scrolTo: function(id, marge) {

      // cf http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

      var i,
          startY = that.currentYPos(),
          stopY = that.YPos(id, marge),
          distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) { window.scrollTo(0, stopY); return; }

      var speed = Math.round(distance / 100);
      if (speed >= 20) speed = 20;
      var step = Math.round(distance / 25),
          leapY = stopY > startY ? startY + step : startY - step,
          timer = 0;
      if (stopY > startY) {
        for (i = startY; i < stopY; i += step) {
          setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
          leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
      }
      for (i = startY; i > stopY; i -= step) {
        setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
      }
    },

    /* currentYPos -
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
     currentYPos: function() {

      // IE8 sucks
      return pageYOffset||document.body.scrollTop || document.documentElement.scrollTop;
      // // Firefox, Chrome, Opera, Safari
      // if (window.pageYOffset) {
      //   return window.pageYOffset;
      // }
      // // Internet Explorer 6 - standards mode
      // if (document.documentElement && document.documentElement.scrollTop) {
      //   return document.documentElement.scrollTop;
      // }
      // // Internet Explorer 6, 7 and 8
      // if (document.body.scrollTop) {
      //   return document.body.scrollTop;
      // }
      // return 0;
    },

    /* scrollTo -
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
    YPos: function(id, marge) {
      var m= marge||0,
          el = document.getElementById(id),
          y = el.offsetTop,
          node = el;
      while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      }
      return y-m;
    }
  }//end that

return that;


})();
