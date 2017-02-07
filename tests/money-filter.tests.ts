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

    it('2000 returns $2K when abbreviated', () => {
        var filter = $filter<any>('money');

        var value = 2000;
        var currency = 'USD';
        var options = {
            abbrev: true
        };
        var result = filter(value, currency, options);

        chai.expect(result).to.equal("$2K");
    });

    it('25000 returns $25K when abbreviated', () => {
        var filter = $filter<any>('money');

        var value = 25000;
        var currency = 'USD';
        var options = {
            abbrev: true
        };
        var result = filter(value, currency, options);

        chai.expect(result).to.equal("$25K");
    });

    it('2500 returns $2.5K when abbreviated', () => {
        var filter = $filter<any>('money');

        var value = 2500;
        var currency = 'USD';
        var options = {
            abbrev: true
        };
        var result = filter(value, currency, options);

        chai.expect(result).to.equal("$2.5K");
    });
    
    it('250 returns $250 when abbreviated', () => {
        var filter = $filter<any>('money');

        var value = 250;
        var currency = 'USD';
        var options = {
            abbrev: true
        };
        var result = filter(value, currency, options);

        chai.expect(result).to.equal("$250");
    });

    it('25 returns $25 when abbreviated', () => {
        var filter = $filter<any>('money');

        var value = 25;
        var currency = 'USD';
        var options = {
            abbrev: true
        };
        var result = filter(value, currency, options);

        chai.expect(result).to.equal("$25");
    });

    it('25.25 returns $25.25 when abbreviated', () => {
        var filter = $filter<any>('money');

        var value = 25.25;
        var currency = 'USD';
        var options = {
            abbrev: true
        };
        var result = filter(value, currency, options);

        chai.expect(result).to.equal("$25.25");
    });

    it('-0.0001 returns $0.00 (fails)', () => {
        var filter = $filter<any>('money');

        var value = -0.0001;
        var currency = 'USD';
        var result = filter(value, currency);

        chai.expect(result).to.equal("$0.00");
    });
    
    it('Sequential passes using same options object succeed', () => {
        var filter = $filter<any>('money');

        var currency = 'USD';
        var options = {
            abbrev: true
        };
        
        var result = filter(2500, currency, options);
        chai.expect(result).to.equal("$2.5K");

        var result = filter(250, currency, options);
        chai.expect(result).to.equal("$250");
    });
});