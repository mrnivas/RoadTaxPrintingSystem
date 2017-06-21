FHMOD.factory('Users',   function ($window, $location, $http,CONFIG, AuthenticationFactory) {
	
	var LoginUrl = CONFIG.web_service_url+"login";
	
	var UsersUrl = CONFIG.web_service_url+"api/auth/users/";

	var usrObj = {};

	usrObj.userGrid = function(filter){

		return $http.get(UsersUrl+"company/"+filter.company_id+"/"+filter.role_id);

	}
	
	usrObj.Auth = function(){

		return {
			
			login: function(_data) {
				
			  return $http.post(LoginUrl, _data );
			
			  
			},
			
			logout: function() {

				  if (AuthenticationFactory.isLogged) {

						AuthenticationFactory.isLogged = false;

						delete $window.sessionStorage.token;

						$location.path("/login");

				  }

			}
		};
		 
	}
	
	usrObj.getUserRoles = function(){ return $http.get(UsersUrl+"user/roles"); }

	usrObj.getUsers = function(){}
	
	usrObj.getUser = function(id){}
	
	usrObj.deleteUser = function(id){

		return $http.delete(UsersUrl+"delete/"+id);

	}

	usrObj.save = function(data){

		if(data.id!="0"){

			return $http.put(UsersUrl+String(data.id),data);

		}

		return $http.post(UsersUrl,data);

	}
 	
	usrObj.blockUser = function(id){ }
	
	usrObj.unblockuser = function(id){}
	
	return usrObj;
	
});


FHMOD.factory('AuthenticationFactory', function($window) {

  var auth = {

    isLogged: false,

    check: function() {

      if ( $window.sessionStorage.token && $window.sessionStorage.user ){

        this.isLogged = true;

      } else {

        this.isLogged = false;

        delete this.user;

      }

    }

  }

  return auth;

});
 

FHMOD.factory('TokenInterceptor', function($q, $window) {

  return {

    request: function(config) {

      config.headers = config.headers || {};

      if ($window.sessionStorage.token) {

        config.headers['X-Access-Token'] = $window.sessionStorage.token;

      }

      return config || $q.when(config);

    },

    response: function(response) {

      return response || $q.when(response);

    }

  };

});
