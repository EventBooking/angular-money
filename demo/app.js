/* global angular */

function Config() {

}

Run.$inject = ['$rootScope'];

function Run($rootScope) {
    $rootScope.vm = new TestController();
}

function TestController() {
    this.money = 12345.50;
    this.value = 12345.50;
    this.currency = "USD";
    
    this.decimalMoney = 100.50;
    this.codeMoney = 'GBP';
    this.moneyObject = {
        amount: 123.45,
        currency: 'EUR'
    }
    this.moneyObject1k = {
        amount: 1234.45,
        currency: 'EUR'
    }
    this.moneyObject1m = {
        amount: 1235678.45,
        currency: 'EUR'
    }
    this.moneyObjectAt1m = {
        amount: 1000000.00,
        currency: 'EUR'
    }
}

angular.module("demo", ["ngMoney"])
    .config(Config)
    .run(Run);