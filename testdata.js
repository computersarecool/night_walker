// var productSchema = new Schema({
//   // T-Shirt, jeans, etc
//   kind: {
//     type: String
//   },  
//   flavor: {
//     type: String
//   },
//   edition: {
//     type: {}
//   },
//   sizes: {
//     type: Array
//   },
//   images: {
//     type: Array
//   },
//   itemDetails: {
//     type: Array
//   },
//   shortDescription: {
//     type: String
//   },
//   description: {
//     type: String
//   },
//   sku: {
//     type: Number
//   }

// });

var flavors = [
  {
    kind: 'pants',
    edition: 'Alternating Current',
    flavor: 'Cherry',
    itemDetails: ['95 percent Cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
    description: 'We think that these cherry pants are the best ever and ever and ever and ever more',
    shortDescription: 'We think that these cherry pants are the best ever',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    }
  },
  {
    kind: 'pants',
    edition: 'Alternating Current',
    flavor: 'Nectarine',
    itemDetails: ['95 percent Cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
    description: 'We think that these nectarine pants are the best ever and ever and ever and ever more',
    shortDescription: 'We think that these nectarine pants are the best ever',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    }
  },
  {
    kind: 'pants',
    edition: 'Alternating Current',
    flavor: 'Lemon',
    itemDetails: ['95 percent Cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
    description: 'We think that these Lemon pants are the best ever and ever and ever and ever more',
    shortDescription: 'We think that these Lemon pants are the best ever',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    }
  },
  {
    kind: 'pants',
    edition: 'Alternating Current',
    flavor: 'Apple',
    itemDetails: ['95 percent Cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
    description: 'We think that these Apple pants are the best ever and ever and ever and ever more',
    shortDescription: 'We think that these Apple pants are the best ever',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    }
  },
  {
    kind: 'pants',
    edition: 'Alternating Current',
    flavor: 'Electricity',
    itemDetails: ['95 percent Cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
    description: 'We think that these electricity pants are the best ever and ever and ever and ever more',
    shortDescription: 'We think that these electricity pants are the best ever',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    }
  },
  {
    kind: 'pants',
    edition: 'Alternating Current',
    flavor: 'Plum crazy',
    itemDetails: ['95 percent Cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
    description: 'We think that these plum crazy pants are the best ever and ever and ever and ever more',
    shortDescription: 'We think that these plum crazy pants are the best ever',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    }
  },
  {
    kind: 'pants',
    edition: 'Alternating Current',
    flavor: 'Powder',
    itemDetails: ['95 percent Cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
    description: 'We think that these plum crazy pants are the best ever and ever and ever and ever more',
    shortDescription: 'We think that these plum crazy pants are the best ever',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    }
  },
  {
    kind: 'pants',
    edition: 'Alternating Current',
    flavor: 'Proton Powder',
    itemDetails: ['95 percent Cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
    description: 'We think that these plum crazy pants are the best ever and ever and ever and ever more',
    shortDescription: 'We think that these plum crazy pants are the best ever',
    images: {
      back: 'http://placehold.it/400x650',
      detail: 'http://placehold.it/400x650',
      front: 'http://placehold.it/350x650',
      side: 'http://placehold.it/450x650'
    }
  }  
];

for (var h = 0; h < flavors.length; h++) {

  for (var i = 0; i < 5; i++) {
    var item = JSON.parse(JSON.stringify(flavors[h]));
    var waistSize = 32;
    var inseam = 30;
    var sku = "1." + waistSize + "." + inseam;
    
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };
    
    item.sku = sku;

    db.products.insert(item);
  }

  for (var i = 0; i < 3; i++) {
    var item = JSON.parse(JSON.stringify(flavors[h]));
    var waistSize = 36;
    var inseam = 34;
    var sku = "1." + waistSize + "." + inseam;
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };
    item.sku = sku;
    db.products.insert(item);
  }

  for (var i = 0; i < 3; i++) {
    var item = JSON.parse(JSON.stringify(flavors[h]));
    var waistSize = 38;
    var inseam = 36;
    var sku = "1." + waistSize + "." + inseam;
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };
    item.sku = sku;
    db.products.insert(item);
  }

  for (var i = 0; i < 3; i++) {
    var item = JSON.parse(JSON.stringify(flavors[h]));
    var waistSize = 33;
    var inseam = 33;
    var sku = "1." + waistSize + "." + inseam;
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };
    item.sku = sku;
    db.products.insert(item);
  }

  for (var i = 0; i < 3; i++) {
    var item = JSON.parse(JSON.stringify(flavors[h]));
    var waistSize = 29;
    var inseam = 29;
    var sku = "1." + waistSize + "." + inseam;
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };
    item.sku = sku;
    db.products.insert(item);
  }

}
