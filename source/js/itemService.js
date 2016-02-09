(function () {
    'use strict';

    angular.module('app').factory('ItemService', ItemService);

    ItemService.$inject = ['$http'];

    function ItemService($http) {
        var service = {
            getItems: getItems,
            createItem: createItem,
            updateItem: updateItem,
            deleteItem: deleteItem
        };

        function getItems(){
            return $http.get('http://localhost:1337/items');
        }

        function createItem(item){
            return $http.post('http://localhost:1337/items', item);
        }

        function updateItem(index, item){
            return $http.put('http://localhost:1337/items/' + index, item);
        }

        function deleteItem(index){
            return $http.delete('http://localhost:1337/items/' + index);
        }

        return service;
    }
}());