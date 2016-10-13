describe('money-filter', () => {

    var $filter: angular.IFilterService;

    beforeEach(angular.mock.module('ngMoney'));
    beforeEach(angular.mock.inject((_$filter_) => {
        $filter = _$filter_;
    }));

    it('0 returns $0.00', () => {
        var filter = $filter<any>('money');

        var value = 0;
        var currency = 'USD';
        var result = filter(value, currency);

        chai.expect(result).to.equal("$0.00");
    });
    
});