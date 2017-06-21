/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
function MainCtrl() {};

function _(data){

	return data==undefined?"":data;

}

function StopEventBubling(ev){

	if (ev.stopPropagation) ev.stopPropagation();
    if (ev.preventDefault) ev.preventDefault();
    ev.cancelBubble = true;
    ev.returnValue = false;

}

var Response = function(data){

	this.ErrorMsg = "";
	this.ResData = data;
 
}

Response.prototype.isOk = function(){

	if(this.ResData.status == "done"){

		return true;

	}
	else{

		this.ErrorMsg = this.ResData.msg;
		return false;

	} 

}

Response.prototype.Msg = function(){

	return this.ErrorMsg;

}

var jsonFinder = function(JsonData){

		var columnName,columnValue;

		var All = false;

		jsonData = JsonData;

		var opts = {

			findby : function(col){
 				
 				columnName = col;	
 				return this;

			},
			findAll : function(col){
 				
 				All = true;		
 				columnName = col;	
 				return this;

			},
			val:function(value){

				columnValue = value;
				return this.search();

			}, 
			search:function(){

				var result,found = false;

				var Dataset = [];				
 
				for(var i = 0; i <  jsonData.length; i++){
 					 

					if(columnName in jsonData[i]){
 						
 						if(jsonData[i][columnName] == columnValue){

							found = true;

							Dataset[Dataset.length] = jsonData[i] ; 

							if(!All){

								result = {result:true,'msg':'available',data:{index:i,data:jsonData[i]}};
								 
								break;

							}
							else{

								result = {result:true,'msg':'available',data:Dataset };
								 
							}

						}

					}
					else{

						result = {result:false,'msg':'Invalid Column'};
						break;
					}

				}

				if(!found)
				result =  {result:false,'msg':'No Rows Found'};

				return result;
			}

		}

	return opts;
}

var Status = function (status){

	switch(status){

		case 1:
			return "Published";
		break;

		case 0:
			return "Blocked";
		break;

		case -1:
			return "Deleted";
		break;
	}

}

var Disabled = function($scopeVal){

	//this.scopeVal = $scopeVal;

	//this.scopeVal = false;

	return {

		set : function(){
 
			$scopeVal = true;


		},
		remove:function(){

			$scopeVal = false;

		}
	}

};
/*
Disabled.prototype.set = function(){

	this.scopeVal = true;	
	alert(this.scopeVal);
}

Disabled.prototype.remove = function(){

	this.scopeVal = false;	

}
*/

//var FHMOD_CONFIG  = angular.module('uds_config');

//var FHMOD  = angular.module('inspinia').constant("CONFIG",{"web_service_url":"http://ec2-52-77-228-150.ap-southeast-1.compute.amazonaws.com:9000/"});
var FHMOD  = angular.module('inspinia').constant("CONFIG",{"web_service_url":"http://localhost:3000/"});

FHMOD.controller('MainCtrl', MainCtrl);