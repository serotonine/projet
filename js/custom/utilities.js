var utils={

  'getLang' : function(){

    var fr =/^[ *fr]\w/,
        nl = /^[ *nl]\w/,
        currentLang = navigator.language || navigator.userLanguage;
        if(fr.test(currentLang)){ return 'fr'; }
        else if (nl.test(currentLang)) { return 'nl'; }
        else{ return 'en'; }
  }
}





//used in directive.js > taste
function shuffle(array) {
  var currIdx = array.length, temp, randomIdx;

  // While there remain elements to shuffle...
  while (0 !== currIdx) {

    // Pick a remaining element...
    randomIdx = Math.floor(Math.random() * currIdx);
    currIdx -= 1;

    // And swap it with the current element.
    temp = array[currIdx];
    array[currIdx] = array[randomIdx];
    array[randomIdx] = temp;
  }

  return array;
}

//not used to standardize
//toDo case several class
//toDo case not HtmlList
function toggleVisibility(htmllist,a,b){

  for(var i=0, lg=htmllist.length; i<lg;i++){
    htmllist[i].className=htmllist[i].className.replace(a,b);
  };
}

//to get Yposition page whatever the browser


function currentYPos(){
  return pageYOffset||document.body.scrollTop || document.documentElement.scrollTop;
 }
