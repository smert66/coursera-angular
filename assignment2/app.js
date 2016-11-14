(function(){
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOff', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOff'];
    function ToBuyController(ShoppingListCheckOff) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOff.getToBuyItems();

        toBuy.checkOffItem = function(itemIndex) {
            ShoppingListCheckOff.moveItem(itemIndex);
        };

        toBuy.empty = function() {
            return ShoppingListCheckOff.everythingBought();
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOff'];
    function AlreadyBoughtController(ShoppingListCheckOff) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOff.getAlreadyBoughtItems();

        alreadyBought.empty = function() {
            return ShoppingListCheckOff.nothingBought();
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            {
                name: "bread",
                quantity: 2
            },
            {
                name: "milk",
                quantity: 3
            },
            {
                name: "juice",
                quantity: 1
            },
            {
                name: "meat",
                quantity: 4
            },
            {
                name: "beer",
                quantity: 6
            }
        ];

        var alreadyBoughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        };


        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        };

        service.everythingBought = function() {
            if (toBuyItems.length === 0) {
                return true;
            }
        };

        service.nothingBought = function() {
            if (alreadyBoughtItems.length === 0) {
                return true;
            }
        };

        service.moveItem = function (itemIndex) {
            var item = toBuyItems[itemIndex];
            toBuyItems.splice(itemIndex, 1);
            alreadyBoughtItems.push(item);
        };
    }
})();