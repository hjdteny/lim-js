/* eslint-disable no-console */
const expect = require('chai').expect;
const _ = require('lodash');
const {expectStrictStamp} = require('../testHelper');

describe('ReadableStamp ', () => {
  const {ReadableStamp} = require('./index');
  const {Readable} = require('stream') || require('readable-stream');

  it('is a stamp', () => {
    expectStrictStamp(ReadableStamp);
  });

  // structure test
  describe('when inited ', () => {
    it('by default return a Readable Stream object as per default Readable sepcification', () => {
      var readableStream = ReadableStamp();
      var defaultStream = new Readable();

      expect(_.isEqual(readableStream, defaultStream)).to.be.true; // check for value only , no reference check
    });

    it('given parameter will return a Readable Stream with that parameter', () => {
      var testParams = {objectMode: true, encoding: 'ascii', highWaterMark: 16000 };
      var readableStream = ReadableStamp(testParams);
      var defaultStream = new Readable(testParams);

      expect(_.isEqual(readableStream, defaultStream), `found difference: ${_.differenceWith(readableStream, defaultStream, _.isEqual)}`).to.be.true;
    });

    it('given parameter will return a Readable Stream with that parameter', () => {
      var testParams = {objectMode: true, encoding: 'ascii', highWaterMark: 16000 };
      var readableStream = ReadableStamp(testParams);
      var defaultStream = new Readable(testParams);

      expect(_.isEqual(readableStream, defaultStream)).to.be.true;
    });
  });

  // functionality test
  describe('return Readable Stream where function: ', () => {
    var readableStream = null;
    const {Readable, Writable, Duplex, PassThrough, Transform} = require('stream') || require('readable-stream');

    // test pipe function
    describe('pipe ', ()=> {
      var result = null;
      var testStringData = 'testing';

      beforeEach(() => {
        readableStream = ReadableStamp({
          encoding: 'utf-8',
          read() {}
        });
      });

      it('has the same code as new Readable() Stream .pipe', () => {
        expect(readableStream.pipe.toString()).to.equal( (new Readable()).pipe.toString() );
      });

      it('can pipe data to a Writable Stream', ()=> {
        let dest = new Writable({
          write(chunk, encoding, done)  {
            result = Buffer.from(chunk).toString();
            done();
          }
        });

        readableStream.pipe(dest);
        readableStream.push(testStringData);
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

        readableStream.pipe(dest);
        readableStream.push(testStringData);
        process.nextTick(() => {
          expect(result).to.equal(testStringData);
        });
      });

      it('can pipe data to a Passthrough Stream', ()=> {
        let dest = new PassThrough();
        dest.on('data', (chunk) => {
          result = Buffer.from(chunk).toString();
        });

        readableStream.pipe(dest);
        readableStream.push(testStringData);
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

        readableStream.pipe(dest);
        readableStream.push(testStringData);
        process.nextTick(() => {
          expect(result).to.equal(testStringData);
        });
      });
    });

    // test unpipe function
    describe('unpipe ', () => {

      it('has the same code as new Readable() Stream .unpipe', () => {
        expect(readableStream.unpipe.toString()).to.equal( (new Readable()).unpipe.toString() );
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
