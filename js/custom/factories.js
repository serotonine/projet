app.factory('contentFactory', function($http, $q){

    var that={ "data":null };
    that.get= function(lang) {

      var deffered = $q.defer();

     $http({

        url:'datas/'+ lang +'.json',
        method:'POST',
        headers:{ 'Content-Type':'json' },
        cache : true
      })
      .success(function(data){

        deffered.resolve(data);
      })
      .error(function(textStatus){

        deffered.reject(textStatus);
      });
      return deffered.promise;
   } //end that.get

    return that;

  }); //end contentFactory



  ////// UTILS FACTORY /////

  app.factory('utilsFactory', function(){
    var that={};
    //LOCAL STORAGE //
    that.LocalStorageUI = {

      getData: function(item){

        if(localStorage !== undefined){

          if(localStorage.getItem(item)!== null){ return JSON.parse(localStorage.getItem(item));  }
          else{ return false; }
        }
        else{ throw "localStorage is not a valid method"; }

      },

      setData : function(item, data){

        if(localStorage !== undefined){
          app.currentList = data;
          localStorage.setItem( item,JSON.stringify(data) ) ;
        }
        else{ throw "localStorage is not a valid method"; }

      }

    },// end LocalStorageUI
    that.getUserLg = function(){
      var navLg = navigator.language || navigator.userLanguage;
      userLg = navLg.split('-')[0];
      if(userLg !="fr"|| userLg !="nl"||userLg !="en"){ userLg="en"; }
      return userLg;
    }

    return that;



  }); //end utilsfactory
