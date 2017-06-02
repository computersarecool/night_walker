'use strict';

/* global db */
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var editionName = 'First Flavors';
var urlName = 'first-flavors';
var totalPairs = 120;

var pantGenerics = {
  type: 'pants',
  name: 'chinos',
  edition: editionName,
  urlEdition: urlName,
  flavors: ['cherry', 'nectarine', 'lemon', 'apple', 'electricity', 'plum crazy', 'powder', 'proton powder'],
  msrp: 6900,
  description: 'The ' + editionName + ' Original Chino',
  aboutSpecific: 'Designed in Portland, OR USA these are NightWalker\'s flagship chino pants. Only ' + totalPairs + ' exist',
  careInstructions: 'Machine wash cold and hang dry',
  sizeInfo: 'True to size: The model is 5\'10", 150 lbs and is wearing a size 30x30. Click here for sizing information',
  details: ['Metal zippers on every pocket', 'Checkered under cuff', 'Tuxedo belt clasps', 'True to size', '97% cotton, 3% polyester', 'Free shipping']
};

var edition = {
  name: editionName,
  urlName: urlName,
  kind: 'clothing',
  members: {
    chinos: pantGenerics
  }
};

var sizeInformation = [{
  'Listed Size': '30x30',
  'Waist': '14.5',
  'Inseam': '30',
  'Front Rise': '10',
  'Thigh': '11',
  'Knee': '8',
  'Leg Opening': '7.5'
}, {
  'Listed Size': '32x32',
  'Waist': '15.5',
  'Inseam': '31',
  'Front Rise': '9.5',
  'Thigh': '11',
  'Knee': '8.25',
  'Leg Opening': '8'
}, {
  'Listed Size': '34x32',
  'Waist': '16',
  'Inseam': '32',
  'Front Rise': '10.5',
  'Thigh': '10.5',
  'Knee': '8.5',
  'Leg Opening': '8'
}, {
  'Listed Size': '34x34',
  'Waist': '18.25',
  'Inseam': '33.5',
  'Front Rise': '10.5',
  'Thigh': '11',
  'Knee': '9',
  'Leg Opening': '8'
}, {
  'Listed Size': '36x32',
  'Waist': '18',
  'Inseam': '31',
  'Front Rise': '10.5',
  'Thigh': '11.5',
  'Knee': '9',
  'Leg Opening': '8.5'
}, {
  'Listed Size': '36x36',
  'Waist': '18.7',
  'Inseam': '35',
  'Front Rise': '11',
  'Thigh': '11',
  'Knee': '9.35',
  'Leg Opening': '8.5'
}, {
  'Listed Size': '38x36',
  'Waist': '18.8',
  'Inseam': '35',
  'Front Rise': '11',
  'Thigh': '11.5',
  'Knee': '9.5',
  'Leg Opening': '9'
}];

var flavors = [{
  flavor: 'cherry',
  extraDetails: ['Made with a soft yet strong fabric'],
  flavorIndex: '1'
}, {
  flavor: 'nectarine',
  extraDetails: ['Made with our most durable fabric'],
  flavorIndex: '2'
}, {
  flavor: 'lemon',
  extraDetails: ['Made with our most durable fabric'],
  flavorIndex: '3'
}, {
  flavor: 'apple',
  extraDetails: ['Made with a comfotable and durable fabric'],
  flavorIndex: '4'
}, {
  flavor: 'electricity',
  extraDetails: ['Made with a soft and strong fabric'],
  flavorIndex: '5'
}, {
  flavor: 'plum crazy',
  extraDetails: ['Made with a fabric that hangs "just right"'],
  flavorIndex: '6'
}, {
  flavor: 'powder',
  extraDetails: ['Made with a soft yet strong fabric'],
  flavorIndex: '7'
}, {
  flavor: 'proton powder',
  extraDetails: ['Made with a soft yet strong fabric'],
  flavorIndex: '8'
}];

var flavorsPerSize = {
  '30x30': {
    'waistSize': 30,
    'inseam': 30,
    'cherry': 9,
    'nectarine': 11,
    'lemon': 10,
    'apple': 10,
    'electricity': 10,
    'plum crazy': 12,
    'powder': 5,
    'proton powder': 0
  },
  '32x32': {
    'waistSize': 32,
    'inseam': 32,
    'cherry': 13,
    'nectarine': 11,
    'lemon': 12,
    'apple': 10,
    'electricity': 10,
    'plum crazy': 13,
    'powder': 1,
    'proton powder': 10
  },
  '34x32': {
    'waistSize': 34,
    'inseam': 32,
    'cherry': 14,
    'nectarine': 14,
    'lemon': 14,
    'apple': 10,
    'electricity': 12,
    'plum crazy': 14,
    'powder': 10,
    'proton powder': 4
  },
  '34x34': {
    'waistSize': 34,
    'inseam': 34,
    'cherry': 8,
    'nectarine': 7,
    'lemon': 8,
    'apple': 7,
    'electricity': 7,
    'plum crazy': 7,
    'powder': 25,
    'proton powder': 7
  },
  '36x32': {
    'waistSize': 36,
    'inseam': 32,
    'cherry': 4,
    'nectarine': 8,
    'lemon': 4,
    'apple': 4,
    'electricity': 7,
    'plum crazy': 3,
    'powder': 2,
    'proton powder': 1
  },
  '36x36': {
    'waistSize': 36,
    'inseam': 36,
    'cherry': 5,
    'nectarine': 6,
    'lemon': 4,
    'apple': 4,
    'electricity': 6,
    'plum crazy': 6,
    'powder': 4,
    'proton powder': 2
  },
  '38x36': {
    'waistSize': 38,
    'inseam': 36,
    'cherry': 3,
    'nectarine': 5,
    'lemon': 4,
    'apple': 4,
    'electricity': 6,
    'plum crazy': 0,
    'powder': 4,
    'proton powder': 2
  }

  // Things that should only be added to the individual product
};var currentPrice = 6900;
var editionIndex = '1';
var detailsToTransfer = ['msrp', 'description', 'aboutSpecific', 'careInstructions', 'sizeInfo'];
// For every flavor
for (var h = 0; h < flavors.length; h++) {
  // For every size
  for (var size in flavorsPerSize) {
    // Get the total number of units in this size
    for (var i = 0; i < flavorsPerSize[size][flavors[h].flavor]; i++) {
      // Clone all basic details
      var waistSize = size.substring(0, 2);
      var inseam = size.substring(3);
      var flavorIndex = flavors[h].flavorIndex;
      var item = JSON.parse(JSON.stringify(flavors[h])

      // Add size information
      );item.sizeInformation = sizeInformation;

      // Set properties from selected pantGenerics
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = detailsToTransfer[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var detail = _step.value;

          item[detail] = pantGenerics[detail];
        }

        // Add extraDetails
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = pantGenerics['details'][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var extraDetail = _step2.value;

          item['extraDetails'].push(extraDetail);
        }

        // Set sizes property
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      item.sizes = {
        waistSize: waistSize,
        inseam: inseam

        // Add SKU
      };item.sku = editionIndex + flavorIndex + waistSize + inseam;
      item.currentPrice = currentPrice;
      item.urlFlavor = item['flavor'].replace(' ', '-');
      item.shortDescription = 'First Flavors Chinos in ' + toTitleCase(flavors[h].flavor);
      item.distinctSizes = Object.keys(flavorsPerSize);
      db.products.insert(item);
    }
  }
}

db.editions.insert(edition);
