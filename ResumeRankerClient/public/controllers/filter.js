var myApp = angular.module("filterApp", []);

myApp.controller('filterController', function($scope, $http, $window) {

	$scope.analysisSoftware = ["ANSYS", "COSMOS", "Flottem", "Fluent", "ICEPAK"];
	$scope.cad = ["AutoCad", "Creo", "ProE", "Solidworks"];
	$scope.cloudTechnologies = ["AWS", "Bluemix", "Cloud9", "Heroku"];
	$scope.databases = ["Cassandra", "CouchDB", "DB2", "MongoDB", "MySQL", "Oracle", "PostgreSQL", "Redis", "Spanner", "Vertica"];
	$scope.microControllers = ["Arduino", "Atmel", "Beaglebone Black", "PSOQ", "Raspberry Pi"];
	$scope.operatingSystems = ["Linux", "OS X", "Windows"];
	$scope.other = ["Microsoft Excel", "Microsoft Office", "Microsoft PowerPoint", "Microsoft Word"];
	$scope.programmingLang = ["C++", "C#", "Java", "Pyhton", "Ruby", "Scala", "SQL"];
	$scope.tools = ["Ant", "Git", "Jenkins", "JIRA", "JProfiler", "SVN"];
	$scope.webDevelopment = ["amCharts", "Angular.js", "Backbone.js", "Bootstrap", "CSS", "Hibernate", "HTML", "JavaScript", "JSON", "JQuery", "Node.js", "PHP", "Rails", "REST", "ReactJS", "SOAP", "Spring", "Struts", "Tomcat", "XML"];
	
	$scope.selected = [];
	
	$scope.categories = true;
	$scope.skills = true;
	$scope.customKey = true;
	$scope.searchButton = true;
	$scope.resumeList = false;
	
	var updateSelected = function(action, id) {
	  if (action === 'add' && $scope.selected.indexOf(id) === -1) {
	    $scope.selected.push(id);
	  }
	  if (action === 'remove' && $scope.selected.indexOf(id) !== -1) {
	    $scope.selected.splice($scope.selected.indexOf(id), 1);
	  }
	};

	$scope.updateSelection = function($event, id) {
	  var checkbox = $event.target;
	  var action = (checkbox.checked ? 'add' : 'remove');
	  updateSelected(action, id);
	}; 	
	
	$scope.appendKeyword = function(){
		
		$scope.selected.push($scope.customKeyword);
		$scope.customKeyword = "";
	};
	
	$scope.saveConfiguration = function(Name) {
		
		var CommaFormattedKeywords = "";
		
		for(var i=0 ; i < $scope.selected.length; i++) {
			
			if (i!==$scope.selected.length-1){
				CommaFormattedKeywords = CommaFormattedKeywords + $scope.selected[i] + ",";
			}
			else{
				CommaFormattedKeywords = CommaFormattedKeywords + $scope.selected[i];
			}
		}
		
		var configurationDetails = {"jobId": $scope.jobId, "jobTitle": $scope.jobTitle, "keywords": CommaFormattedKeywords};

		$http.post("/SaveProfile", configurationDetails)
		.success(function(data,status) {
			if (data === "SUCCESS")
			{
				console.log("Success returned from SaveProfile Function");
				$scope.saveStatus = "Configuration saved successfully!!!";
			}
			else
			{
				console.log("Error returned from SaveProfile Function");
				$scope.saveStatus = "Problem in saving configuration!!!";
			}
		});
		
	};
	
	
	$scope.search = function(){
		//$scope.skills = false;
		console.log("searching!!!");

		//$scope.data1 = [];
		/*for(var i in $scope.data) {
			if($scope.data.hasOwnProperty(i) && !isNaN(+i)) {
				$scope.data1[+i] = $scope.data[i].skill;
			}
		}*/

		var keywords = {"skill": $scope.selected};

		$scope.filesList = [];

		$http.post("/SearchResume", keywords)
		.success(function(data,status) {
			if (status === 200)
			{
				console.log("Success returned from searchResume Function");
				console.log(data);
				console.log(status);

				var i = 0;

				for (i=0; i<data.files.length; i++){
					var fileDetails = {};
					fileDetails["Name"] = data.files[i];
					$scope.filesList.push(fileDetails);
				}

				$scope.categories = false;
				$scope.skills = false;
				$scope.customKey = false;
				$scope.searchButton = false;
				$scope.resumeList = true;
				
			}
			else
			{
				console.log("Error returned from searchResume Function");
			}
		});

	};
	

});