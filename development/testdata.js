/* global db */
function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

const edition = {
  name: 'First Flavors',
  urlName: 'first-flavors',
  kind: 'clothing',
  members: [
    pantGenerics
  ]
}

db.editions.insert(edition)

const totalPairs = 120
const pantGenerics = {
  type: 'pants,',
  name: 'chinos',
  edition: edition.name,
  urlEdition: edition.urlName,
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
  description: `The ${edition.name} Original Chino`,
  aboutSpecific: `Designed in Portland, OR USA these are NightWalker's flagship chino pants. Only ${totalPairs} exist`,
  careInstructions: 'Machine wash cold and hang dry',
  sizeInfo: `True to size: The model is 5'10", 150 lbs and is wearing a size 30×30. Click here for sizing information`,
  details: ['Metal zippers on every pocket', 'Checkered under cuff', 'Tuxedo belt clasps', 'True to size', '97% cotton, 3% polyester', 'Free shipping']
}

const sizeInformation = [
  {
    'Listed Size': '29×29',
    'Waist': '29',
    'Inseam': '29',
    'Outseam': '30',
    'Rise': '6',
    'Knee': '12',
    'Leg Opening': '5',
    'Pocket Opening': '7',
    'Pocket Depth': '9'
  },
  {
    'Listed Size': '33×33',
    'Waist': '29',
    'Inseam': '29',
    'Outseam': '30',
    'Rise': '6',
    'Knee': '12',
    'Leg Opening': '5',
    'Pocket Opening': '7',
    'Pocket Depth': '9'
  },
  {
    'Listed Size': '38×36',
    'Waist': '29',
    'Inseam': '29',
    'Outseam': '30',
    'Rise': '6',
    'Knee': '12',
    'Leg Opening': '5',
    'Pocket Opening': '7',
    'Pocket Depth': '9'
  },
  {
    'Listed Size': '36×34',
    'Waist': '29',
    'Inseam': '29',
    'Outseam': '30',
    'Rise': '6',
    'Knee': '12',
    'Leg Opening': '5',
    'Pocket Opening': '7',
    'Pocket Depth': '9'
  },
  {
    'Listed Size': '32×30',
    'Waist': '29',
    'Inseam': '29',
    'Outseam': '30',
    'Rise': '6',
    'Knee': '12',
    'Leg Opening': '5',
    'Pocket Opening': '7',
    'Pocket Depth': '9'
  }
]

const flavors = [
  {
    flavor: 'cherry',
    extraDetails: ['Soft Fabric'],
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
    extraDetails: ['Strong fabric'],
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
    extraDetails: ['Durable fabric'],
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
    extraDetails: ['Sleek fabric'],
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
    extraDetails: ['bursoft fabric'],
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
    extraDetails: ['bursoft fabric'],
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
    extraDetails: ['bursoft fabric'],
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
    extraDetails: ['bursoft fabric'],
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: '8'
  }
]

const flavorsPerSize = {
  '30×30': {
    'waistSize': 30,
    'inseam': 30,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum-crazy': 99,
    'powder': 25,
    'proton-powder': 66
  },
  '32×32': {
    'waistSize': 32,
    'inseam': 32,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum-crazy': 99,
    'powder': 25,
    'proton-powder': 66
  },
  '34×32': {
    'waistSize': 34,
    'inseam': 32,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum-crazy': 99,
    'powder': 25,
    'proton-powder': 66
  },
  '34×34': {
    'waistSize': 34,
    'inseam': 34,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum-crazy': 99,
    'powder': 25,
    'proton-powder': 66
  },
  '36×32': {
    'waistSize': 36,
    'inseam': 32,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum-crazy': 99,
    'powder': 25,
    'proton-powder': 66
  },
  '36×36': {
    'waistSize': 36,
    'inseam': 36,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum-crazy': 99,
    'powder': 25,
    'proton-powder': 66
  },
  '38×36': {
    'waistSize': 38,
    'inseam': 36,
    'cherry': 1,
    'nectarine': 5,
    'lemon': 4,
    'apple': 66,
    'electricity': 77,
    'plum-crazy': 99,
    'powder': 25,
    'proton-powder': 66
  }
}

// Things that should only be added to the individual product
const currentPrice = 6900
const editionIndex = '1'
const detailsToTransfer = ['msrp', 'description', 'aboutSpecific', 'careInstructions', 'sizeInfo']
// For every flavor
for (let flavor of flavors) {
  // For every size
  for (let size in flavorsPerSize) {
    // Get the total number of units in this size
    for (let i = 0; i < size[flavor.flavor]; i++) {
      // Clone all basic details
      let {waistSize, inseam} = size
      let {flavorIndex} = flavor
      let item = JSON.parse(JSON.stringify(flavor))

      // Add size information
      item.sizeInformation = sizeInformation

      // Set properties from selected pantGenerics
      for (let detail of detailsToTransfer) {
        item[detail] = pantGenerics[detail]
      }

      // Add extraDetails
      for (let detail of pantGenerics['details']) {
        item['extraDetails'].push(detail)
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
      item.shortDescription = 'Alternating Current Chinos in ' + toTitleCase(flavor.flavor)
      item.distinctSizes = Object.keys(flavorsPerSize)
      db.products.insert(item)
    }
  }
}
