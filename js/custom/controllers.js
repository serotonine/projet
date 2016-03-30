app.controller('mainCtrl', ['$scope','$rootScope','$location','$document','$window','$interval','contentFactory','utilsFactory', function($scope,$rootScope,$location,$document,$window,$interval,contentFactory,utilsFactory){

// $rootScope.lang="fr";
$rootScope.lang= utils.getLang();
// console.log($rootScope.lang);
$scope.date = Date.now();
$scope.compil = {};





//LANGUAGE
	$rootScope.$watch('lang',function(lg){
		$scope.compil = {};
		window.removeEventListener("scroll", onScroll);
		$rootScope.content=null;
		$location.path('/');
		contentFactory.get($rootScope.lang).then(
			function(data){
				$rootScope.content = data;
		});

		});

//CONTACT FORM
		$scope.showContact = function(e){
			var boxContact = document.getElementById("box-contact");
			angular.element(boxContact).toggleClass("invisible visible");
			angular.element(document.getElementById("contact")).toggleClass('active');

		}
//SCROLL
 function onScroll(){
// console.log('onScroll');
	var posY = currentYPos()+80, currentId='';
	// console.log('posY :\n' + posY );

		for(var el in $scope.compil){

			if($scope.compil[el].top<posY && posY< ($scope.compil[el].top+$scope.compil[el].height)){

			if(currentId!==el){


				switchActive(el);
				currentId=el;

			}
			}

		}

}//END onScroll

$scope.initScroll = function(){


					//on va calculer le top en fonction de la hauteur et non pas du top qui peut changer en fonction de la position des elements au reload.
					var wp = document.querySelectorAll('.wrapper-pages');


					var wrapperPagesStyle = window.getComputedStyle(wp[0]),
							initTop = parseInt(wrapperPagesStyle.getPropertyValue('padding-top')),
							currentTop = initTop, currentHeight="",
							articles = document.querySelectorAll("article[id^='box']"), id;
							//loop in htmlCollection
							for(var i=0, lg=articles.length; i<lg; i++){

								id = articles[i].getAttribute('id');
								if(id!=='box-contact'){
									// currentHeight = articles[i].getBoundingClientRect().height;
									currentHeight = articles[i].offsetHeight;


										$scope.compil[id]={

										'top':currentTop,
										'height':currentHeight
								 }
								 currentTop += currentHeight;
								}
							}//end for


						window.addEventListener("scroll", onScroll);

			// }
			// else{ $scope.initScroll(); }

		}// end initScroll






}]);//end mainCtrl




app.controller('aboutCtrl', ['$scope','$rootScope','$sce', function($scope,$rootScope,$sce){

$scope.page=$rootScope.content.pages.about;


}]);
//
app.controller('workCtrl', ['$scope','$rootScope', function($scope,$rootScope){

$scope.page=$rootScope.content.pages.work;
$scope.bodylg=$scope.page.body.length;
}]);


app.controller('contactCtrl', ['$scope','$rootScope','$http','$timeout','$window','utilsFactory', function($scope,$rootScope,$http,$timeout,$window,utilsFactory){

$scope.page=$rootScope.content.pages.contact;

// on focus
$scope.autocomplete= function(formEl){

	if(utilsFactory.LocalStorageUI.getData('mailer')){
		var mailer = utilsFactory.LocalStorageUI.getData('mailer');

		formEl.forEach(function(el,index){

			el.value = mailer[el.name];
			$scope.mailer[el.name].$setValidity();
			});
	}

}

//on submit.mailer
$scope.sendMail = function(){


	//on balance les datas dans le local storage pour éviter de recommencer
	var dataMail = {
		'nam': $scope.mailer.nam.$viewValue,
		'mail': $scope.mailer.mail.$viewValue,
		'subject': $scope.mailer.subject.$viewValue,
		'mess': $scope.mailer.mess.$viewValue
		}

		// console.log(dataMail);
//localStorage
// if(!utilsFactory.LocalStorageUI.getData('mailer')){ utilsFactory.LocalStorageUI.setData('mailer',dataMail); }
// console.log(dataMail);
//On part du postulat que tout leschamps sont remplis (vérif anterieure)
// Simple POST request example (passing data) :
$http({
				url: "mailer.php",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param(dataMail)
			}).
  success(function(data, status, headers, config) {
	var	response = data;
  $scope.response= response[$rootScope.lang	];
	// $scope.master={};
	// $scope.mailer = angular.copy($scope.master);
	$timeout(function () {
		$window.location.reload();
	}, 200);

}).
  error(function(data, status, headers, config) {
  $scope.response= data;
  });

	}


}]);
