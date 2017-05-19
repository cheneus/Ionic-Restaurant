'use strict';

angular.module('conFusion.controllers', ['ngResource'])
    // .constant("baseURL", "http://localhost:3000/")
    .constant("baseURL", "http://192.168.1.6:3000/")
    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage, $ionicPlatform, $cordovaCamera, $cordovaImagePicker) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = $localStorage.getObject('userinfo', '{}');
        $scope.reserveData = {};
        $scope.registration = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);
            $localStorage.storeObject('userinfo', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

        // Create the reserve modal that we will use later
        $ionicModal.fromTemplateUrl('templates/reserve.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.reserveform = modal;
        });

        // Triggered in the reserve modal to close it
        $scope.closeReserve = function() {
            $scope.reserveform.hide();
        };

        // Open the reserve modal
        $scope.reserve = function() {
            $scope.reserveform.show();
        };

        // Perform the reserve action when the user submits the reserve form
        $scope.doReserve = function() {
            console.log('Doing reservation', $scope.reservation);

            // Simulate a reservation delay. Remove this and replace with your reservation
            // code if using a server system
            $timeout(function() {
                $scope.closeReserve();
            }, 1000);
        };

        // Create the registration modal that we will use later
        $ionicModal.fromTemplateUrl('templates/register.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.registerform = modal;
        });

        // Triggered in the registration modal to close it
        $scope.closeRegister = function() {
            $scope.registerform.hide();
        };

        // Open the registration modal
        $scope.register = function() {
            $scope.registerform.show();
        };

        // Perform the registration action when the user submits the registration form
        $scope.doRegister = function() {
            // Simulate a registration delay. Remove this and replace with your registration
            // code if using a registration system
            $timeout(function() {
                $scope.closeRegister();
            }, 1000);
        };
        // camera function for the registeration         
        $ionicPlatform.ready(function() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 100,
                targetHeight: 100,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            $scope.takePicture = function() {
                $cordovaCamera.getPicture(options).then(function(imageData) {
                    $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
                }, function(err) {
                    console.log(err);
                });

                $scope.registerform.show();

            };
        });

        $ionicPlatform.ready(function() {
            var options = {
                maximumImagesCount: 10,
                width: 800,
                height: 800,
                quality: 80
            };

            $scope.fromGallery = function() {
                $cordovaImagePicker.getPictures(options)
                    .then(function(results) {
                        for (var i = 0; i < results.length; i++) {
                            console.log('Image URI: ' + results[i]);
                        }
                    }, function(error) {
                        // error getting photos
                    });
                // $scope.fromGallery = function() {
                //     cordovaImagePicker.getPictures(options).then(function(imageData) {
                //         $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
                //     }, function(err) {
                //         console.log(err);
                // });
            }
        })


    })

.controller('MenuController', ['$scope', 'dishes', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$cordovaLocalNotification', '$cordovaToast', function($scope, dishes, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $cordovaLocalNotification, $cordovaToast) {
    // new factory is added for favourite option
    $scope.baseURL = baseURL;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";
    // menuFactory.query(
    //     function(response) {
    //         $scope.dishes = response;
    //         $scope.showMenu = true;
    //     },
    //     function(response) {
    //         $scope.message = "Error: " + response.status + " " + response.statusText;
    //     });

    $scope.dishes = dishes;

    $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function(checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.addFavorite = function(index) {
        console.log("index is " + index);
        favoriteFactory.addToFavorites(index);
        $ionicListDelegate.closeOptionButtons();
    };

    // $scope.addFavorite = function() {
    //     console.log('saving favorite', $scope.favoritesData);
    //     $localStorage.storeObject('favoritesData', $scope.favoritesData);
    //     console.log("index is " + index);
    //     favoriteFactory.addToFavorites(index);
    //     $ionicListDelegate.closeOptionButtons();
    // };
}])

.controller('ContactController', ['$scope', 'baseURL', function($scope, baseURL) {

    $scope.baseURL = baseURL;

    $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };

    var channels = [{ value: "tel", label: "Tel." }, { value: "Email", label: "Email" }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

}])

.controller('FeedbackController', ['$scope', '$resource', 'feedbackService', 'baseURL', function($scope, $resource, feedbackService, baseURL) {

    $scope.baseURL = baseURL;

    console.log($scope.feedback);

    $scope.sendFeedback = function() {
        if ($scope.feedback.agree && ($scope.feedback !== "")) {
            console.log($scope.feedback);
            feedbackService.getFeedback().save($scope.feedback);
            $scope.invalidChannelSelection = false;
            $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: "", email: "" };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        } else if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
    };

}])

.controller('DishDetailController', ['$scope', '$stateParams', 'dish', '$ionicPopover', '$ionicModal', '$ionicListDelegate', 'menuFactory', 'favoriteFactory', 'baseURL', function($scope, $stateParams, dish, $ionicPopover, $ionicModal, $ionicListDelegate, menuFactory, favoriteFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.dish = dish;
    $scope.showDish = false;
    $scope.message = "Loading ...";

    // $scope.dish = menuFactory.get({ id: parseInt($stateParams.id, 10) })
    //     .$promise.then(
    //         function(response) {
    //             $scope.dish = response;
    //             $scope.showDish = true;
    //         },
    //         function(response) {
    //             $scope.message = "Error: " + response.status + " " + response.statusText;
    //         }
    //     );

    $ionicPopover.fromTemplateUrl('templates/dish-detail-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.Popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.Popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.Popover.hide();
    };

    $scope.addFavorite = function(index) {
        console.log("index is " + $scope.dish.id);
        favoriteFactory.addToFavorites($scope.dish.id);
        $scope.Popover.hide();
    };

    $ionicModal.fromTemplateUrl('templates/dish-comment.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.commentform = modal;
    });

    // Triggered in the reserve modal to close it
    $scope.closeComment = function() {
        $scope.commentform.hide();
    };

    // Open the reserve modal
    $scope.addComment = function() {
        $scope.commentform.show();
    };

    // Perform the reserve action when the user submits the reserve form
    // $scope.doComment = function() {
    //             console.log('Adding comment', $scope.comment);

    $scope.mycomment = { author: "", comment: "", rating: "", date: "" };
    // need more studying
    $scope.submitComment = function() {
        $scope.mycomment.date = new Date().toISOString();
        // $scope.mycomment.rating = parseInt($scope.mycomment.rating);
        console.log($scope.mycomment);
        $scope.dish.comments.push($scope.mycomment);

        menuFactory.update({ id: $scope.dish.id }, $scope.dish);
        $scope.mycomment = { rating: "", comment: "", author: "", date: "" };

        $scope.mp = function() {
            $scope.commentForm.$pristine = true; //clean main form
            $scope.commentForm.$dirty = false;
            angular.forEach($scope.commentForm, function(input) { //clean all input controls
                if (input !== undefined && input.$dirty !== undefined) {
                    input.$dirty = false;
                    input.$pristine = true;
                }
            });
        }
        $scope.commentform.hide();
        $scope.Popover.hide();
        $ionicListDelegate.closeOptionButtons();
        // Simulate a reservation delay. Remove this and replace with your reservation
        // code if using a server system
        // $timeout(function() {
        //     $scope.closeComment();
        // }, 1000);
    };

}])

.controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {

    $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };

    $scope.doComment = function() {
        $scope.mycomment.date = new Date().toISOString();
        $scope.dish.comments.push($scope.mycomment);

        menuFactory.update({ id: $scope.dish.id }, $scope.dish);
        $scope.commentform.$setPristine();
        $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };
    }


}])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', '$stateParams', 'leader', 'dish', 'promotion', 'baseURL',
    'menuFactory', 'corporateFactory', 'promotionFactory',
    function($scope, $stateParams, leader, dish, promotion, baseURL,
        menuFactory, corporateFactory, promotionFactory
    ) {

        // $scope.promotions = menuFactory.getPromotion();
        $scope.baseURL = baseURL;

        // $scope.showDish = false;
        $scope.message = "Loading ...";

        //injected from app.js to as it resolve there
        $scope.leader = leader;
        $scope.dish = dish;
        $scope.promotion = promotion;
    }
])

.controller('AboutController', ['$scope', 'leaders', 'corporateFactory', 'baseURL', function($scope, leaders, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.message = "Loading ...";

    $scope.leadership = leaders

}])

.controller('FavoritesController', ['$scope', 'dishes', 'favorites', 'menuFactory', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', '$localStorage', function($scope, dishes, favorites, menuFactory, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout, $localStorage) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;
    $scope.dishes = dishes;
    // $scope.favorites = $localStorage.getObject('favorites', '');
    $scope.favorites = favorites;
    console.log($scope.favorites);
    console.log($localStorage.getObject('favorites', '{}'));


    // $scope.dishes = menuFactory.query(
    //     function(response) {
    //         $scope.dishes = response;
    //         $timeout(function() {
    //             $ionicLoading.hide();
    //         }, 1000);
    //     },
    //     function(response) {
    //         $scope.message = "Error: " + response.status + " " + response.statusText;
    //         $timeout(function() {
    //             $ionicLoading.hide();
    //         }, 1000);
    //     });
    console.log($scope.dishes, $scope.favorites);

    $scope.toggleDelete = function() {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        console.log($scope.shouldShowDelete);
    }

    $scope.deleteFavorite = function(index) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete this item?'
        });

        confirmPopup.then(function(res) {
            if (res) {
                console.log('Ok to delete');
                favoriteFactory.deleteFromFavorites(index);
            } else {
                console.log('Canceled delete');
            }
        });

        $scope.shouldShowDelete = false;

    }
}])

.filter('favoriteFilter', function() {
    return function(dishes, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < dishes.length; j++) {
                if (dishes[j].id === favorites[i].id)
                    out.push(dishes[j]);
            }
        }
        return out;

    }
});
