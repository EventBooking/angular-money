/// <reference path="../typings/main.d.ts"/>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1tb25leS5kZWJ1Zy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiLCIuLi9zcmMvbW9uZXktaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNENBQTRDO0FBQzVDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FDRDlCLElBQU8sV0FBVyxDQStHakI7QUEvR0QsV0FBTyxXQUFXLEVBQUMsQ0FBQztJQVloQjtRQUNJO1FBQ0EsQ0FBQztRQUVELHFDQUFNLEdBQU4sVUFBTyxJQUFxQjtZQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBSUQsc0JBQUksMENBQVE7aUJBQVo7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQztpQkFFRCxVQUFhLEtBQWE7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztvQkFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELENBQUM7OztXQVJBO1FBWUQsc0JBQUksdUNBQUs7aUJBQVQ7Z0JBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFFRCxVQUFVLEtBQWE7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsQ0FBQzs7O1dBTEE7UUFPTyxzQ0FBTyxHQUFmLFVBQWdCLEtBQUs7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFFbEIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztnQkFDZCxNQUFNLENBQUM7WUFFWCxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUN2QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO1lBRUgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBS0wsMkJBQUM7SUFBRCxDQUFDLEFBbkRELElBbURDO0lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFNekU7UUFHSTtZQUhKLGlCQXFDQztZQWhDRyxhQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ2YsWUFBTyxHQUFHLFNBQVMsQ0FBQztZQUNwQixlQUFVLEdBQUcsb0JBQW9CLENBQUM7WUFDbEMsaUJBQVksR0FBRyxZQUFZLENBQUM7WUFDNUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLFVBQUssR0FBRztnQkFDSixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsUUFBUSxFQUFFLEdBQUc7YUFDaEIsQ0FBQztZQUVGLFNBQUksR0FBRyxVQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFdBQVc7Z0JBQ3pDLElBQUksS0FBSyxHQUF5QixNQUFNLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUU1RCxRQUFRLENBQUMsRUFBRSxDQUFDLFVBQVEsTUFBTSxDQUFDLEdBQUssRUFBRTtvQkFDOUIsS0FBSyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUMxQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtvQkFDbkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFRLE1BQU0sQ0FBQyxHQUFLLENBQUMsQ0FBQztnQkFDdkMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxJQUFJLEdBQW9CO29CQUN4QixZQUFZLFlBQUMsS0FBSzt3QkFDZCxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUNqQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQzFCLENBQUM7aUJBQ0osQ0FBQTtnQkFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQztRQS9CYyxDQUFDO1FBRlYsMkJBQU8sR0FBRyxFQUFFLENBQUM7UUFvQ3hCLDBCQUFDO0lBQUQsQ0FBQyxBQXJDRCxJQXFDQztJQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBQzNFLENBQUMsRUEvR00sV0FBVyxLQUFYLFdBQVcsUUErR2pCIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvbWFpbi5kLnRzXCIvPlxyXG5Bbmd1bGFyLm1vZHVsZShcIm5nTW9uZXlcIiwgW10pOyIsIm1vZHVsZSBNb25leU1vZHVsZSB7XHJcblxyXG4gICAgZGVjbGFyZSB2YXIgYWNjb3VudGluZzogYW55O1xyXG4gICAgZGVjbGFyZSB2YXIgY3VycmVuY3k6IGFueTtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElNb25leUlucHV0Q29udHJvbGxlciB7XHJcbiAgICAgICAgdmFsdWU6IHN0cmluZztcclxuICAgICAgICBjdXJyZW5jeTogc3RyaW5nO1xyXG4gICAgICAgIG1vbmV5OiBzdHJpbmc7XHJcbiAgICAgICAgc3ltYm9sOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTW9uZXlJbnB1dENvbnRyb2xsZXIgaW1wbGVtZW50cyBJTW9uZXlJbnB1dENvbnRyb2xsZXIge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25Jbml0KHZpZXc6IElNb25leUlucHV0Vmlldykge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXcodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9jdXJyZW5jeTogc3RyaW5nO1xyXG5cclxuICAgICAgICBnZXQgY3VycmVuY3koKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbmN5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0IGN1cnJlbmN5KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3VycmVuY3kgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3ltYm9sID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnN5bWJvbCA9IGN1cnJlbmN5LnN5bWJvbGl6ZSh0aGlzLmN1cnJlbmN5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX3ZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IGFjY291bnRpbmcudW5mb3JtYXQodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXcodGhpcy5fdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZXRWaWV3KHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9uZXkgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1vbmV5ID0gYWNjb3VudGluZy5mb3JtYXRNb25leSh2YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgc3ltYm9sOiB0aGlzLnN5bWJvbFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpZXcgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMudmlldy5zZXRWaWV3VmFsdWUodGhpcy5tb25leSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb25leTogc3RyaW5nO1xyXG4gICAgICAgIHN5bWJvbDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgdmlldzogSU1vbmV5SW5wdXRWaWV3O1xyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdNb25leVwiKS5jb250cm9sbGVyKFwibW9uZXlJbnB1dFwiLCBNb25leUlucHV0Q29udHJvbGxlcik7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTW9uZXlJbnB1dFZpZXcge1xyXG4gICAgICAgIHNldFZpZXdWYWx1ZSh2YWx1ZSk6IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTW9uZXlJbnB1dERpcmVjdGl2ZSB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3QgPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7IH1cclxuXHJcbiAgICAgICAgcmVzdHJpY3QgPSAnQSc7XHJcbiAgICAgICAgcmVxdWlyZSA9ICduZ01vZGVsJztcclxuICAgICAgICBjb250cm9sbGVyID0gTW9uZXlJbnB1dENvbnRyb2xsZXI7XHJcbiAgICAgICAgY29udHJvbGxlckFzID0gJ21vbmV5SW5wdXQnO1xyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogJz1tb25leUlucHV0JyxcclxuICAgICAgICAgICAgY3VycmVuY3k6ICdAJ1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxpbmsgPSAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCBuZ01vZGVsQ3RybCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgJGN0cmw6IE1vbmV5SW5wdXRDb250cm9sbGVyID0gJHNjb3BlW3RoaXMuY29udHJvbGxlckFzXTtcclxuXHJcbiAgICAgICAgICAgICRlbGVtZW50Lm9uKGBibHVyLiR7JHNjb3BlLiRpZH1gLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkY3RybC52YWx1ZSA9IG5nTW9kZWxDdHJsLiRtb2RlbFZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQub2ZmKGBibHVyLiR7JHNjb3BlLiRpZH1gKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmlldzogSU1vbmV5SW5wdXRWaWV3ID0ge1xyXG4gICAgICAgICAgICAgICAgc2V0Vmlld1ZhbHVlKHZhbHVlKTogdm9pZCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHNldFZpZXdWYWx1ZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmdNb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkY3RybC5vbkluaXQodmlldyk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIEFuZ3VsYXIubW9kdWxlKFwibmdNb25leVwiKS5kaXJlY3RpdmUoXCJtb25leUlucHV0XCIsIE1vbmV5SW5wdXREaXJlY3RpdmUpO1xyXG59Il19