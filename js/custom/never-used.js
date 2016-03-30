// equal height for box-desc
app.directive('equalHeight', function($timeout){

return {

  link:function(scope, el, attr){


    //     angular.element(document).ready(function(){
    //
    //       var tastes = el[0].parentNode.childNodes;
    //       var h =0;
    //       for(var i=0, lg=tastes.length; i<lg; i++ ){
    //
    //         if(tastes[i].tagName==="DIV" && (tastes[i].id==="love" || tastes[i].id==="hate")  ){
    //
    //           var boxBody = tastes[i].childNodes,
    //               h =0,
    //               tabBox= [];
    //
    //           for(var j=0, lg=boxBody.length; j<lg; j++ ){
    //
    //             if( boxBody[j].className && boxBody[j].className.indexOf("box-body")>=0 ){
    //               tabBox.push(boxBody[j]);
    //                 // console.log( "clientHeight : " + boxBody[j].clientHeight + " h : "+ h );
    //                 if(h<boxBody[j].clientHeight){ h=boxBody[j].clientHeight; }
    //             }
    //
    //           }//end for
    //
    //           tabBox.forEach(function(el){ el.style.height=h+"px";} );
    //           if(  tastes[i].id==="hate"){ tastes[i].className += " hidden"; };
    //
    //
    //       }//end if
    //       }//endfor
    //
    //
    // });//end ready
  }//end function


}//end return

});
