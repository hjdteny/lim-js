/* eslint-disable no-console */
const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');

const yamljs = require('yamljs');

describe('extended module', () =>{


  describe ('require', () => {
    // require hook for yamljs and hjson
    require('./index.js').ext.modules.require();

    let testHjson = 'hjsonTest.hjson';
    let testYaml = 'yamlTest.yaml';
    let testYml = 'ymlTest.yml'

    let hjsonData = `
    {
      //comment here
      "type": "hjson",
      "data" : ["hjson", "test"] //another comment
    }`;
    hjsonData.trim();

    let yamlData = yamljs.stringify({
      type: "yaml",
      data : ["yaml", "test"]
    });
    yamlData = "# YAML comment here\n" + yamlData.trim();

    before( () =>  {
      // create test file for testing
      try{
        fs.writeFileSync(path.join(__dirname, testHjson), hjsonData, {encoding: 'utf-8'});
        fs.writeFileSync(path.join(__dirname, testYaml), yamlData, {encoding: 'utf-8'});
        fs.writeFileSync(path.join(__dirname, testYml), yamlData, {encoding: 'utf-8'});
      } catch(err) {
        console.error(err);
        process.exit(1);
      }
    });

    it('can load .hjson', () => {
      let obj = require(path.resolve(__dirname, testHjson));
      expect(Object.keys(obj).length).to.equal(2);

      expect(obj.type).to.equal('hjson');
      expect(obj.data[0]).to.equal("hjson");
      expect(obj.data[1]).to.equal("test");
    });

    it('can load .yaml', () => {
      let obj = require(path.resolve(__dirname, testYaml));
      expect(Object.keys(obj).length).to.equal(2);

      expect(obj.type).to.equal('yaml');
      expect(obj.data[0]).to.equal("yaml");
      expect(obj.data[1]).to.equal("test");
    });

    it('can load .yml', () => {
      let obj = require(path.resolve(__dirname, testYml));
      expect(Object.keys(obj).length).to.equal(2);

      expect(obj.type).to.equal('yaml');
      expect(obj.data[0]).to.equal("yaml");
      expect(obj.data[1]).to.equal("test");
    });

    after(() => {
     fs.unlinkSync(path.resolve(__dirname,testHjson));
     fs.unlinkSync(path.resolve(__dirname,testYaml));
     fs.unlinkSync(path.resolve(__dirname,testYml));
    })
  })

})
