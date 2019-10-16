# Description
This library attempt to overcome some basic shortcoming of Javascript ES6 and making coding in Nodejs + ES6 much more nicer and pleasant, and making code more readable & standardised.

## Problems to solve (TODO)
The list of problems:
* ~~Extending module.require to be able to load .hjson file~~
  ~~This allow us to use comment inside a json object which mitigate the need for complex YAML file at some cases~~
* ~~Extending module.require to be able to load .yaml file~~
  ~~This nice extension will shorten the code for reading the YAML file~~
* Introduce standardised custom message format to be used in inter-communication between streaming object
* Introduce some characteristics when defining class (implement by stamp),e.g:
  - ~~Traceable: child class should be traceable by parent class~~
  - Manager: be able to manage and configure instance of child class
  - Stream:
    - Extension on 4 basic stream, e.g: demultiplexer, mutliplexer, conditional stream.
* Extending necessary third party libraries to allow extended feature
  - jspack: add bitarray and enumareated data type
  - object-hash: add functionality to filter keys with undefined/falsy value (e.g: undefined, empty string, null)
* Introduce a Validator model, that allows validation of an object/parameters with standardised response
* Introduce generic data converter with compatiblity with C ,Javascript and SQL data type
* Add basic service Stamp that can be populated, modularised and configurable during runtime
* Better error logging system that gives more meaningful stack trace for debugging purpose
* Extend native Object modules.
  - Merging 2 json and create new copy

The list goes on. It will get longer and properly documented as more works are added in.

## Code Standard
The requirements for code standard are:
- Code in this library must not require transpilation to work. All codes are to be written in POJ (Plain Old Javascript) as allowed as possible working ES6 features in NodeJS 0.8.x
- Minimum working guaranteed Node environment should be NodeJS 0.8.x
- Should work in both Windows and Linux system
- Indentation & code styling is specified in .editorconfig. Anyone working on this library should use editorconfig enabled Text Editor / IDE

## Core Library Content
* ### Extensions
  - Module
    - add extension hook for require to handle .yaml, .yml, .hjson

* Stamp

  In lieu of ES6 class deficiencies e.g: mixin does not copy static properties, no direct support for multiple inheritance, we will  use stampit to implement multiple characteristics. They are:
  - Cache
    - enable the creation of custom stamp with builtin cache
  - Traceable
    - extended from Cache. It allows creation of parent Stamp(composed from Traceable) to be able to have its child stamp registered by parent stamp. Child stamp IS required to register itself within the stamp definition when required
