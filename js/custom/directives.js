function getAppears(daddy,link){


 appear({
    init: function init(){ },

    elements: function elements(){ return daddy.getElementsByTagName('DIV'); },

    appear: function appear(el){
      el.className=el.className.replace(/ *invisible */gi,' visible ');
     },

    disappear: function disappear(el){ el.className=el.className.replace(/ *visible */gi,' invisible '); },

    // bounds: 50,
    reappear: true
  });

}

function switchActive(link){

  var list = document.querySelectorAll("a[menu-scroll-to]"),
  l= link||undefined,
  regEx = new RegExp(l,'ig');

  for(var i=0, lg=list.length; i<lg; i++){
    var attr = list[i].getAttribute('link');
    if(list[i].className.indexOf("active")>=0){
      // console.log(list[i].className);
      list[i].className = list[i].className.replace(' active','');
    }
    //Change on appears
    // && link.match(regEx)
    if(l !== undefined  ){
// console.log(regEx.test(list[i].getAttribute('link')));

      if(  regEx.test(list[i].getAttribute('link'))){
        list[i].className += ' active'; }


      }
  }


}


/*==========================================================================
                                  MENU
==========================================================================*/

app.directive('menu', function($rootScope){

  return {
    restrict:'E',
    templateUrl:'partials/menu-tpl.html',
    controller:function($rootScope,$scope){
      $rootScope.switchLg = function(lg){ $rootScope.lang=lg; }
      // not desktop
      $scope.showMenu = function($event){

        var ul = $event.currentTarget.children[0];

        if(ul.hasAttribute('style')){
          // console.log("style exists");
          ul.removeAttribute('style');
      }
      else{

        if($(ul).css('visibility')=='hidden'){ $(ul).css({'visibility':"visible","opacity": 1}); }
      }

    }//end showMenu

    },
  }
});

//scroll to anchor on MENU links//
app.directive('menuScrollTo', function($location){
  return function(scope,el,attr){
    if(attr.link){
      el.on('click', function() {

        // switchActive();
        // el[0].className += ' active';

          // // set the hash like a normal anchor scroll
          // // var anchor = $location.hash(attr.link);
          // // smooth scroll to the passed in element
          scrol.scrolTo(attr.link,75);
      });

    }

  } //end return function
});

/*==========================================================================
                                  ABOUT
==========================================================================*/
app.directive('about', function(){

  return {
    restrict:'A',
    controller:'aboutCtrl',
    templateUrl:'partials/about-tpl.html',
    link:function($scope,$el,$attr){ getAppears($el[0],'about');}
  }

});
//SOUND//
app.filter('secure', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);
app.directive('sound', function(){
  return {
    restrict:'E',
    controller:('soundCtrl', ['$scope', function($scope){}]),
    templateUrl:'partials/sound-tpl.html',
    link:function(scope, el, attr){


      var link = el[0].children[0].children[0],
          player = el[0].children[1],
          sounds = el[0].parentElement.children;


    link.addEventListener('click', function(e){

      var wasPlaying;
      player.paused? wasPlaying=false : wasPlaying=true ;
      console.log(wasPlaying);

      for( var i=0, lg = sounds.length ; i < lg; i++ ){

        //remove active class
        var a = sounds[i].children[0].children[0].className;
        sounds[i].children[0].children[0].className = a.replace(/ active/gi,'');
        var audio = sounds[i].children[1];
        audio.pause();
        audio.currentTime = 0;
       }

       if(!wasPlaying){
link.className +=" active";
         player.play();
        }



    });
    }
  }

});

/*==========================================================================
                                  WORK
==========================================================================*/

app.directive('work', function(){

  return {
    restrict:'A',
    controller:'workCtrl',
    templateUrl:'partials/work-tpl.html'
  }
});

//WHEN ALL WORK ITEMS ARE IN DOM//
app.directive('workLoop', function(){

  return function($scope, $el, $attr){
    //set size when img is not loaded

    angular.element(document).ready(function(){

      var divW = $el[0].clientWidth;
      angular.element($el[0]).css("height",(divW.clientWidth/1.44)+"px");
    });



    //TODO REMOVE JQUERY
    $($el).on({
      "mouseenter":function(e){   $(this).find(".box-desc").toggleClass('invisible','visible');  },
      "mouseleave":function(e){  $(this).find(".box-desc").toggleClass('invisible','visible'); }
    });
if($scope.$last){ getAppears($el[0].parentNode, 'work');

}

 }// end return function


});

/*==========================================================================
                                  TECHNO
==========================================================================*/
app.directive('techno', function(){

  return {
    restrict:'A',
    controller:('technoCtrl', ['$scope','$rootScope', function($scope,$rootScope){
      $scope.page=$rootScope.content.pages.techno;
      $scope.isOpen = 0;
    }]),
    templateUrl:'partials/techno-tpl.html',
    link: function(scope, el, attr){}

}
});

app.directive('technoLoop', function(){

  return function($scope, $el, $attr){

    if($scope.$last){

      // appear({
      //   init: function init(){ },
      //
      //   elements: function elements(){ return $el[0].parentNode.getElementsByTagName('DIV'); },
      //
      //   appear: function appear(el){ el.className=el.className.replace(/invisible /gi,'visible '); },
      //
      //   disappear: function disappear(el){ el.className=el.className.replace(/visible /gi,'invisible '); },
      //
      //   bounds: 200,
      //   reappear: true
      // });
      getAppears($el[0].parentNode);

    }//end if $last
    };
}); // end of technoLoop

/*==========================================================================
                                  TASTE
==========================================================================*/
app.directive('taste', function(){

  return {
    restrict:'A',
    controller:('tasteCtrl', ['$scope','$rootScope','$sce', function($scope,$rootScope,$sce){

    $scope.page=$rootScope.content.pages.taste;
    var tastes = $rootScope.content.pages.taste.body,
    tabTastes = [],
    isOpen=false;
  //  loop in each type +  add a prop type  + push in array
  for(var a in tastes){
    if(tastes[a] instanceof Array){
        tastes[a].forEach(function(el) {
          if (el instanceof Object){el.type=a}

          tabTastes.push(el);
      });    }
  }//end loop
  //shuffle in utilities.js
$scope.tastes = shuffle(tabTastes);


    var bodyTaste = document.getElementsByClassName('wrapper-taste');
    // var spanTaste = document.getElementsByClassName('taste');
    $scope.showTaste = function($event, index){
    	// console.log( $event.currentTarget);
      //TODO ESCAPE JQUERY
      $("span.taste").toggleClass("active");
      // angular.element(spanTaste[0]).toggleClass("active");
    	if(!bodyTaste[index].classList.contains('hidden')){

    		for(var i=0, lg=bodyTaste.length; i<lg; i++){ bodyTaste[i].classList.toggle('hidden'); }

    	}
    };
    //to allow custom attribute in a
    $scope.to_trusted = function(html_code) {
    return $sce.trustAsHtml(html_code);}
    //close popup universal function
    $scope.closePopup = function(popup){ angular.element(popup).toggleClass("hidden shown"); }

    angular.element(document).ready(function(){

      var l = document.getElementsByClassName('open-popup'),
          youtubePopup = document.getElementById('youtube-popup');

      for(var i=0, lg=l.length; i<lg;i++){


        l[i].addEventListener('click', function(e){
          e.preventDefault();

          var divBox = e.target.parentElement,
              dim = divBox.getBoundingClientRect(),
              centerX = "";



          youtubePopup.children[1].setAttribute('src',e.target.getAttribute('data-link') );

          youtubePopup.className = 'shown';
          if(!isOpen){
            centerX = (dim.left+divBox.scrollWidth*0.5)-(youtubePopup.clientWidth*0.5);
            youtubePopup.style.top = (dim.top+youtubePopup.clientHeight+20)+"px";
            youtubePopup.style.left = (centerX)+"px";
            isOpen=!isOpen;

          }



        });
          }//end for

          //drag & drop
          youtubePopup.addEventListener('dragstart',dragStart,false);
          document.body.addEventListener('dragover',dragOver,false);
          document.body.addEventListener('drop',drop,false);

          //close-btn
          youtubePopup.children[0].addEventListener('click', function(e){
            isOpen=false;
              youtubePopup.children[1].setAttribute('src','' );
            $scope.closePopup(youtubePopup);},false);



    });//end ready

  }

]),
  templateUrl:'partials/taste-tpl.html',

}

});//end taste directive
app.directive('tasteLoop', function($timeout ){
return function($scope, $el, $attr){
var figure = $el[0].firstElementChild;
//to avoid awful bug the first time we load
angular.element(figure).css("height",figure.clientWidth+"px");

  if($scope.$last){

      $scope.$watch('$viewContentLoaded',function(){
      angular.element(document).ready(function(){



      var mason = new Masonry( $el[0].parentNode, {
        // options
        itemSelector: '.box-body',
        gutter: 20,
        percentPosition: true

      });


      //APPEAR
      getAppears($el[0].parentNode);

      $scope.initScroll();

        });

    });

    //menu


    //MASONERY
    $timeout(function(){


},3000);//end $timeout




}//end if $last
}

});//end tasteLoop


/*==========================================================================
                                  CONTACT
==========================================================================*/

app.directive('contact', function(){

  return {
    restrict:'A',
    controller:'contactCtrl',
    templateUrl:'partials/contact-tpl.html'
  }


});

//MAILER CONTACT//

app.directive('contactForm', function(){

  return function($scope, $el, $attr){
var c = $el.children(),
    tempTab = [],
    firstInput = angular.element($el.find('input')[0]),
    submit = angular.element( $el.find('button')[0]);
// console.dir(c);
// var children =   Object.keys(c).map(function(el, index){ return el[0]; });
for(el in c){

  if(c[el] instanceof HTMLElement){ if(c[el].hasAttribute('required')){tempTab.push(c[el]); }
  }

}//end for

    // firstInput.on('focus',function(){
    //   $scope.autocomplete(tempTab)
    // });


    submit.on('click', function(){

      if(!$scope.mailer.$invalid){ $scope.sendMail(); };

      })

  }

});
