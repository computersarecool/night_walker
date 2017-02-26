// Add flavor id (i.e cherry 1, nectarine 2...etc)
var generics = {
  name: 'Chinos',
  kind: 'pants',
  type: 'chinos',
  edition: 'alternating current',
  msrp: 6900,
  currentPrice: 6900,
  description: 'The original chinos',
  aboutSpecific: "Designed in Portland, OR USA these are NightWalker's flagship chino pants. Only 1200 pairs exist",
  careInstructions: 'Machine wash cold and hang dry',
  sizeGuide: "True to size: The model is 5'10\", 150 lbs and is wearing a size 30x30. Click here for sizing information",
  details: ['Metal zippers on every pocket', 'Checkered design under cuff', 'Tuxedo belt clasps', 'True to size fit', '97% cotton, 3% polyester', 'Free shipping'],
  sizeInformation: [
    {
      "Listed Size": "29x29",
      "Waist": "29",
      "Inseam": "29",
      "Outseam": "30",
      "Rise": "6",
      "Knee": "12",
      "Leg Opening": "5",
      "Pocket Opening": "7",
      "Pocket Depth": "9"
    },
    {
      "Listed Size": "33x33",
      "Waist": "29",
      "Inseam": "29",
      "Outseam": "30",
      "Rise": "6",
      "Knee": "12",
      "Leg Opening": "5",
      "Pocket Opening": "7",
      "Pocket Depth": "9"
    },
    {
      "Listed Size": "38x36",
      "Waist": "29",
      "Inseam": "29",
      "Outseam": "30",
      "Rise": "6",
      "Knee": "12",
      "Leg Opening": "5",
      "Pocket Opening": "7",
      "Pocket Depth": "9"
    },
    {
      "Listed Size": "36x34",
      "Waist": "29",
      "Inseam": "29",
      "Outseam": "30",
      "Rise": "6",
      "Knee": "12",
      "Leg Opening": "5",
      "Pocket Opening": "7",
      "Pocket Depth": "9"
    },
    {
      "Listed Size": "32x30",
      "Waist": "29",
      "Inseam": "29",
      "Outseam": "30",
      "Rise": "6",
      "Knee": "12",
      "Leg Opening": "5",
      "Pocket Opening": "7",
      "Pocket Depth": "9"
    }      
  ]
};  

var flavors = [
  {
    flavor: 'cherry',
    extraDetails: ["Bursoft Fabric"],
    description: "some sort of basic description",
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: "1"
  },
  {
    flavor: 'nectarine',
    extraDetails: ['Strong fabric'],
    description: "some description",
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: "2"
  },
  {
    flavor: 'lemon',
    extraDetails: ['Strong fabric'],
    description: "Some kind of description",
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: "3"
  },
  {
    flavor: 'apple',
    extraDetails: ['Smooth fabric'],
    description: 'These pants have the perfect weight to hang "just right"',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: "4"
  },
  {
    flavor: 'electricity',
    extraDetails: ['bursoft fabric'],
    description: 'The original chinos with a new twist on a classic color',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: "5"
  },
  {
    flavor: 'plum crazy',
    extraDetails: ['bursoft fabric'],
    description: 'These pants have the perfect weight to hang "just right"',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: "6"
  },
  {
    flavor: 'powder',
    extraDetails: ['bursoft fabric'],
    description: 'The original chinos with a powder coated coloring',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: "7"
  },
  {
    flavor: 'proton powder',
    extraDetails: ['bursoft fabric'],
    description: 'The original chinos with a bright, bright finish',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    },
    flavorIndex: "8"
  }
];

var h;
// For every flavor
for (h = 0; h < flavors.length; h++) {
  var i;
  var prop;
  var detIndex;
  var item;
  var waistSize;
  var inseam;
  var sku;

  // Say there are five of 32x30
  for (i = 0; i < 5; i++) {
    item = JSON.parse(JSON.stringify(flavors[h]));
    waistSize = 32;
    inseam = 30;
    sku = "1" + (h + 1) + waistSize + inseam;

    // Set item properties
    for (prop in generics) {
      item[prop] = generics[prop];  
    }

    // Set extra details
    for (detIndex = 0; detIndex < item['extraDetails'].length; detIndex++) {
      if (item.details.indexOf(item['extraDetails'][detIndex]) == -1) {
        item.details.unshift(item['extraDetails'][detIndex]);
      } 
    }

    // Set sizes
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };

    // Make Url safe name
    item.safeFlavor = item['flavor'].replace(' ', '-')
    item.safeEdition = item['edition'].replace(' ', '-')
    item.shortDescription = "Alternating Current Chinos in " + toTitleCase(item['flavor'])
    item.sku = sku;
    item.distinctSizes = [
      "32x32",
      "36x36",
    ];    
    db.products.insert(item);
  };

  // Say there are 3 36x34
  for (i = 0; i < 3; i++) {
    item = JSON.parse(JSON.stringify(flavors[h]));
    waistSize = 36;
    inseam = 34;
    sku = "1" + (h + 1) + waistSize + inseam;
    // Set properties
    for (prop in generics) {
      item[prop] = generics[prop];  
    }
    // Set details
    for (detIndex = 0; detIndex < item['extraDetails'].length; detIndex++) {
      if (item.details.indexOf(item['extraDetails'][detIndex]) == -1) {
        item.details.unshift(item['extraDetails'][detIndex]);
      } 
    }
    // Set sizes
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };

    // Make url-safe name
    item.safeFlavor = item['flavor'].replace(' ', '-');
    item.safeEdition = item['edition'].replace(' ', '-');
    item.shortDescription = "Alternating Current Chinos in " + toTitleCase(item['flavor']);
    item.sku = sku;
    item.distinctSizes = [
      "32x32",
      "36x36",
    ];    
    db.products.insert(item);
  }
}

function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

var edition = {
  name: 'Alternating Current',    
  urlSafeName: 'alternating-current',
  kind: 'clothing',
  details: 'the first edition ever',
  members: {
    'pants': {
      name: 'Chinos',
      kind: 'pants',
      type: 'chinos',
      edition: 'alternating current',
      msrp: 6900,
      description: 'The original chinos',
      aboutSpecific: "Designed in Portland, OR USA these are NightWalker's flagship chino pants. Only 1200 pairs exist",
      careInstructions: 'Machine wash cold and hang dry',
      sizeGuide: "True to size: The model is 5'10\", 150 lbs and is wearing a size 30x30. Click here for sizing information",
      details: ['Metal zippers on every pocket', 'Checkered design under cuff', 'Tuxedo belt clasps', 'True to size fit', '97% cotton, 3% polyester', 'Free shipping'],
      sizes: [
        '29x29',
        '33x33'
      ],
      flavors: [
        'cherry',
        'nectarine',
        'lemon',
        'apple',
        'electricity',
        'plum crazy',
        'powder',
        'proton powder',
      ]
    },
  }
};


db.editions.insert(edition);

