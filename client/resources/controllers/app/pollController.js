var app = angular.module('pollApp', ['chart.js']);

app.controller('pollController', function($scope, $http){

    var pollInfo;
    var userInfo;

    $http({
        method: 'GET',
        url: '/api' + window.location.pathname
    }).then(function (res) {
        // Pull useful data and poplate arrays for Chart.js and poll choices
        pollInfo = res.data;
        $scope.question = pollInfo.poll.title;
        $scope.voteSet = [];
        $scope.labelSet = [];
        $scope.choices = [];
        for (var i = 0; i < pollInfo.poll.options.length; i++) {
            $scope.voteSet.push(pollInfo.poll.options[i].votes);
            $scope.labelSet.push(pollInfo.poll.options[i].text);
            $scope.choices.push({
                number: i,
                text: pollInfo.poll.options[i].text
            });
        }
        
    });

    $scope.addChoice = function (newChoice) {
        if($scope.choices.length <= 7) {
            $http({
                method: 'POST',
                url: '/api' + window.location.pathname,
                data: {
                    choice: newChoice
                }
            }).then(function(res) {
                location.reload()
            });
        }
    };
    
    $scope.votePoll = function (voteNum) {

        $http({
            method: 'PUT',
            url: '/api' + window.location.pathname,
            data: {
                voteNum: voteNum
            }
        }).then(function(res) {
            location.reload()
        });
    };
    
    $scope.deletePoll = function () {
        $http({
            method: 'DELETE',
            url: '/api' + window.location.pathname
        }).then(function(res) {
            console.log('Home');
            window.location = '/';
        });
    };

    var loggedIn = false;
    $http({
        method: 'GET',
        url: '/api/profile'
    }).then(function (res) {
        userInfo = res.data._id;
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
    
    $scope.isCreator = function() {
        return pollInfo.creatorId === userInfo;
    }

});