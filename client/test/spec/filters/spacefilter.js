'use strict';

describe('Filter: spacefilter', function () {

  // load the filter's module
  beforeEach(module('nightwalkerApp'));

  // initialize a new instance of the filter before each test
  var spacefilter;
  beforeEach(inject(function ($filter) {
    spacefilter = $filter('spacefilter');
  }));

  it('should return the input prefixed with "spacefilter filter:"', function () {
    var text = 'angularjs';
    expect(spacefilter(text)).toBe('spacefilter filter: ' + text);
  });

});
