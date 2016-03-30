"use strict";

var nb_init = {
    a:600,
    b:0,
    c:600,
    d:0,
    e:600,
    f:0,

  };
  var nb = nb_init;

function getScrollTop(){
  // IE8 sucks
  return pageYOffset||document.body.scrollTop || document.documentElement.scrollTop;
}

$(document).ready(function(){


  var articles = document.getElementById("wrapper-pages").childNodes;
  var tabArticles=[];


  for(var i=0,lg=articles.length; i<lg; i++){

    if(articles[i].nodeType==1){
      var article = {
        "node":"#"+articles[i].id,
        "offset":articles[i].offsetTop
      };
      tabArticles.push(article);
      }
  };



  var scrollTop = $(window).scrollTop(),
      scrollNow=[];


$(window).on('scroll',function(){

  //Scroll up
  if(scrollTop>$(this).scrollTop()) {

    if(getScrollTop()<=tabArticles[1].offset && getScrollTop()>=tabArticles[0].offset){

      nb.a=nb.a+20; nb.b=nb.b+10;
      $(tabArticles[0].node).css("background-position", "0 "+nb.b+"px");
      $(".bk-fg-01").css("background-position", "0 "+nb.a+"%");
    }
    if(getScrollTop()<=tabArticles[2].offset && getScrollTop()>=tabArticles[1].offset){
      //  console.log(tabArticles[1].node);
    }
    if(getScrollTop()<=tabArticles[3].offset && getScrollTop()>=tabArticles[2].offset){
      nb.c=nb.c+35; nb.d=nb.d+10;
      $(tabArticles[2].node).css("background-position", "0 "+nb.c+"px");
    }
    if(getScrollTop()<=tabArticles[4].offset && getScrollTop()>=tabArticles[3].offset){
      //  console.log(tabArticles[3].node);
    }
    if(getScrollTop()>=tabArticles[4].offset){
      //  console.log(tabArticles[4].node);
    }

  }
  //scroll down
  else{

    if(getScrollTop()<=tabArticles[1].offset && getScrollTop()>=tabArticles[0].offset){
      nb.a=nb.a-35; nb.b=nb.b-10;
      // $(‘.img_1′).css(‘backgroundPosition’, ‘50% ‘+a+’px’);
      $(tabArticles[0].node).css("background-position", "0 "+nb.b+"px");
      $(".bk-fg-01").css("background-position", "0 "+nb.a+"%");

    }
    if(getScrollTop()<=tabArticles[2].offset && getScrollTop()>=tabArticles[1].offset){
      //  console.log(tabArticles[1].node);
    }
    if(getScrollTop()<=tabArticles[3].offset && getScrollTop()>=tabArticles[2].offset){
      nb.c=nb.c-35; nb.d=nb.d-10;
      $(tabArticles[2].node).css("background-position", "0 "+nb.c+"px");
      // $("#box-techno > div.bg-fg-02").css("background-position", "0 "+nb.a+"%");
    }
    if(getScrollTop()<=tabArticles[4].offset && getScrollTop()>=tabArticles[3].offset){
      //  console.log(tabArticles[3].node);
    }
    if(getScrollTop()>=tabArticles[4].offset){
      //  console.log(tabArticles[4].node);
    }

  }


  if (getScrollTop()==0){
    console.log("top of page");
  			nb = nb_init;
  			$('#wrapper-pages').find("*").removeAttr("style");

  		}
  	  scrollTop = $(this).scrollTop();




}); // end on scroll

}); // end document ready


// if (getScrollTop()==0)// Adjusts the positions values and resets them to zero during a scroll up event
// {
// a=parseFloat(400);
// b=parseFloat(0);
// c=parseFloat(400);
// d=parseFloat(0);
// $(‘.bk_0′).css(‘backgroundPosition’, ‘0 0′);
// $(‘.bk_1′).css(‘backgroundPosition’, ‘0 0′);
// $(‘.img_2′).css(‘backgroundPosition’, ‘50% ‘+400+’px’);
// $(‘.img_1′).css(‘backgroundPosition’, ‘50% ‘+400+’px’);
// }
// scrollTop = $(this).scrollTop();
// });
// });
