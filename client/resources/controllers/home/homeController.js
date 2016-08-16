var app = angular.module('strawmanPoll',[]);

app.controller('homeController', function($scope, $http) {

   $http({
       method: 'GET',
       url: '/api/polls/'
   }).then(function success(res) {
       $scope.polls = [];
       for (var i = 0; i < res.data.length; i++) {
           $scope.polls.push({
               link: "/poll/" + res.data[i]._id,
               title: res.data[i].poll.title,
           });
       }
   }, function fail(res) {
       $scope.polls = "Error: could not fetch recent polls";
   });
   
   $scope.hasVoted = function(index) {
       return $scope.polls[index].voted;
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