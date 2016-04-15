
angular.module('codellama.search', [])

  .service('SearchService', function($http) {

    // initialize empty tutor data array that will hold search results
    this.tutorData = [];

    this.getTutors = function(city, subjects) {
      parsedCity = city.replace(/\ /, '+');
      parsedSubjects = subjects.replace(/\ /g, '+');
      
      return $http({
        method: 'GET',
        url: '/api/tutor/search',
        params: {
          city: city,
          subjects: subjects
        }
      })
      .then(function (resp) {
        return resp.data;
      });
    };
  })

  .controller('SearchController', function ($scope, SearchService, $location) {

    // define search on scope
    $scope.search = function(city, subjects) {

      // call function from SearchService
      SearchService.getTutors(city, subjects)

        // upon success, assign returned tutors data to scope's tutorData
        .then(function(tutors) {
          SearchService.tutorData = tutors;
          $location.path('/search');
        })

        // on error, console log error
        .catch(function(error) {
          console.log('There was an error retrieving tutor data: ', error);
        });
    };
  })

  .controller('SearchResultsController', function ($scope, SearchService) {

    $scope.tutorData = SearchService.tutorData;

    $scope.$watch(
      function() { return SearchService.tutorData; },

      function(newVal) {
        $scope.tutorData = newVal;
      }
    );
    // console.log(SearchService.tutorData);
    // console.log('$search results scope.tutorData:', $scope.tutorData);

  });


