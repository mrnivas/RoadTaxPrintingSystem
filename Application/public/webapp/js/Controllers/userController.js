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
				

		break;
		
		case 'crud.delete':

			 $scope.msg = "Are you sure want to delete?"

		break;

	}



});

//Controller
FHMOD.controller("ManageUsers",function($scope,$uibModal){




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

			    	 	  
			    	 }

			     },function(){});


			}

			 

		}


});
