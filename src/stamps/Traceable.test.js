/* eslint-disable no-console */
const {expect} = require('chai');
const {expectStrictStamp} = require('./testHelper');

describe.only('Stamp ', () =>{
  describe('Traceable ', () => {
    const {Traceable} = require('./index');
    const basicProperties = ['registerAsChild', 'getAllChilds', '_childs'];

    //private helper
    function checkProperty(_class, props) {
      if (!(props instanceof Array)) props = [props];
      props.forEach( prop => {
        expect(_class).to.have.property(prop);
      })
    }

    it('is a Stamp', () => {
      expectStrictStamp(Traceable);
    });

    describe('when inited ', () => {

      describe('with no parameters ', () => {
        var Stamp = null;

        beforeEach(() => {
          Stamp = Traceable();
        });

        it('will return a Stamp with static properties \'registerAsChild\', \'getAllChilds\', and \'_childs\'', () => {
          expectStrictStamp(Stamp);
          checkProperty(Stamp, basicProperties);
        });

        it('will return Stamp with staticProps (Stamp._childs = new Map())', () => {
          expect(Stamp).to.haveOwnProperty('_childs');
          expect(Stamp._childs).to.be.an.instanceof(Map);
          expect(Stamp._childs.size).to.equal(0);
        });

        it('will return Stamp with getAllChilds() where it will return Stamp._childs',() => {
          expect(Stamp).to.haveOwnProperty('_childs');
          expect(Stamp.getAllChilds()).to.deep.equal(Stamp._childs);
        });

        it('always produces different stamp with different registry ', () => {
          var Stamp2 = Traceable();

          expect(Stamp).to.not.deep.equal(Stamp2);
          expect(Stamp._childs).to.not.equal(Stamp2._childs);// check by reference
        });

      })

      describe('with parameter registry', () => {
        it('will validate registry if it has get & set method, where Stamp._childs = registry, else = new Map()', () => {
          // valid registry
          let validRegistry = { get() {}, set(){} };
          var Stamp1 = Traceable({registry: validRegistry});
          expect(Stamp1._childs).to.deep.equal(validRegistry);

          //invalid registry
          var invalidRegistry = [];
          var Stamp2 = Traceable({registry: invalidRegistry});
          expect(Stamp2._childs).to.not.deep.equal(invalidRegistry);
          expect(Stamp2._childs).to.be.an.instanceof(Map);
          expect(Stamp2._childs.size).to.equal(0);
        });
      });

      it('produce Stamp that can be composed with other Stamp', () => {
        function tryCompose() {
          var Stamp = Traceable();
          Stamp.compose({ props: { name: 'Child1' } })
        }

        expect(tryCompose).to.not.throw();
      });

      describe('produce base Stamp, where child stamp ',() => {
        it('can register self on base Stamp registry', () => {
          var Stamp = Traceable();
          var Child1 = Stamp.compose({
            conf: {value: 1}
          }).registerAsChild('Child1');
          var Child2 = Stamp.compose({
            conf: {value: 2}
          }).registerAsChild('Child2');

          expect(Stamp.getAllChilds().size).to.equal(2);
          expect(Stamp.getAllChilds()).to.include(Child1);
          expect(Stamp.getAllChilds()).to.include(Child2);
          expect(Stamp.getAllChilds().get('Child1')).to.deep.equal(Child1);
          expect(Stamp.getAllChilds().get('Child2')).to.deep.equal(Child2);
        })
      })
    })
  })
});
