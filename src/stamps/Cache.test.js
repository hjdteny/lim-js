/* eslint-disable no-console */
const expect = require('chai').expect;
const {expectStrictStamp} = require('./testHelper');

describe('Cache Stamp ', () => {
  const {Cache} = require('./index');

  it('is a Stamp', () => {
    expectStrictStamp(Cache);
  });

  describe('when inited ', () => {
    it('will return a Stamp', () => {
      expectStrictStamp(Cache());
    });

    it('with no parameter, return Stamp with default properties(Stamp._cache which contain empty Map)', () => {
      var Stamp = Cache();
      expect(Stamp).to.haveOwnProperty('_cache');
      expect(Stamp._cache).to.be.an('map');
      expect(Stamp._cache.size).to.equal(0);
    });

    it('with improper name, return Stamp with default properties(Stamp._cache which contain empty Map)', () => {
      var Stamp = Cache({name: {'foo': 'bar' }});
      expect(Stamp).to.haveOwnProperty('_cache');
      expect(Stamp._cache).to.be.an('map');
      expect(Stamp._cache.size).to.equal(0);
    });

    it('with supplied name, return Stamp with members of that name, and contain empty Map', () => {
      var Stamp = Cache({name: 'buffer'});
      expect(Stamp).to.haveOwnProperty('buffer');
      expect(Stamp.buffer).to.be.an('map');
      expect(Stamp.buffer.size).to.equal(0);
    });

    it('with invalid cache, return Stamp where cache would be by default an empty Map', () => {
      var Stamp = Cache({cache: Number(128) });
      expect(Stamp).to.haveOwnProperty('_cache');
      expect(Stamp._cache).to.be.an('map');
      expect(Stamp._cache.size).to.equal(0);
    });

    it('with supplied cache, return Stamp where cache === supplied cache', () => {
      var cache = new Map();
      cache.set('a',1);
      var Stamp = Cache({cache});
      expect(Stamp).to.haveOwnProperty('_cache');
      expect(Stamp._cache).to.deep.equal(cache);
    });

    it('with supplied cache and name, return Stamp with that name properties that contain cache === supplied cache', () => {
      var name= 'foo', cache = new Map();
      cache.set('a',2);
      var Stamp = Cache({name, cache});
      expect(Stamp).to.haveOwnProperty(name);
      expect(Stamp[name]).to.deep.equal(cache);
    });
  });
});
