module MoneyModule {
    declare var accounting: any;
    declare var currency: any;

    module MoneyFiltersModule {
        export interface IMoneyFilter {
            filter(value: any, code?: string, options?: any): string
        }

        class MoneyFilter implements IMoneyFilter {
            filter(value: any, code?: string, options?: any): string {
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
            }
        }
        
        Angular.module("ngMoney").filter("money", MoneyFilter);
    }
}