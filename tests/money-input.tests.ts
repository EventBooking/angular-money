describe('money-input', function() {

    beforeEach(angular.mock.module('ngMoney'));

    var $scope;

    describe('controller', function() {

        var $controller;

        beforeEach(inject((_$rootScope_, _$controller_) => {
            $controller = _$controller_;
            $scope = _$rootScope_.$new();
        }));

        function createController(): MoneyModule.IMoneyInputController {
            var $ctrl: MoneyModule.IMoneyInputController = $controller('moneyInput', {
                '$scope': $scope
            });
            $scope.$digest();
            chai.assert.isDefined($ctrl);
            return $ctrl;
        }

        it('USD sets symbol to $', () => {
            var $ctrl = createController();
            $ctrl.currency = "USD";
            chai.assert.equal($ctrl.symbol, '$');
        });
        
        it('GBP sets symbol to £', () => {
            var $ctrl = createController();
            $ctrl.currency = "GBP";
            chai.assert.equal($ctrl.symbol, '£');
        });

        it('1234.50 USD sets money to $1,234.50', () => {
            var $ctrl = createController();
            $ctrl.currency = "USD";
            $ctrl.value = "1234.50";
            chai.assert.equal($ctrl.money, '$1,234.50');
        });
        
        it('1234.50 GBP sets money to £1,234.50', () => {
            var $ctrl = createController();
            $ctrl.currency = "GBP";
            $ctrl.value = "1234.50";
            chai.assert.equal($ctrl.money, '£1,234.50');
        });

    });

    describe('directive', function() {

        var $compile;

        beforeEach(inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        }));

        function getCompiledElement(value: string, currency: string) {
            angular.extend($scope, {
                value: value,
                currency: currency
            });
            var $element = angular.element('<input type="text" money-input="value" currency="{{currency}}" ng-model="testModel" >');
            var compiledElement = $compile($element)($scope);
            $scope.$digest();
            return compiledElement;
        }

        it('1234.50 (USD) sets view to $1,234.50', () => {
            var element = getCompiledElement("1234.56", "USD");

            chai.assert.isDefined(element);
            chai.assert.equal(element.val(), "$1,234.56");
        });

    });

});