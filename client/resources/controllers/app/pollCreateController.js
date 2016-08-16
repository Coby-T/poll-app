var app = angular.module('createApp', []);

app.controller('pollCreateController', function($scope, $http){
    
    $scope.choices = [{id: "choice0"}, {id: "choice1"}];
    
    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length;
        $scope.choices.push({'id':'choice'+newItemNo});
    };
    
    $scope.removeChoice = function() {
        var lastItem = $scope.choices.length-1;
        $scope.choices.splice(lastItem);
    };
    
    $scope.canAdd = function() {
        return $scope.choices.length === 7;
    };
    
    $scope.submitNewPoll = function (title, options) {
        if (!title) {
            alert("Title is needed.");
        } 
        else {
            options.filter(function(value) {
                return value;
            });
            options = Array.from(new Set(options));
            if (options.length <= 1) {
                alert("At least two choices are needed.");
            }
            else {
                $http({
                    method: 'POST',
                    url: '/api/create/',
                    data: {
                        title: title,
                        options: options
                    }
                }).then(function(res) {
                    window.location = '/';
                });
            }
        }
        
    };
    
});

app.controller('navController', function($scope, $http){
    
    var loggedIn = false;
    $http({
        method: 'GET',
        url: '/api/profile'
    }).then(function (res) {
        if (res.data.error){
            loggedIn = false;
        }
        else if (res.data.github.displayName) {
            loggedIn = true;
            $scope.displayName = res.data.github.displayName;
        }
        else if (res.data.github.username) {
            loggedIn = true;
            $scope.displayName = res.data.github.username;
        }
        else {
            loggedIn = false;
        }
        

    });

    $scope.isLoggedIn = function() {
        return loggedIn;
    };

});