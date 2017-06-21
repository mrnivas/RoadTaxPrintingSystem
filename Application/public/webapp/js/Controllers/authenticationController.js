FHMOD.controller("authenticationController",function($scope,Users,$window,$location,AuthenticationFactory){ 
		
		if($window.sessionStorage.token){

			//$location.path("index/companies")

		}

		$scope.Login = function(){
			
			var _uname = $scope.Username;
			var _pwd = $scope.Password;

			Users.Auth().login({"username":_uname,"password":_pwd}).success(function(res){

				if(res.status == "done"){

					AuthenticationFactory.isLogged = true;
		        	$window.sessionStorage.token = res.token;
		        	$location.path("index/companies");

				}
				else{

					alert(res.msg);

				}
		        
			}).error(function(status){

				alert("Network issue");

			});

		}
		
});