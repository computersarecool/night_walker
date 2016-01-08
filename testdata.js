// Remove urldescription
// Add flavor id (i.e cherry 1, nectarine 2...etc)
var generics = {
  kind: 'pants',
  type: 'chinos',
  edition: 'alternating current',
  price: 69,
  description: 'The original chinos in classic Cherry',
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
  ],
  images: {
    back: 'http://placehold.it/400x650',
    detail: 'http://placehold.it/400x650',
    front: 'http://placehold.it/350x650',
    side: 'http://placehold.it/450x650'
  }
};

var flavors = [
  {
    flavor: 'cherry',
    extraDetails: ["Bursoft Fabric"],
    description: "some sort of basic description"
  },
  {
    flavor: 'nectarine',
    extraDetails: ['Strong fabric'],
    description: "some description"
  },
  {
    flavor: 'lemon',
    extraDetails: ['Strong fabric'],
    description: "Some kind of description"
  },
  {
    flavor: 'apple',
    extraDetails: ['Smooth fabric'],
    description: 'These pants have the perfect weight to hang "just right"'
  },
  {
    flavor: 'electricity',
    extraDetails: ['bursoft fabric'],
    description: 'The original chinos with a new twist on a classic color'
  },
  {
    flavor: 'plum crazy',
    extraDetails: ['bursoft fabric'],
    description: 'These pants have the perfect weight to hang "just right"'
  },
  {
    flavor: 'powder',
    extraDetails: ['bursoft fabric'],
    description: 'The original chinos with a powder coated coloring'
  },
  {
    flavor: 'proton powder',
    extraDetails: ['bursoft fabric'],
    description: 'The original chinos with a bright, bright finish'
  }
];


// Delete item['extraDetails']

var h;
for (h = 0; h < flavors.length; h++) {
  var i;
  var prop;
  var detIndex;
  
  var item;
  var waistSize;
  var inseam;
  var sku;
  
  for (i = 0; i < 5; i++) {
    item = JSON.parse(JSON.stringify(flavors[h]));
    waistSize = 32;
    inseam = 30;

    
    sku = "1" + (h + 1) + waistSize + inseam;
    for (prop in generics) {
      item[prop] = generics[prop];  
    }

    for (detIndex = 0; detIndex < item['extraDetails'].length; detIndex++) {
      item.details.unshift(item['extraDetails'][detIndex]);
    }
    
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };

    item.urlFlavor = item['flavor'].replace(' ', '-');
    item.urlEdition = item['edition'].replace(' ', '-');
    item.shortDescription = "Alternating Current Chinos in" + item['flavor'];
    item.sku = sku;
    
    db.products.insert(item);
  }



  
  for (i = 0; i < 3; i++) {
    item = JSON.parse(JSON.stringify(flavors[h]));
    waistSize = 36;
    inseam = 34;

    sku = "1" + (h + 1) + waistSize + inseam;
    for (prop in generics) {
      item[prop] = generics[prop];  
    }
    for (detIndex = 0; detIndex < item['extraDetails'].length; detIndex++) {
      item.details.unshift(item['extraDetails'][detIndex]);
    }
    
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };

    item.urlFlavor = item['flavor'].replace(' ', '-');
    item.urlEdition = item['edition'].replace(' ', '-');
    item.shortDescription = "Alternating Current Chinos in " + item['flavor'];
    item.sku = sku;
      
    db.products.insert(item);
  }
    



  for (i = 0; i < 3; i++) {
    item = JSON.parse(JSON.stringify(flavors[h]));
    waistSize = 38;
    inseam = 36;

    sku = "1" + (h + 1) + waistSize + inseam;
    for (prop in generics) {
      item[prop] = generics[prop];  
    }
    for (detIndex = 0; detIndex < item['extraDetails'].length; detIndex++) {
      item.details.unshift(item['extraDetails'][detIndex]);
    }
    
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };

    item.urlFlavor = item['flavor'].replace(' ', '-');
    item.urlEdition = item['edition'].replace(' ', '-');
    item.shortDescription = "Alternating Current Chinos in" + item['flavor'];
    item.sku = sku;
      
    db.products.insert(item);
  }
    

  for (i = 0; i < 3; i++) {
    item = JSON.parse(JSON.stringify(flavors[h]));
    waistSize = 33;
    inseam = 33;

    sku = "1" + (h + 1) + waistSize + inseam;
    for (prop in generics) {
      item[prop] = generics[prop];  
    }
    for (detIndex = 0; detIndex < item['extraDetails'].length; detIndex++) {
      item.details.unshift(item['extraDetails'][detIndex]);
    }
    
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };

    item.urlFlavor = item['flavor'].replace(' ', '-');
    item.urlEdition = item['edition'].replace(' ', '-');
    item.shortDescription = "Alternating Current Chinos in" + item['flavor'];
    item.sku = sku;
      
    db.products.insert(item);
  }
    

  for (i = 0; i < 3; i++) {
    item = JSON.parse(JSON.stringify(flavors[h]));
    waistSize = 29;
    inseam = 29;

    
    sku = "1" + (h + 1) + waistSize + inseam;
    for (prop in generics) {
      item[prop] = generics[prop];  
    }
    for (detIndex = 0; detIndex < item['extraDetails'].length; detIndex++) {
      item.details.unshift(item['extraDetails'][detIndex]);
    }
    
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };

    item.urlFlavor = item['flavor'].replace(' ', '-');
    item.urlEdition = item['edition'].replace(' ', '-');
    item.shortDescription = "Alternating Current Chinos in" + item['flavor'];
    item.sku = sku;
      
    db.products.insert(item);
  }

}


var edition = {
  name: 'Alternating Current',    
  urlName: 'alternating-current',
  members: []
};

for (var itemProp in generics) {
  edition[itemProp] = generics[itemProp];
}

edition['details'] = ['Metal zippers on every pocket', 'Checkered design under cuff', 'Tuxedo belt clasps', 'True to size fit', '97% cotton, 3% polyester', 'Free shipping'];

for (var index = 0; index < flavors.length; index++) {
  edition.members.push(flavors[index]['flavor']);
}

edition['kind'] = 'clothing';

db.editions.insert(edition);

