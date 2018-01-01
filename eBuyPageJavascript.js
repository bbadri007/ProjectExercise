//Searching Sorting and Pagination of Table with AngularJS

var myApp = angular.module('myApp', []);
//Not Necessary to Create Service, Same can be done in COntroller also as method like add() method
myApp.service('filteredListService', function () {
    this.searched = function (valLists, toSearch) {
        return _.filter(valLists,
        function (i) {
            /* Search Text in all fields */
            return searchUtil(i, toSearch);

        });

    };
    this.paged = function (valLists, pageSize) {

        retVal = [];

        for (var i = 0; i < valLists.length; i++) {

            if (i % pageSize === 0) {

                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {

                retVal[Math.floor(i / pageSize)].push(valLists[i]);

            }

        }

        return retVal;
    };

});

//Inject Custom Service Created by us and Global service $filter. This is one way of specifying dependency Injection

var TableCtrl = myApp.controller('TableCtrl', function ($scope, $filter, filteredListService) {

    $scope.pageSize = 30;

    $scope.allItems = getDummyData();

    $scope.reverse = false;
    $scope.resetAll = function () {

        $scope.filteredList = $scope.allItems;

        $scope.newTxnId = '';
        $scope.newUserName = '';
	$scope.newProductZone = '';
	$scope.newProduct = '';
	$scope.newModel = '';
	$scope.newDateTime = '';
	$scope.newQuantity = '';
	$scope.newAmount = '';

        $scope.searchText = '';

        $scope.currentPage = 0;

        $scope.Header = ['', '', ''];

    }

    $scope.add = function () {

        $scope.allItems.push({

	$scope.newTxnId = '';
        $scope.newUserName = '';
	$scope.newProductZone = '';
	$scope.newProduct = '';
	$scope.newModel = '';
	$scope.newDateTime = '';
	$scope.newQuantity = '';
	$scope.newAmount = '';


            TxnId: $scope.newTxnId,
            UserName: $scope.newUserName,
            ProductZone: $scope.newProductZone,
	    Product: $scope.newProduct,
            Model: $scope.newModel,
            DateTime: $scope.newDateTime,
	    Quantity: $scope.newQuantity,
            Amount: $scope.newAmount


        });

        $scope.resetAll();

    }

    $scope.search = function () {

        $scope.filteredList = filteredListService.searched($scope.allItems, $scope.searchText);
	
        if ($scope.searchText == 'TxnId' || $scope.searchText == 'UserName' || $scope.searchText == 'ProductZone' || $scope.searchText == 'Product' ||
	    $scope.searchText == 'Model' || $scope.searchText == 'DateTime' || $scope.searchText == 'Quantity' || $scope.searchText == 'Amount') {

            $scope.filteredList = $scope.allItems;

        }

        $scope.pagination();

    }
    // Calculate Total Number of Pages based on Search Result

    $scope.pagination = function () {

        $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);

    };
    $scope.setPage = function () {

        $scope.currentPage = this.n;
    };

    $scope.firstPage = function () {
        $scope.currentPage = 0;
    };

    $scope.lastPage = function () {
        $scope.currentPage = $scope.ItemsByPage.length - 1;
    };

    $scope.range = function (input, total) {

        var ret = [];

        if (!total) {

            total = input;

            input = 0;

        }

        for (var i = input; i < total; i++) {

            if (i != 0 && i != total - 1) {

                ret.push(i);

            }

        }

        return ret;

    };

 

    $scope.sort = function (sortBy) {

        $scope.resetAll();
        $scope.columnToOrder = sortBy;
        //$Filter - Standard Service
        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
        if ($scope.reverse) iconName = 'glyphicon glyphicon-chevron-up';
        else iconName = 'glyphicon glyphicon-chevron-down';
	
	 if (sortBy === 'TxnId') {
            $scope.Header[0] = iconName;

        } else if (sortBy === 'UserName') {

            $scope.Header[1] = iconName;

        } else if (sortBy === 'ProductZone') {

            $scope.Header[2] = iconName;

        }
	else if (sortBy === 'Product') {
            $scope.Header[3] = iconName;

        } else if (sortBy === 'Model') {

            $scope.Header[4] = iconName;

        } 
	else if (sortBy === 'DateTime') {
            $scope.Header[5] = iconName;

        } else if (sortBy === 'Quantity') {

            $scope.Header[6] = iconName;

        } else {
            $scope.Header[7] = iconName;

        }
        $scope.reverse = !$scope.reverse;
        $scope.pagination();
    };

 

    //By Default sort ny Name

    $scope.sort('TxnId');

 

});

 
function searchUtil(item, toSearch) {

    /* Search Text in all 3 fields */
    return (item.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.Email.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.EmpId == toSearch) ? true : false;
}
