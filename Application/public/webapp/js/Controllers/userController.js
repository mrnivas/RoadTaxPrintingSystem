//Modal Controller
FHMOD.controller("ManageUsersModels",function($scope,$uibModalInstance,items){
	 
	$scope.title = items.title;

	$scope.cancel = function(){

		$uibModalInstance.dismiss();

	}

	$scope.ok = function(){

		$uibModalInstance.close("ok");

	}


	switch(items.option){

		case 'crud.new':
		case 'crud.edit':

				$scope.passwordDisabled = false;

				$scope.Error = ""; $scope.loadingMsg = "";

				$scope.model = {};

				$scope.companies = []; 

				$scope.hubs = []; 

				$scope.CompaniesAndHubs = [];

				var Error = {}; 

				var Loading = {};

				$scope.filterHubs = function(){

					$scope.model.frmUserHub = "0";
					$scope.hubs = new jsonFinder($scope.CompaniesAndHubs).findAll("parent_id").val($scope.model.frmUserCompany).data ;
		 			 
				}

				Error.set = function(data){   

						$scope.errorDisplay = "block"; 
						$scope.Error = data ; 

				}

				Error.off = function(){

						$scope.errorDisplay = "none";
						$scope.Error = "" ; 

				}

				Loading.set = function(data){   

						$scope.loadingDisplay = "block";
						$scope.loadingMsg = data ; 

				}

				Loading.off = function(){

						$scope.loadingDisplay = "none";
						$scope.loadingMsg = "" ; 

				}

				$scope.loadingDisplay = $scope.errorDisplay = "none";

				$scope.roles = [];

				$scope.clear = function(){

					if(items.data){

						$scope.passwordDisabled = true;

						$scope.model.frmUserName = items.data.username;
						$scope.model.frmUserPassword= "";
						$scope.model.frmUserConfirmPassword="";
						$scope.model.frmUserEmail =items.data.email;
						$scope.model.frmUserStatus=String(items.data.status);
						


						//$scope.model.frmUserCompany=items.data.company_id;
						//$scope.model.frmUserHub="0"; 
						//$scope.model.frmUserRole=items.data.user_role;						

					}	
					else{

						$scope.model.frmUserName = "";
						$scope.model.frmUserPassword="";
						$scope.model.frmUserConfirmPassword="";
						$scope.model.frmUserEmail ="";
						$scope.model.frmUserStatus="";
						$scope.model.frmUserCompany="0";
						$scope.model.frmUserHub="0"; 
						$scope.model.frmUserRole=""; 

					}

					
				}

				$scope.clear();

				$scope.save = function(){

					Loading.set("Saving...");

					data = {
							
							id: (items.data ? (items.data.id ): ("0") ),
							username:$scope.model.frmUserName,
							password:$scope.model.frmUserPassword,
							confirm_password:$scope.model.frmUserConfirmPassword,
							email:$scope.model.frmUserEmail , 
							status:$scope.model.frmUserStatus,
							company_id:$scope.model.frmUserCompany, 
							hub_id:$scope.model.frmUserHub, 
							user_role:$scope.model.frmUserRole

					};
		 
					Users.save(data).success(function(_data){

						Loading.off();

						Error.off();

						var res = new Response(_data);  

						if(res.isOk()){

							$uibModalInstance.close("save");

						}
						else{

							Error.set(res.Msg());

						}

					});

				}

				$scope.Disabled = {

					CompanyDisabled:false,
					HubDisabled:false

				};
		 
		 

				$scope.rolesChange = function(){


					makeDisabledFields();

					 
				}

				var makeDisabledFields = function(){

					if($scope.model.frmUserRole == 1){
		 				
						$scope.Disabled.CompanyDisabled = true;
		  				$scope.Disabled.HubDisabled = true;

		  				$scope.model.frmUserCompany="0"; 
		  				$scope.model.frmUserHub="0";
		 
					}
					else if( $scope.model.frmUserRole == 3 ){

						$scope.Disabled.CompanyDisabled = false;
		  				$scope.Disabled.HubDisabled = true;
		  				$scope.model.frmUserHub="0";
		 
					}
					else{

						$scope.Disabled.CompanyDisabled = false;
		  				$scope.Disabled.HubDisabled = false;

					}

				}
				

		break;
		
		case 'crud.delete':

			 $scope.msg = "Are you sure want to delete?"

		break;

	}



});

//Controller
FHMOD.controller("ManageUsers",function($scope,$uibModal){

 		$scope.companies = $scope.CompaniesAndHubs = {};

		$scope.filteredByCompany = "0";

		$scope.filteredByRole = "0";

		$scope.userGrid = [];

		$scope.roles = [];


		$scope.crud = {

			new: function(){
				var ModalWindow_New = $uibModal.open({

					templateUrl : 'form.html',
					controller: 'ManageUsersModels',
					resolve: {
						items:function(){
							return {
								option:'crud.new',
								title:'Create User'
							}
						}
					}

				});

			},

			save : function(){},

			edit : function(id){

				var editRow = new jsonFinder($scope.userGrid).findby("id").val(id) ;

				if(editRow.result){

					var ModalWindow_Edit = $uibModal.open({

						templateUrl : 'form.html',
						controller  : 'ManageUsersModels',
						resolve: {
							items:function(){
								return {
									option:'crud.edit',
									title:'User Moddification',
									data:editRow.data.data
								}
							}
						}

					});

				}

			},
  
			delete : function(id){

				 var deleteRow = new jsonFinder($scope.userGrid).findby("id").val(id) ;

				 if(deleteRow.result){

					 var ModalWindow_Delete = $uibModal.open({

						templateUrl : 'alert.html',
						controller: 'ManageUsersModels',
						resolve: {
							items:function(){
								return {
									option:'crud.delete',
									title:'Delete Confirmation "'+ deleteRow.data.data.username +'"'
								}
							}
						}

					 });

					 ModalWindow_Delete.result.then(function(opt){

				    	 if(opt == "ok"){
 
				    	 	 Users.deleteUser(deleteRow.data.data.id).success(function(_data){

				    	 	 		 if(_data.status == "done"){

				    	 	 		 	 $scope.userGrid.splice(deleteRow.data.index,1);

				    	 	 		 }

				    	 	 })

				    	 }

				     },function(){});


				}

			}

		}


});
