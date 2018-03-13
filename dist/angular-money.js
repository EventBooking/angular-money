var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Angular.module("ngMoney", []);
var MoneyModule;
(function (MoneyModule) {
    var MoneyInputController = /** @class */ (function () {
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
    var MoneyInputDirective = /** @class */ (function () {
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
    var MoneyFilter = /** @class */ (function () {
        function MoneyFilter() {
        }
        MoneyFilter.configure = function (defaultCode, defaultOptions) {
            MoneyFilter.defaultCode = defaultCode;
            MoneyFilter.defaultOptions = defaultOptions;
        };
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
            if (code == null) {
                code = MoneyFilter.defaultCode;
            }
            var _options = __assign({ precision: accounting.settings.currency.precision }, (MoneyFilter.defaultOptions || {}), (options || {}), { symbol: currency.symbolize(code) });
            var v = accounting.unformat(value);
            if (_options.abbrev) {
                if (v >= 1000000) {
                    value = v / 1000000;
                    _options.precision = value.toString().indexOf('.') > 0 ? 1 : 0;
                    _options.format = "%s%vM";
                }
                else if (v >= 1000) {
                    value = v / 1000;
                    _options.precision = value.toString().indexOf('.') > 0 ? 1 : 0;
                    _options.format = "%s%vK";
                }
                else if (v >= 100) {
                    value = v;
                    _options.precision = value.toString().indexOf('.') > 0 ? _options.precision : 0;
                    _options.format = "%s%v";
                }
                else if (v >= 10) {
                    value = v;
                    _options.precision = value.toString().indexOf('.') > 0 ? _options.precision : 0;
                    _options.format = "%s%v";
                }
            }
            var result = accounting.formatMoney(value, _options);
            return result;
        };
        MoneyFilter.defaultCode = "USD";
        return MoneyFilter;
    }());
    MoneyModule.MoneyFilter = MoneyFilter;
    Angular.module("ngMoney").filter("money", MoneyFilter);
})(MoneyModule || (MoneyModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1tb25leS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiLCIuLi9zcmMvbW9uZXktaW5wdXQudHMiLCIuLi9zcmMvbW9uZXktZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7QUNBOUIsSUFBTyxXQUFXLENBOEdqQjtBQTlHRCxXQUFPLFdBQVc7SUFXZDtRQUNJO1FBQ0EsQ0FBQztRQUVELHFDQUFNLEdBQU4sVUFBTyxJQUFxQjtZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBSUQsc0JBQUksMENBQVE7aUJBQVo7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQztpQkFFRCxVQUFhLEtBQWE7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztvQkFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELENBQUM7OztXQVJBO1FBWUQsc0JBQUksdUNBQUs7aUJBQVQ7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFFRCxVQUFVLEtBQWE7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsQ0FBQzs7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Q0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBOURjLHVCQUFXLEdBQVcsS0FBSyxDQUFDO1FBK0QvQyxrQkFBQztLQUFBLEFBakVELElBaUVDO0lBakVZLHVCQUFXLGNBaUV2QixDQUFBO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNELENBQUMsRUE1RU0sV0FBVyxLQUFYLFdBQVcsUUE0RWpCIiwic291cmNlc0NvbnRlbnQiOlsiQW5ndWxhci5tb2R1bGUoXCJuZ01vbmV5XCIsIFtdKTsiLCJtb2R1bGUgTW9uZXlNb2R1bGUge1xyXG4gICAgZGVjbGFyZSB2YXIgYWNjb3VudGluZzogYW55O1xyXG4gICAgZGVjbGFyZSB2YXIgY3VycmVuY3k6IGFueTtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElNb25leUlucHV0Q29udHJvbGxlciB7XHJcbiAgICAgICAgdmFsdWU6IHN0cmluZztcclxuICAgICAgICBjdXJyZW5jeTogc3RyaW5nO1xyXG4gICAgICAgIG1vbmV5OiBzdHJpbmc7XHJcbiAgICAgICAgc3ltYm9sOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTW9uZXlJbnB1dENvbnRyb2xsZXIgaW1wbGVtZW50cyBJTW9uZXlJbnB1dENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KHZpZXc6IElNb25leUlucHV0Vmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXcodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9jdXJyZW5jeTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgY3VycmVuY3koKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbmN5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGN1cnJlbmN5KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuY3kgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3ltYm9sID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN5bWJvbCA9IGN1cnJlbmN5LnN5bWJvbGl6ZSh0aGlzLmN1cnJlbmN5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IGFjY291bnRpbmcudW5mb3JtYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXcodGhpcy5fdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRWaWV3KHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9uZXkgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vbmV5ID0gYWNjb3VudGluZy5mb3JtYXRNb25leSh2YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgc3ltYm9sOiB0aGlzLnN5bWJvbFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMudmlldy5zZXRWaWV3VmFsdWUodGhpcy5tb25leSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb25leTogc3RyaW5nO1xyXG4gICAgICAgIHN5bWJvbDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogSU1vbmV5SW5wdXRWaWV3O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdNb25leVwiKS5jb250cm9sbGVyKFwibW9uZXlJbnB1dFwiLCBNb25leUlucHV0Q29udHJvbGxlcik7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTW9uZXlJbnB1dFZpZXcge1xyXG4gICAgICAgIHNldFZpZXdWYWx1ZSh2YWx1ZSk6IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTW9uZXlJbnB1dERpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICduZ01vZGVsJztcclxuICAgICAgICBjb250cm9sbGVyID0gTW9uZXlJbnB1dENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ21vbmV5SW5wdXQnO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogJz1tb25leUlucHV0JyxcclxuICAgICAgICAgICAgY3VycmVuY3k6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IE1vbmV5SW5wdXRDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBibHVyLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC52YWx1ZSA9IG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGBibHVyLiR7JHNjb3BlLiRpZH1gKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmlldzogSU1vbmV5SW5wdXRWaWV3ID0ge1xyXG4gICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKHZhbHVlKTogdm9pZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQodmlldyk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdNb25leVwiKS5kaXJlY3RpdmUoXCJtb25leUlucHV0XCIsIE1vbmV5SW5wdXREaXJlY3RpdmUpO1xyXG59IiwibW9kdWxlIE1vbmV5TW9kdWxlIHtcclxuICAgIGRlY2xhcmUgdmFyIGFjY291bnRpbmc6IGFueTtcclxuICAgIGRlY2xhcmUgdmFyIGN1cnJlbmN5OiBhbnk7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTW9uZXlGaWx0ZXIge1xyXG4gICAgICAgIGZpbHRlcih2YWx1ZTogYW55LCBjb2RlPzogc3RyaW5nLCBvcHRpb25zPzogYW55KTogc3RyaW5nXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vbmV5RmlsdGVyIGltcGxlbWVudHMgSU1vbmV5RmlsdGVyIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkZWZhdWx0T3B0aW9uczogYW55O1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRlZmF1bHRDb2RlOiBzdHJpbmcgPSBcIlVTRFwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGNvbmZpZ3VyZShkZWZhdWx0Q29kZTogc3RyaW5nLCBkZWZhdWx0T3B0aW9ucz86IGFueSkge1xyXG4gICAgICAgICAgICBNb25leUZpbHRlci5kZWZhdWx0Q29kZSA9IGRlZmF1bHRDb2RlO1xyXG4gICAgICAgICAgICBNb25leUZpbHRlci5kZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmlsdGVyKHZhbHVlOiBhbnksIGNvZGU/OiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCBhbmd1bGFyLmlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdChjb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICBjb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlLmFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgY29kZSA9IHZhbHVlLmN1cnJlbmN5IHx8IGNvZGU7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmFtb3VudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoY29kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb2RlID0gTW9uZXlGaWx0ZXIuZGVmYXVsdENvZGU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBfb3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgcHJlY2lzaW9uOiBhY2NvdW50aW5nLnNldHRpbmdzLmN1cnJlbmN5LnByZWNpc2lvbixcclxuICAgICAgICAgICAgICAgIC4uLihNb25leUZpbHRlci5kZWZhdWx0T3B0aW9ucyB8fCB7fSksXHJcbiAgICAgICAgICAgICAgICAuLi4ob3B0aW9uc3x8e30pLFxyXG4gICAgICAgICAgICAgICAgc3ltYm9sOiBjdXJyZW5jeS5zeW1ib2xpemUoY29kZSlcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2ID0gYWNjb3VudGluZy51bmZvcm1hdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChfb3B0aW9ucy5hYmJyZXYpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ID49IDEwMDAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHYgLyAxMDAwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLnByZWNpc2lvbiA9IHZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZignLicpID4gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLmZvcm1hdCA9IFwiJXMldk1cIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2ID49IDEwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHYgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLnByZWNpc2lvbiA9IHZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZignLicpID4gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLmZvcm1hdCA9IFwiJXMldktcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2ID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdjtcclxuICAgICAgICAgICAgICAgICAgICBfb3B0aW9ucy5wcmVjaXNpb24gPSB2YWx1ZS50b1N0cmluZygpLmluZGV4T2YoJy4nKSA+IDAgPyBfb3B0aW9ucy5wcmVjaXNpb24gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLmZvcm1hdCA9IFwiJXMldlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHYgPj0gMTApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgX29wdGlvbnMucHJlY2lzaW9uID0gdmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCcuJykgPiAwID8gX29wdGlvbnMucHJlY2lzaW9uIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBfb3B0aW9ucy5mb3JtYXQgPSBcIiVzJXZcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBhY2NvdW50aW5nLmZvcm1hdE1vbmV5KHZhbHVlLCBfb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdNb25leVwiKS5maWx0ZXIoXCJtb25leVwiLCBNb25leUZpbHRlcik7XHJcbn0iXX0=