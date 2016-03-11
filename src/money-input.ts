module MoneyModule {
    declare var accounting: any;
    declare var currency: any;

    export interface IMoneyInputController {
        value: string;
        currency: string;
        money: string;
        symbol: string;
    }

    class MoneyInputController implements IMoneyInputController {
        constructor() {
        }

        onInit(view: IMoneyInputView) {
            this.view = view;
            this.setView(this.value);
        }

        private _currency: string;

        get currency(): string {
            return this._currency;
        }

        set currency(value: string) {
            this._currency = value;

            this.symbol = null;
            if (value != null)
                this.symbol = currency.symbolize(this.currency);
        }

        private _value: string;

        get value(): string {
            return this._value;
        }

        set value(value: string) {
            this._value = accounting.unformat(value);
            this.setView(this._value);
        }

        private setView(value) {
            this.money = null;

            if (value == null)
                return;

            this.money = accounting.formatMoney(value, {
                symbol: this.symbol
            });

            if (this.view != null)
                this.view.setViewValue(this.money);
        }

        money: string;
        symbol: string;
        private view: IMoneyInputView;
    }

    Angular.module("ngMoney").controller("moneyInput", MoneyInputController);

    export interface IMoneyInputView {
        setViewValue(value): void;
    }

    class MoneyInputDirective {
        static $inject = [];

        constructor() { }

        restrict = 'A';
        require = 'ngModel';
        controller = MoneyInputController;
        controllerAs = 'moneyInput';
        bindToController = true;
        scope = {
            value: '=moneyInput',
            currency: '@'
        };

        link = ($scope, $element, $attrs, ngModelCtrl) => {
            var $ctrl: MoneyInputController = $scope[this.controllerAs];

            $element.on(`blur.${$scope.$id}`, () => {
                $ctrl.value = ngModelCtrl.$modelValue;
            });

            $scope.$on('$destroy', () => {
                $element.off(`blur.${$scope.$id}`);
            });

            var view: IMoneyInputView = {
                setViewValue(value): void {
                    ngModelCtrl.$setViewValue(value);
                    ngModelCtrl.$render();
                }
            }

            $ctrl.onInit(view);
        };


    }

    Angular.module("ngMoney").directive("moneyInput", MoneyInputDirective);
}