module MoneyModule {
    declare var accounting: any;
    declare var currency: any;

    module MoneyFiltersModule {
        export interface IMoneyFilter {
            filter(value: any, code?: string, options?: any): string
        }

        export class MoneyFilter implements IMoneyFilter {
            private static defaultOptions: any;

            public static configure(defaultOptions: any) {
                MoneyFilter.defaultOptions = defaultOptions;
            }

            filter(value: any, code?: string, options?: any): string {
                if (value == null || angular.isString(value) && value.trim().length === 0)
                    return "";

                var _options: any = {
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

                _options = {
                    ..._options,
                    ...(MoneyFilter.defaultOptions || {}),
                    ...options
                }

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

                    else if(v >= 100) {
                        value = v;
                        _options.precision = value.toString().indexOf('.') > 0 ? _options.precision : 0;
                        _options.format = "%s%v";
                    }

                    else if(v >= 10) {
                        value = v;
                        _options.precision = value.toString().indexOf('.') > 0 ? _options.precision : 0;
                        _options.format = "%s%v";
                    }
                }

                _options.symbol = currency.symbolize(code);

                var result = accounting.formatMoney(value, _options);
                return result;
            }
        }
        
        Angular.module("ngMoney").filter("money", MoneyFilter);
    }
}