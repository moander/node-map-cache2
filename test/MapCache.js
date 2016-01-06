'use strict';

const should = require('should');
const MapCache = require('../index.js');

describe('MapCache2', function () {
    const mkmap = (d) => new MapCache(d).set('a', 'aa').set('b', 'bb').set('c', 'cc', 200);

    it('should have defaultTTL', function () {
        let def = 1000;
        new MapCache().defaultTTL.should.eql(def);
        new MapCache(0).defaultTTL.should.eql(def);
        new MapCache('').defaultTTL.should.eql(def);
        new MapCache(false).defaultTTL.should.eql(def);
        new MapCache(1234).defaultTTL.should.eql(1234);
    });

    it('should validate ttl', function () {
        should.throws(() => new MapCache([]), /number/);
        should.throws(() => new MapCache({}), /number/);
        should.throws(() => new MapCache('1'), /number/);
        should.throws(() => new MapCache(true), /number/);
    })

    it('should have size getter', function () {
        new MapCache().size.should.eql(0);
        mkmap().size.should.eql(3);
    });

    it('should return undefined if not exist', function () {
        should(mkmap().get('d')).be.undefined();
    })

    it('should clear', function () {
        mkmap().clear().size.should.eql(0);
    });

    describe('timeouts', function () {
        this.slow(1000);

        it('should not expire', function (done) {
            let map = mkmap();
            setTimeout(() => {
                map.get('a').should.eql('aa');
                map.get('a', 200).should.eql('aa');
                done();
            }, 100);
        });

        it('should use defaultTTL', function (done) {
            let map = mkmap(50);
            setTimeout(() => {
                should(map.get('a')).be.undefined();
                done();
            }, 100);
        });
        it('should return undefined if expired', function (done) {
            let map = mkmap();
            setTimeout(() => {
                should(map.get('a', 50)).be.undefined();
                done();
            }, 100);
        });

        it('should clean', function (done) {
            let map = mkmap(50);
            setTimeout(() => {
                map.size.should.eql(3);
                map.clean();
                map.size.should.eql(1);
                map.get('c').should.eql('cc');
                done();
            }, 100);
        });
    });
    it('should work', function () {
    });
});
