/* global angular */

function Config() {

}

Run.$inject = ['$rootScope'];

function Run($rootScope) {
    $rootScope.vm = new TestController();
}

function TestController() {
    this.money = 12345.50
}

angular.module("demo", ["ngMoney"])
    .config(Config)
    .run(Run);