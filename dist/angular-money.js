Angular.module("ngMoney", []);
var MoneyModule;
(function (MoneyModule) {
    var MoneyInputController = (function () {
        function MoneyInputController() {
        }
        MoneyInputController.prototype.onInit = function (view) {
            this.view = view;
            this.setView(this.value);
        };
        Object.defineProperty(MoneyInputController.prototype, "currency", {
            get: function () {
                return this._currency;
            },
            set: function (value) {
                this._currency = value;
                this.symbol = null;
                if (value != null)
                    this.symbol = currency.symbolize(this.currency);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MoneyInputController.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = accounting.unformat(value);
                this.setView(this._value);
            },
            enumerable: true,
            configurable: true
        });
        MoneyInputController.prototype.setView = function (value) {
            this.money = null;
            if (value == null)
                return;
            this.money = accounting.formatMoney(value, {
                symbol: this.symbol
            });
            if (this.view != null)
                this.view.setViewValue(this.money);
        };
        return MoneyInputController;
    }());
    Angular.module("ngMoney").controller("moneyInput", MoneyInputController);
    var MoneyInputDirective = (function () {
        function MoneyInputDirective() {
            var _this = this;
            this.restrict = 'A';
            this.require = 'ngModel';
            this.controller = MoneyInputController;
            this.controllerAs = 'moneyInput';
            this.bindToController = true;
            this.scope = {
                value: '=moneyInput',
                currency: '@'
            };
            this.link = function ($scope, $element, $attrs, ngModelCtrl) {
                var $ctrl = $scope[_this.controllerAs];
                $element.on("blur." + $scope.$id, function () {
                    $ctrl.value = ngModelCtrl.$modelValue;
                });
                $scope.$on('$destroy', function () {
                    $element.off("blur." + $scope.$id);
                });
                var view = {
                    setViewValue: function (value) {
                        ngModelCtrl.$setViewValue(value);
                        ngModelCtrl.$render();
                    }
                };
                $ctrl.onInit(view);
            };
        }
        MoneyInputDirective.$inject = [];
        return MoneyInputDirective;
    }());
    Angular.module("ngMoney").directive("moneyInput", MoneyInputDirective);
})(MoneyModule || (MoneyModule = {}));
var MoneyModule;
(function (MoneyModule) {
    var MoneyFiltersModule;
    (function (MoneyFiltersModule) {
        var MoneyFilter = (function () {
            function MoneyFilter() {
            }
            MoneyFilter.prototype.filter = function (value, code, options) {
                if (value == null || angular.isString(value) && value.trim().length === 0)
                    return "";
                if (angular.isObject(code)) {
                    options = code;
                    code = null;
                }
                if (value.amount) {
                    code = value.currency || code;
                    value = value.amount;
                }
                if (!options)
                    options = {};
                if (options.abbrev) {
                    var v = accounting.unformat(value);
                    if (v >= 1000) {
                        value = v / 1000;
                        options.precision = 1;
                        options.format = "%s%vK";
                    }
                    if (v >= 1000000) {
                        value = v / 1000000;
                        options.precision = 1;
                        options.format = "%s%vM";
                    }
                }
                options.symbol = currency.symbolize(code);
                return accounting.formatMoney(value, options);
            };
            return MoneyFilter;
        }());
        Angular.module("ngMoney").filter("money", MoneyFilter);
    })(MoneyFiltersModule || (MoneyFiltersModule = {}));
})(MoneyModule || (MoneyModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1tb25leS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiLCIuLi9zcmMvbW9uZXktaW5wdXQudHMiLCIuLi9zcmMvbW9uZXktZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDQTlCLElBQU8sV0FBVyxDQThHakI7QUE5R0QsV0FBTyxXQUFXLEVBQUMsQ0FBQztJQVdoQjtRQUNJO1FBQ0EsQ0FBQztRQUVELHFDQUFNLEdBQU4sVUFBTyxJQUFxQjtZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBSUQsc0JBQUksMENBQVE7aUJBQVo7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQztpQkFFRCxVQUFhLEtBQWE7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztvQkFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELENBQUM7OztXQVJBO1FBWUQsc0JBQUksdUNBQUs7aUJBQVQ7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFFRCxVQUFVLEtBQWE7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsQ0FB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RCxDQUFDLEFBckNELElBcUNDO1FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUMsRUE3Q00sa0JBQWtCLEtBQWxCLGtCQUFrQixRQTZDeEI7QUFDTCxDQUFDLEVBbERNLFdBQVcsS0FBWCxXQUFXLFFBa0RqQiIsInNvdXJjZXNDb250ZW50IjpbIkFuZ3VsYXIubW9kdWxlKFwibmdNb25leVwiLCBbXSk7IiwibW9kdWxlIE1vbmV5TW9kdWxlIHtcclxuICAgIGRlY2xhcmUgdmFyIGFjY291bnRpbmc6IGFueTtcclxuICAgIGRlY2xhcmUgdmFyIGN1cnJlbmN5OiBhbnk7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTW9uZXlJbnB1dENvbnRyb2xsZXIge1xyXG4gICAgICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICAgICAgY3VycmVuY3k6IHN0cmluZztcclxuICAgICAgICBtb25leTogc3RyaW5nO1xyXG4gICAgICAgIHN5bWJvbDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE1vbmV5SW5wdXRDb250cm9sbGVyIGltcGxlbWVudHMgSU1vbmV5SW5wdXRDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCh2aWV3OiBJTW9uZXlJbnB1dFZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gdmlldztcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3KHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfY3VycmVuY3k6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IGN1cnJlbmN5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW5jeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBjdXJyZW5jeSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbmN5ID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN5bWJvbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zeW1ib2wgPSBjdXJyZW5jeS5zeW1ib2xpemUodGhpcy5jdXJyZW5jeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBhY2NvdW50aW5nLnVuZm9ybWF0KHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3KHRoaXMuX3ZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0Vmlldyh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vbmV5ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb25leSA9IGFjY291bnRpbmcuZm9ybWF0TW9uZXkodmFsdWUsIHtcclxuICAgICAgICAgICAgICAgIHN5bWJvbDogdGhpcy5zeW1ib2xcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcuc2V0Vmlld1ZhbHVlKHRoaXMubW9uZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9uZXk6IHN0cmluZztcclxuICAgICAgICBzeW1ib2w6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHZpZXc6IElNb25leUlucHV0VmlldztcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTW9uZXlcIikuY29udHJvbGxlcihcIm1vbmV5SW5wdXRcIiwgTW9uZXlJbnB1dENvbnRyb2xsZXIpO1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vbmV5SW5wdXRWaWV3IHtcclxuICAgICAgICBzZXRWaWV3VmFsdWUodmFsdWUpOiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE1vbmV5SW5wdXREaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnbmdNb2RlbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE1vbmV5SW5wdXRDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICdtb25leUlucHV0JztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6ICc9bW9uZXlJbnB1dCcsXHJcbiAgICAgICAgICAgIGN1cnJlbmN5OiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBNb25leUlucHV0Q29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgYmx1ci4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudmFsdWUgPSBuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihgYmx1ci4keyRzY29wZS4kaWR9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZpZXc6IElNb25leUlucHV0VmlldyA9IHtcclxuICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZSh2YWx1ZSk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KHZpZXcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTW9uZXlcIikuZGlyZWN0aXZlKFwibW9uZXlJbnB1dFwiLCBNb25leUlucHV0RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBNb25leU1vZHVsZSB7XHJcbiAgICBkZWNsYXJlIHZhciBhY2NvdW50aW5nOiBhbnk7XHJcbiAgICBkZWNsYXJlIHZhciBjdXJyZW5jeTogYW55O1xyXG5cclxuICAgIG1vZHVsZSBNb25leUZpbHRlcnNNb2R1bGUge1xyXG4gICAgICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vbmV5RmlsdGVyIHtcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlOiBhbnksIGNvZGU/OiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBzdHJpbmdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIE1vbmV5RmlsdGVyIGltcGxlbWVudHMgSU1vbmV5RmlsdGVyIHtcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlOiBhbnksIGNvZGU/OiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgYW5ndWxhci5pc1N0cmluZyh2YWx1ZSkgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdChjb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5hbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2RlID0gdmFsdWUuY3VycmVuY3kgfHwgY29kZTtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmFtb3VudDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFiYnJldikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gYWNjb3VudGluZy51bmZvcm1hdCh2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ID49IDEwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2IC8gMTAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wcmVjaXNpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmZvcm1hdCA9IFwiJXMldktcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHYgPj0gMTAwMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHYgLyAxMDAwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnByZWNpc2lvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0ID0gXCIlcyV2TVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnN5bWJvbCA9IGN1cnJlbmN5LnN5bWJvbGl6ZShjb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjb3VudGluZy5mb3JtYXRNb25leSh2YWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgQW5ndWxhci5tb2R1bGUoXCJuZ01vbmV5XCIpLmZpbHRlcihcIm1vbmV5XCIsIE1vbmV5RmlsdGVyKTtcclxuICAgIH1cclxufSJdfQ==