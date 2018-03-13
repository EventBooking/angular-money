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
declare module MoneyModule {
    interface IMoneyFilter {
        filter(value: any, code?: string, options?: any): string;
    }
    class MoneyFilter implements IMoneyFilter {
        private static defaultOptions;
        private static defaultCode;
        static configure(defaultCode: string, defaultOptions?: any): void;
        filter(value: any, code?: string, options?: any): string;
    }
}
