let chai = require('chai');
chai.config.includeStack = false;
chai.use(require('chai-each'));

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;