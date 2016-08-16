var app = angular.module('profileApp', []);

app.controller('profileController', function($scope, $http){

   $http({
       method: 'GET',
       url: '/api/profile'
   }).then(function (res) {
       $scope.name = res.data.github.displayName || res.github.data.username;
       $scope.createdPolls = [];
       $scope.votedPolls = [];
       for(var i = 0; i < res.data.polls.created.length; i++) {
           $scope.createdPolls.push({
               id: '/poll/' + res.data.polls.created[i].id,
               title: res.data.polls.created[i].title
           });
       }
       for(var j = 0; j < res.data.polls.voted; j++) {
           $scope.votedPolls.push({
               id: '/poll/' + res.data.polls.voted.id,
               title: res.data.polls.voted.title,
               choice: res.data.polls.voted.option.text,
           });
       }
   });
    
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