/// <reference path="../typings/main.d.ts" />
declare module MoneyModule {
    interface IMoneyInputController {
        value: string;
        currency: string;
        money: string;
        symbol: string;
    }
    interface IMoneyInputView {
        setViewValue(value: any): void;
    }
}
