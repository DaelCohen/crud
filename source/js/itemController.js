(function () {
    'use strict';

    angular.module('app').controller('ItemController', ItemController);

    ItemController.$inject = ['ItemService'];

    function ItemController(ItemService){
        var vm = this;
        // Bindable members
        vm.name = "";
        vm.items = [];
        vm.isItemEditable = false;
        vm.editableItem = {};
        // Operations
        vm.addItem = addItem;
        vm.addItemOnEnter = addItemOnEnter;
        vm.editItem = editItem;
        vm.removeItem = removeItem;


        /**
         * Function definitions
         */
        function addItem (item) {
            if (!isNaN(vm.editableItem.id)) {
                ItemService.updateItem(vm.editableItem.id, item).then(function (data) {
                    vm.name = "";
                    vm.isItemEditable = false;
                    vm.editableItem.id = undefined;
                    init();
                });
            } else {
                ItemService.createItem(item).then(function (data) {
                    vm.name = "";
                    init();
                });
            }
        }

        function addItemOnEnter (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                addItem(vm.name);
            } else if (event.keyCode === 27) {
                vm.name = "";
                vm.isItemEditable = false;
            }
        }

        function editItem(index, item) {
            vm.isItemEditable = true;
            vm.name = item;
            vm.editableItem.id = index;
        }

        function removeItem(index) {
            ItemService.deleteItem(index).then(function (data) {
                init();
            });
        }

        function init() {
            ItemService.getItems().then(function (data) {
                vm.itemForm.$setPristine();
                vm.items = data.data;
            });
        }

        // Initialization
        init();
    }
}());