/* global db */
function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

var editionName = 'First Flavors'
var urlName = 'first-flavors'
var totalPairs = 120

var pantGenerics = {
  type: 'pants',
  name: 'chinos',
  edition: editionName,
  urlEdition: urlName,
  flavors: [
    'cherry',
    'nectarine',
    'lemon',
    'apple',
    'electricity',
    'plum crazy',
    'powder',
    'proton powder'
  ],
  msrp: 6900,
  description: `The ${editionName} Original Chino`,
  aboutSpecific: `Designed in Portland, OR USA these are NightWalker's flagship chino pants. Only ${totalPairs} exist`,
  careInstructions: 'Machine wash cold and hang dry',
  sizeInfo: `True to size: The model is 5'10", 150 lbs and is wearing a size 30×30. Click here for sizing information`,
  details: ['Metal zippers on every pocket', 'Checkered under cuff', 'Tuxedo belt clasps', 'True to size', '97% cotton, 3% polyester', 'Free shipping']
}

var edition = {
  name: editionName,
  urlName: urlName,
  kind: 'clothing',
  members: {
    chinos: pantGenerics
  }
}

var sizeInformation = [
  {
    'Listed Size': '30×30',
    'Waist': '14.5',
    'Inseam': '29.5',
    'Front Rise': '10',
    'Thigh': '11',
    'Knee': '8',
    'Leg Opening': '7.5'
  },
  {
    'Listed Size': '32×32',
    'Waist': '15.5',
    'Inseam': '31.5',
    'Front Rise': '9.5',
    'Thigh': '11',
    'Knee': '8.25',
    'Leg Opening': '8'
  },
  {
    'Listed Size': '34×32',
    'Waist': '16',
    'Inseam': '31.5',
    'Front Rise': '10.5',
    'Thigh': '10.5',
    'Knee': '8.5',
    'Leg Opening': '8'
  },
  {
    'Listed Size': '34×34',
    'Waist': '18.25',
    'Inseam': '33',
    'Front Rise': '10.5',
    'Thigh': '11',
    'Knee': '9',
    'Leg Opening': '8'
  },
  {
    'Listed Size': '36×32',
    'Waist': '18',
    'Inseam': '32.5',
    'Front Rise': '10.5',
    'Thigh': '11.5',
    'Knee': '9',
    'Leg Opening': '8.5'
  },
  {
    'Listed Size': '36×36',
    'Waist': '18.7',
    'Inseam': '35',
    'Front Rise': '11',
    'Thigh': '11',
    'Knee': '9.35',
    'Leg Opening': '8.5'
  },
  {
    'Listed Size': '38×36',
    'Waist': '18.8',
    'Inseam': '36',
    'Front Rise': '11',
    'Thigh': '11.5',
    'Knee': '9.5',
    'Leg Opening': '9'
  }
]

var flavors = [
  {
    flavor: 'cherry',
    extraDetails: ['Made with a soft yet strong fabric'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '1'
  },
  {
    flavor: 'nectarine',
    extraDetails: ['Made with our most durable fabric'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '2'
  },
  {
    flavor: 'lemon',
    extraDetails: ['Made with our most durable fabric'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '3'
  },
  {
    flavor: 'apple',
    extraDetails: ['Made with a comfotable and durable fabric'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '4'
  },
  {
    flavor: 'electricity',
    extraDetails: ['Made with a soft and strong fabric'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '5'
  },
  {
    flavor: 'plum crazy',
    extraDetails: ['Made with a fabric that hangs "just right"'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '6'
  },
  {
    flavor: 'powder',
    extraDetails: ['Made with a soft yet strong fabric'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '7'
  },
  {
    flavor: 'proton powder',
    extraDetails: ['Made with a soft yet strong fabric'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '8'
  }
]

var flavorsPerSize = {
  '30×30': {
    'waistSize': 30,
    'inseam': 30,
    'cherry': 9,
    'nectarine': 11,
    'lemon': 10,
    'apple': 10,
    'electricity': 9,
    'plum crazy': 12,
    'powder': 5,
    'proton powder': 0
  },
  '32×32': {
    'waistSize': 32,
    'inseam': 32,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum crazy': 99,
    'powder': 25,
    'proton powder': 66
  },
  '34×32': {
    'waistSize': 34,
    'inseam': 32,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum crazy': 99,
    'powder': 25,
    'proton powder': 66
  },
  '34×34': {
    'waistSize': 34,
    'inseam': 34,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum crazy': 99,
    'powder': 25,
    'proton powder': 66
  },
  '36×32': {
    'waistSize': 36,
    'inseam': 32,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum crazy': 99,
    'powder': 25,
    'proton powder': 66
  },
  '36×36': {
    'waistSize': 36,
    'inseam': 36,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum crazy': 99,
    'powder': 25,
    'proton powder': 66
  },
  '38×36': {
    'waistSize': 38,
    'inseam': 36,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum crazy': 99,
    'powder': 25,
    'proton powder': 66
  }
}

// Things that should only be added to the individual product
var currentPrice = 6900
var editionIndex = '1'
var detailsToTransfer = ['msrp', 'description', 'aboutSpecific', 'careInstructions', 'sizeInfo']
// For every flavor
for (var h = 0; h < flavors.length; h++) {
  // For every size
  for (var size in flavorsPerSize) {
    // Get the total number of units in this size
    for (var i = 0; i < flavorsPerSize[size][flavors[h].flavor]; i++) {
      // Clone all basic details
      var waistSize = size.substring(0, 2)
      var inseam = size.substring(3)
      var flavorIndex = flavors[h].flavorIndex
      var item = JSON.parse(JSON.stringify(flavors[h]))

      // Add size information
      item.sizeInformation = sizeInformation

      // Set properties from selected pantGenerics
      for (var detail of detailsToTransfer) {
        item[detail] = pantGenerics[detail]
      }

      // Add extraDetails
      for (var extraDetail of pantGenerics['details']) {
        item['extraDetails'].push(extraDetail)
      }

      // Set sizes property
      item.sizes = {
        waistSize,
        inseam
      }

      // Add SKU
      item.sku = editionIndex + flavorIndex + waistSize + inseam
      item.currentPrice = currentPrice
      item.urlFlavor = item['flavor'].replace(' ', '-')
      item.shortDescription = 'First Flavors Chinos in ' + toTitleCase(flavors[h].flavor)
      item.distinctSizes = Object.keys(flavorsPerSize)
      db.products.insert(item)
    }
  }
}

db.editions.insert(edition)
