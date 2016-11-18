(function() {
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    };


    function FoundItemsDirectiveController() {
        var list = this;

        list.empty = function() {
            if (list.found.length === 0) {
                return true;
            } else {
                return false;
            }
        };
    };


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var list = this;
        
        list.searchTerm="";

        list.found = [];
        
        list.searchMenuItems = function() {
            list.found.length = 0;
            var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
            promise.then(function (foundItems) {
            list.found = foundItems;
        });
        }

        list.removeItem = function(found, itemIndex) {
            MenuSearchService.removeItem(list.found, itemIndex);
        }
    };


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        var foundItems = [];

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            })
            .then(function(response){
                var menuItems = response.data.menu_items;
                for (var i=0; i < menuItems.length; i++) {
                    var item = menuItems[i];
                    var itemDesc = item.description;
                    if (itemDesc.search(searchTerm) != -1) {
                        foundItems.push(item);
                    }
                };
                return foundItems;
            }, function(error) {
                console.log("Connection error");
            })
            
        };

        service.removeItem = function (array, itemIndex) {
            array.splice(itemIndex, 1);
        };
    };
    
})();
