'use strict';

describe('Filter: underscoreFilter', function () {

  // load the filter's module
  beforeEach(module('nightwalkerApp'));

  // initialize a new instance of the filter before each test
  var underscoreFilter;
  beforeEach(inject(function ($filter) {
    underscoreFilter = $filter('underscoreFilter');
  }));

  it('should return the input prefixed with "underscoreFilter filter:"', function () {
    var text = 'angularjs';
    expect(underscoreFilter(text)).toBe('underscoreFilter filter: ' + text);
  });

});
