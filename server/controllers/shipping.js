var apiKey = 'cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi';
var easypost = require('node-easypost')(apiKey);
var mailController = require('./mail');

// shippingInfo is only for success email
function createShippingLabel (shippingInfo) {
  // set addresses
  var toAddress = {
      name: "Dr. Steve Brule",
      street1: "179 N Harbor Dr",
      city: "Redondo Beach",
      state: "CA",
      zip: "90277",
      country: "US",
      phone: "310-808-5243"
  };
  var fromAddress = {
      name: "EasyPost",
      street1: "118 2nd Street",
      street2: "4th Floor",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      phone: "415-123-4567"
  };
  
  // verify address
  easypost.Address.create(fromAddress, function(err, fromAddress) {
      fromAddress.verify(function(err, response) {
        var verifiedAddress;
          if (err) {
              console.log('Address is invalid.');
          } else if (response.message !== undefined && response.message !== null) {
              console.log('Address is valid but has an issue: ', response.message);
              verifiedAddress = response.address;
          } else {
              verifiedAddress = response;
          }
      });
  });
  
  // set parcel
  easypost.Parcel.create({
      mode: 'test',
      predefined_package: "FlatRatePaddedEnvelope",
      weight: 21.2,
  }, function(err, response) {
    if (err) {
      console.log('Error in shipping controller', err);
    }
  });
  
  var parcel = {
      length: 10.2,
      width: 7.8,
      height: 4.3,
      weight: 21.2
  };
  
  // create customs_info form for intl shipping
  var customsItem = {
      description: "EasyPost t-shirts",
      hs_tariff_number: 123456,
      origin_country: "US",
      quantity: 2,
      value: 96.27,
      weight: 21.1
  };
  
  var customsInfo = {
      customs_certify: 1,
      customs_signer: "Hector Hammerfall",
      contents_type: "gift",
      contents_explanation: "",
      eel_pfc: "NOEEI 30.37(a)",
      non_delivery_option: "return",
      restriction_type: "none",
      restriction_comments: "",
      customs_items: [customsItem]
  };
  
  // create shipment
  easypost.Shipment.create({
      to_address: toAddress,
      from_address: fromAddress,
      parcel: parcel,
  //    customs_info: customsInfo
  }, function(err, shipment) {
      // buy postage label with one of the rate objects
    shipment.buy({rate: shipment.lowestRate(['USPS', 'ups']), insurance: 100.00}, function(err, shipment) {
      console.log('the shipment is', shipment);
      var tracking_code = shipment.tracking_code;
      var label = shipment.postage_label.label_url;
      var labelData = [
        {
          filename: 'label.png',
          url: label,
        }
      ];
      
      console.log(shipment.tracking_code);
      console.log(shipment.postage_label.label_url);
        // Send emails
        var to = 'willy@willynolan.com';
        var from = 'controller@optonox.com';
        var subject = 'New Purchase';
        var html = shippingInfo + ' bought something. The  tracking code is \n' + tracking_code + ' and the label is at ' + label;
      mailController.sendToCompany(to, from, subject, html, labelData);
      });
  });
}

module.exports.createShippingLabel = createShippingLabel;

