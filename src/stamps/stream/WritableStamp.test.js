/* eslint-disable no-console */
const expect = require('chai').expect;
const _ = require('lodash');
const {expectStrictStamp} = require('../testHelper');

// TODO
describe.only('WritableStamp ', () => {
  const {WritableStamp} = require('./index');
  const {Writable} = require('stream') || require('readable-stream');

  it.only('is a stamp', () => {
    expectStrictStamp(WritableStamp);
  });

  // structure test
  describe('when inited ', () => {
    var testStream = null,
      benchmarkStream = null;

    beforeEach(() => {
      testStream = benchmarkStream =  null;
    });

    it('by default return a Readable Stream object as per default Readable sepcification', () => {
      testStream = WritableStamp();
      benchmarkStream = new Writable();

      expect(_.isEqual(testStream, benchmarkStream), `found difference: ${_.differenceWith(testStream, benchmarkStream, _.isEqual)}`).to.be.true; // check for value only , no reference check
    });

    it('given parameter will return a Readable Stream with that parameter', () => {
      var testParams = {objectMode: true, decodStrings: true, highWaterMark: 16000 };
      testStream = WritableStamp(testParams);
      benchmarkStream = new Writable(testParams);

      expect(_.isEqual(testStream, benchmarkStream), `found difference: ${_.differenceWith(testStream, benchmarkStream, _.isEqual)}`).to.be.true;
    });
  });

  // functionality test
  describe('return Writable Stream where function: ', () => {
    var testStream = null;
    const {Readable, Writable, Duplex, PassThrough, Transform} = require('stream') || require('readable-stream');

    // test pipe function
    describe('pipe ', ()=> {
      var result = null;
      var testStringData = 'testing';

      beforeEach(() => {
        testStream = WritableStamp({
          decodeStrings: true,
          write(chunk, enc, cb) {}
        });
      });

      it('has the same code as new Readable() Stream .pipe', () => {
        expect(testStream.pipe.toString()).to.equal( (new Readable()).pipe.toString() );
      });

      it('can pipe data to a Writable Stream', ()=> {
        let dest = new Writable({
          write(chunk, encoding, done)  {
            result = Buffer.from(chunk).toString();
            done();
          }
        });

        testStream.pipe(dest);
        testStream.push(testStringData);
        process.nextTick(() => {
          expect(result).to.equal(testStringData);
        });
      });

      it('can pipe data to a Duplex Stream', ()=> {
        let dest = new Duplex({
          write(chunk, encoding, done)  {
            result = Buffer.from(chunk).toString();
            done();
          },
          read() {}
        });

        testStream.pipe(dest);
        testStream.push(testStringData);
        process.nextTick(() => {
          expect(result).to.equal(testStringData);
        });
      });

      it('can pipe data to a Passthrough Stream', ()=> {
        let dest = new PassThrough();
        dest.on('data', (chunk) => {
          result = Buffer.from(chunk).toString();
        });

        testStream.pipe(dest);
        testStream.push(testStringData);
        process.nextTick(() => {
          expect(result).to.equal(testStringData);
        });
      });

      it('can pipe data to a Transform Stream', ()=> {
        let dest = new Transform({
          transform(chunk, encoding, done)  {
            result = Buffer.from(chunk).toString();
            done();
          }
        });

        testStream.pipe(dest);
        testStream.push(testStringData);
        process.nextTick(() => {
          expect(result).to.equal(testStringData);
        });
      });
    });

    // test unpipe function
    describe('unpipe ', () => {

      it('has the same code as new Writable() Stream .unpipe', () => {
        expect(testStream.unpipe.toString()).to.equal( (new Writable()).unpipe.toString() );
      });

      it('remove existing pipe', () => {
        let result = false;
        let dest = new Writable({
          write(chunk, encoding, done)  {
            result = Buffer.from(chunk).toString();
            done();
          }
        });

        readableStream.pipe(dest);
        dest.on('unpipe', (src) => {
          result = src;
        });

        expect(() => readableStream.unpipe(dest)).to.not.throw(Error);
        process.nextTick(() => {
          expect(result).to.equal(readableStream);
          expect(result).to.deep.equal(readableStream);
        });
      })

    });
  })


}) // end of MAIN describe
