'use strict';

angular.module('conFusion.services', ['ngResource'])
    // ngResource is injected. 
    .constant("baseURL", "http://localhost:3000/")
    // once this is deployed the localhost will be set to your server ip
    .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

        this.getDishes = function() {

            return $resource(baseURL + "dishes/:id", null, { 'update': { method: 'PUT' } });
        };

        // implement a function named getPromotion
        // that returns a selected promotion.
        this.getPromotion = function() {
            return $resource(baseURL + "promotions/:id");;
        }
    }])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {


    return $resource(baseURL + "leadership/:id");

}])

.factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {


    return $resource(baseURL + "feedback/:id");

}])

;
//My code~
// .factory('corporateFactory', ['$resource', 'baseURL',function($resource, baseURL) {

//     var corpfac = {};


//     corpfac.getLeaders = function() {
//         return $resource(baseURL + "leadership/:id", null, { 'update': { method: 'PUT' } });
//     };
//     return corpfac;
//     // Implement two functions, one named getLeaders,
//     // the other named getLeader(index)
//     // Remember this is a factory not a service


// }])

// .service('feedbackService', ['$resource', function($resource) {

//      this.getFeedback = function() {
//             return $resource( "http://localhost:3000/feedback/:id", null, { 'update': { method: 'PUT' } });
//         // .update is introduce >>>>>> so as method put to ease coding.
//         };

// }])
