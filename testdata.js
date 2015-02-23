var flavors = [
  {
    kind: 'pants',
    edition: 'alternating current',
    flavor: 'cherry',
    itemDetails: ['95 percent cotton, 5 percent polyester', 'bursoft', 'metal zippers', 'tuxedo belt claps'],
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
    edition: 'alternating current',
    flavor: 'nectarine',
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
    edition: 'alternating current',
    flavor: 'lemon',
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
    edition: 'alternating current',
    flavor: 'apple',
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
    edition: 'alternating current',
    flavor: 'electricity',
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
    edition: 'alternating current',
    flavor: 'plum crazy',
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
    edition: 'alternating current',
    flavor: 'powder',
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
    edition: 'alternating current',
    flavor: 'proton powder',
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
    var sku = "1" + (h + 1) + waistSize + inseam;
    
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
    var sku = "1" + (h + 1) + waistSize + inseam;
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
    var sku = "1" + (h + 1) + waistSize + inseam;
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
    var sku = "1" + (h + 1) + waistSize + inseam;
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
    var sku = "1" + (h + 1) + waistSize + inseam;
    item.sizes = {
      waistSize: waistSize,
      inseam: inseam
    };
    item.sku = sku;
    db.products.insert(item);
  }

}
