Testing Node modules using grunt-jasmine-node
=============================================

To install, run:
```sh
git clone git@github.com:johnbeech/grunt-jasmine-node-example.git
cd grunt-jasmine-node-example
npm install
npm install grunt -g
```

To run Jasmine tests and JS Hint, run:
```
grunt
```

The project should run a couple of Jasmine unit specs against myModule.js, and then run JS Hint successfully.

```sh
Running "jasmine_nodejs:project" (jasmine_nodejs) task
Running /Users/beechj01/workspace/grunt-jasmine-node-example/spec/myModuleSpec.js

>> Executing 2 defined specs...

Test Suites & Specs:

1) Talon Testers
   ✔ should find and md5 my surname
   ✔ should return unknown name

>> Done!


Summary:

Suites:  1 of 1
Specs:   2 of 2
Expects: 2 (0 failures)
Finished in 0.005 seconds

>> Successful!

Running "jshint:gruntfile" (jshint) task
>> 1 file lint free.

Running "jshint:lib_test" (jshint) task
>> 1 file lint free.

Done, without errors.
```

Creating New Modules and Writing Specs
======================================

Create new modules under the lib folder, and use sub folders as appropriate, e.g. `lib/api/statusCode.js`
```js
var instance = function() {};

var knownStatusCodes = {
  "100": "Continue",
  "200": "OK",
  "400": "Bad Request",
  "500": "Internal Server Error"
};

instance.identify = function(code) {
  var statusCode = code || 0;
  var statusMessage = knownStatusCodes[statusCode] || "Unrecognised status code";

  var response = {
    statusCode: statusCode,
    message: statusMessage
  };

  return response;
};

module.exports = instance;

```

And then create a matching Spec file under `spec/api/statusCodeSpec.js`
```js
var statusCodeApi = require('../../lib/api/statusCode');

describe("Status Code API", function() {

  it("should produce a default response", function() {
    var response = statusCodeApi.identify();
    expect(response.statusCode).toBe(0);
    expect(response.message).toBe("Unrecognised status code");
  });

  it("should identify the status code 100 as Continue", function() {
    var response = statusCodeApi.identify(100);
    expect(response.statusCode).toBe(100);
    expect(response.message).toBe("Continue");
  });

  it("should identify the status code 200 as OK", function() {
    var response = statusCodeApi.identify(200);
    expect(response.statusCode).toBe(200);
    expect(response.message).toBe("OK");
  });

  it("should identify the status code 400 as Bad Request", function() {
    var response = statusCodeApi.identify(400);
    expect(response.statusCode).toBe(400);
    expect(response.message).toBe("Bad Request");
  });

  it("should identify the status code 500 as Internal Server Error", function() {
    var response = statusCodeApi.identify(500);
    expect(response.statusCode).toBe(500);
    expect(response.message).toBe("Internal Server Error");
  });

  it("should identify the status code 404 as File not found", function() {
    var response = statusCodeApi.identify(404);
    expect(response.statusCode).toBe(404);
    expect(response.message).toBe("File not found");
  });

});

```

You should then be able to run these tests using `grunt` from the root of the project folder, and you should see this result:
```sh
Running "jasmine_node:all" (jasmine_node) task
Running /Users/beechj01/workspace/grunt-jasmine-node-example/spec/myModuleSpec.js
.....F..

Failures:

  1) Status Code API should identify the status code 404 as File not found
   Message:
     Expected 'Unrecognised status code' to be 'File not found'.
   Stacktrace:
     Error: Expected 'Unrecognised status code' to be 'File not found'.
    at null.<anonymous> (/Users/beechj01/workspace/grunt-jasmine-node-example/spec/api/statusCodeSpec.js:38:30)

Finished in 0.008 seconds
8 tests, 14 assertions, 1 failure, 0 skipped
```

Fix the failing test, and you're good to go!
