# Description
This library attempt to overcome some basic shortcoming of Javascript ES6 and making coding in Nodejs + ES6 much more nicer and pleasant, and making code more readable & standardised.

## Problems to solve (TODO)
The list of problems:
* ~~Extending module.require to be able to load .hjson file~~
  ~~This allow us to use comment inside a json object which mitigate the need for complex YAML file at some cases~~
* ~~Extending module.require to be able to load .yaml file~~
  ~~This nice extension will shorten the code for reading the YAML file~~
* Introduce standardised custom message format to be used in inter-communication between streaming object
* Introduce some characteristics when defining class,e.g:
  - Traceable: child class should be traceable by parent class
* Extending necessary third party libraries to allow extended feature
  - jspack: add bitarray and enumareated data type
  - object-hash: add functionality to filter keys with undefined/falsy value (e.g: undefined, empty string, null)
* Introduce a Validator model, that allows validation of an object/parameters with standardised response
* Better error logging system that gives more meaningful stack trace for debugging purpose
* Extend native Object modules.
  - Merging 2 json and create new copy

The list goes on. It will get longer and properly documented as more works are added in.

## Code Standard
The requirements for code standard are:
- No code requiring Transpilation should be included in this library. All codes are to be written in POJ (Plain Old Javascript) as allowed as possible working ES6 features in NodeJS 0.8.x
- Minimum working guaranteed Node environment should be NodeJS 0.8.x
- Should work in both Windows and Linux system
- Indentation & code styling is specified in .editorconfig. Anyone working on this library should use editorconfig enabled Text Editor / IDE

## Core Library Content
* Extensions
  - Module
    - add extension hook for require to handle .yaml, .yml, .hjson
