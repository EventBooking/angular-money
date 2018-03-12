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
    var MoneyFiltersModule;
    (function (MoneyFiltersModule) {
        var MoneyFilter = /** @class */ (function () {
            function MoneyFilter() {
            }
            MoneyFilter.configure = function (defaultOptions) {
                MoneyFilter.defaultOptions = defaultOptions;
            };
            MoneyFilter.prototype.filter = function (value, code, options) {
                if (value == null || angular.isString(value) && value.trim().length === 0)
                    return "";
                var _options = {
                    precision: accounting.settings.currency.precision
                };
                if (angular.isObject(code)) {
                    _options = code;
                    code = null;
                }
                if (value.amount) {
                    code = value.currency || code;
                    value = value.amount;
                }
                if (!options)
                    options = {};
                _options = __assign({}, _options, (MoneyFilter.defaultOptions || {}), options);
                var v = accounting.unformat(value);
                if (options.abbrev) {
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
                _options.symbol = currency.symbolize(code);
                var result = accounting.formatMoney(value, _options);
                return result;
            };
            return MoneyFilter;
        }());
        MoneyFiltersModule.MoneyFilter = MoneyFilter;
        Angular.module("ngMoney").filter("money", MoneyFilter);
    })(MoneyFiltersModule || (MoneyFiltersModule = {}));
})(MoneyModule || (MoneyModule = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1tb25leS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiLCIuLi9zcmMvbW9uZXktaW5wdXQudHMiLCIuLi9zcmMvbW9uZXktZmlsdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7QUNBOUIsSUFBTyxXQUFXLENBOEdqQjtBQTlHRCxXQUFPLFdBQVc7SUFXZDtRQUNJO1FBQ0EsQ0FBQztRQUVELHFDQUFNLEdBQU4sVUFBTyxJQUFxQjtZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBSUQsc0JBQUksMENBQVE7aUJBQVo7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQztpQkFFRCxVQUFhLEtBQWE7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztvQkFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELENBQUM7OztXQVJBO1FBWUQsc0JBQUksdUNBQUs7aUJBQVQ7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFFRCxVQUFVLEtBQWE7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsQ0FBQzs7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QUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDckQsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQ0wsa0JBQUM7UUFBRCxDQUFDLEFBbEVELElBa0VDO1FBbEVZLDhCQUFXLGNBa0V2QixDQUFBO1FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUMsRUExRU0sa0JBQWtCLEtBQWxCLGtCQUFrQixRQTBFeEI7QUFDTCxDQUFDLEVBL0VNLFdBQVcsS0FBWCxXQUFXLFFBK0VqQiIsInNvdXJjZXNDb250ZW50IjpbIkFuZ3VsYXIubW9kdWxlKFwibmdNb25leVwiLCBbXSk7IiwibW9kdWxlIE1vbmV5TW9kdWxlIHtcclxuICAgIGRlY2xhcmUgdmFyIGFjY291bnRpbmc6IGFueTtcclxuICAgIGRlY2xhcmUgdmFyIGN1cnJlbmN5OiBhbnk7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTW9uZXlJbnB1dENvbnRyb2xsZXIge1xyXG4gICAgICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICAgICAgY3VycmVuY3k6IHN0cmluZztcclxuICAgICAgICBtb25leTogc3RyaW5nO1xyXG4gICAgICAgIHN5bWJvbDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE1vbmV5SW5wdXRDb250cm9sbGVyIGltcGxlbWVudHMgSU1vbmV5SW5wdXRDb250cm9sbGVyIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSW5pdCh2aWV3OiBJTW9uZXlJbnB1dFZpZXcpIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3ID0gdmlldztcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3KHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfY3VycmVuY3k6IHN0cmluZztcclxuXHJcbiAgICAgICAgZ2V0IGN1cnJlbmN5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW5jeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldCBjdXJyZW5jeSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbmN5ID0gdmFsdWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN5bWJvbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zeW1ib2wgPSBjdXJyZW5jeS5zeW1ib2xpemUodGhpcy5jdXJyZW5jeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF92YWx1ZTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBhY2NvdW50aW5nLnVuZm9ybWF0KHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWaWV3KHRoaXMuX3ZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2V0Vmlldyh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vbmV5ID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5tb25leSA9IGFjY291bnRpbmcuZm9ybWF0TW9uZXkodmFsdWUsIHtcclxuICAgICAgICAgICAgICAgIHN5bWJvbDogdGhpcy5zeW1ib2xcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy52aWV3ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXcuc2V0Vmlld1ZhbHVlKHRoaXMubW9uZXkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9uZXk6IHN0cmluZztcclxuICAgICAgICBzeW1ib2w6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHZpZXc6IElNb25leUlucHV0VmlldztcclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTW9uZXlcIikuY29udHJvbGxlcihcIm1vbmV5SW5wdXRcIiwgTW9uZXlJbnB1dENvbnRyb2xsZXIpO1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vbmV5SW5wdXRWaWV3IHtcclxuICAgICAgICBzZXRWaWV3VmFsdWUodmFsdWUpOiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE1vbmV5SW5wdXREaXJlY3RpdmUge1xyXG4gICAgICAgIHN0YXRpYyAkaW5qZWN0ID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgICAgIHJlc3RyaWN0ID0gJ0EnO1xyXG4gICAgICAgIHJlcXVpcmUgPSAnbmdNb2RlbCc7XHJcbiAgICAgICAgY29udHJvbGxlciA9IE1vbmV5SW5wdXRDb250cm9sbGVyO1xyXG4gICAgICAgIGNvbnRyb2xsZXJBcyA9ICdtb25leUlucHV0JztcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyID0gdHJ1ZTtcclxuICAgICAgICBzY29wZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6ICc9bW9uZXlJbnB1dCcsXHJcbiAgICAgICAgICAgIGN1cnJlbmN5OiAnQCdcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBsaW5rID0gKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgbmdNb2RlbEN0cmwpID0+IHtcclxuICAgICAgICAgICAgdmFyICRjdHJsOiBNb25leUlucHV0Q29udHJvbGxlciA9ICRzY29wZVt0aGlzLmNvbnRyb2xsZXJBc107XHJcblxyXG4gICAgICAgICAgICAkZWxlbWVudC5vbihgYmx1ci4keyRzY29wZS4kaWR9YCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGN0cmwudmFsdWUgPSBuZ01vZGVsQ3RybC4kbW9kZWxWYWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50Lm9mZihgYmx1ci4keyRzY29wZS4kaWR9YCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZpZXc6IElNb25leUlucHV0VmlldyA9IHtcclxuICAgICAgICAgICAgICAgIHNldFZpZXdWYWx1ZSh2YWx1ZSk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nTW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGN0cmwub25Jbml0KHZpZXcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBBbmd1bGFyLm1vZHVsZShcIm5nTW9uZXlcIikuZGlyZWN0aXZlKFwibW9uZXlJbnB1dFwiLCBNb25leUlucHV0RGlyZWN0aXZlKTtcclxufSIsIm1vZHVsZSBNb25leU1vZHVsZSB7XHJcbiAgICBkZWNsYXJlIHZhciBhY2NvdW50aW5nOiBhbnk7XHJcbiAgICBkZWNsYXJlIHZhciBjdXJyZW5jeTogYW55O1xyXG5cclxuICAgIG1vZHVsZSBNb25leUZpbHRlcnNNb2R1bGUge1xyXG4gICAgICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vbmV5RmlsdGVyIHtcclxuICAgICAgICAgICAgZmlsdGVyKHZhbHVlOiBhbnksIGNvZGU/OiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBzdHJpbmdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBNb25leUZpbHRlciBpbXBsZW1lbnRzIElNb25leUZpbHRlciB7XHJcbiAgICAgICAgICAgIHByaXZhdGUgc3RhdGljIGRlZmF1bHRPcHRpb25zOiBhbnk7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdGljIGNvbmZpZ3VyZShkZWZhdWx0T3B0aW9uczogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBNb25leUZpbHRlci5kZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmaWx0ZXIodmFsdWU6IGFueSwgY29kZT86IHN0cmluZywgb3B0aW9ucz86IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCB8fCBhbmd1bGFyLmlzU3RyaW5nKHZhbHVlKSAmJiB2YWx1ZS50cmltKCkubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBfb3B0aW9uczogYW55ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWNpc2lvbjogYWNjb3VudGluZy5zZXR0aW5ncy5jdXJyZW5jeS5wcmVjaXNpb25cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3QoY29kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBfb3B0aW9ucyA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPSB2YWx1ZS5jdXJyZW5jeSB8fCBjb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuYW1vdW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucylcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgX29wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4uX29wdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgLi4uKE1vbmV5RmlsdGVyLmRlZmF1bHRPcHRpb25zIHx8IHt9KSxcclxuICAgICAgICAgICAgICAgICAgICAuLi5vcHRpb25zXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHYgPSBhY2NvdW50aW5nLnVuZm9ybWF0KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmFiYnJldikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ID49IDEwMDAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2IC8gMTAwMDAwMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX29wdGlvbnMucHJlY2lzaW9uID0gdmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCcuJykgPiAwID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLmZvcm1hdCA9IFwiJXMldk1cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHYgPj0gMTAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHYgLyAxMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfb3B0aW9ucy5wcmVjaXNpb24gPSB2YWx1ZS50b1N0cmluZygpLmluZGV4T2YoJy4nKSA+IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX29wdGlvbnMuZm9ybWF0ID0gXCIlcyV2S1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih2ID49IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLnByZWNpc2lvbiA9IHZhbHVlLnRvU3RyaW5nKCkuaW5kZXhPZignLicpID4gMCA/IF9vcHRpb25zLnByZWNpc2lvbiA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9vcHRpb25zLmZvcm1hdCA9IFwiJXMldlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih2ID49IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX29wdGlvbnMucHJlY2lzaW9uID0gdmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCcuJykgPiAwID8gX29wdGlvbnMucHJlY2lzaW9uIDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX29wdGlvbnMuZm9ybWF0ID0gXCIlcyV2XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIF9vcHRpb25zLnN5bWJvbCA9IGN1cnJlbmN5LnN5bWJvbGl6ZShjb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gYWNjb3VudGluZy5mb3JtYXRNb25leSh2YWx1ZSwgX29wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBBbmd1bGFyLm1vZHVsZShcIm5nTW9uZXlcIikuZmlsdGVyKFwibW9uZXlcIiwgTW9uZXlGaWx0ZXIpO1xyXG4gICAgfVxyXG59Il19