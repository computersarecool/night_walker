var apiKey = 'cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi';
var easypost = require('node-easypost')(apiKey);

const rawSubject = 'Test subject';
const rawBody = 'This is the body of the email';
const simpleSubject = 'Order confirmation';

var fromAddress;
var toAddress;
var shippingInfo;

// Pass email callbacks all the way through
function createShippingLabel (user, emailCallback) {
  shippingInfo = user.shippingDetails;

  toAddress = {
    name: shippingInfo.firstName +  ' ' + shippingInfo.lastName,
    street1: shippingInfo.address1,
    street2: shippingInfo.address2,
    city: shippingInfo.city,
    state: shippingInfo.state,
    zip: shippingInfo.zip,
    phone: shippingInfo.phone,
    email: shippingInfo.email,
  };

  // TODO: Set programatically
  fromAddress = {
    name: "Willy Nolan",
    street1: "118 2nd Street",
    street2: "4th Floor",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    phone: "415-123-4567",
    email: 'paperwork@willynolan.com',
    // Used when sending confirmation emails, targets are who to email at company
    fromName: 'Willy Nolan',
    fromEmail: 'paperwork@willynolan.com',
    mainTarget: 'willy@willynolan.com',
    additionalTargets: [
      'paperwork@willynolan.com',
    ]
  };
  createAddress(toAddress, emailCallback);
}


function createAddress (toAddress, emailCallback) {
  easypost.Address.create(toAddress, function (err, toAddress) {
    toAddress.verify(function (err, response) {
      if (err) {
        // TODO: Error handling address is invalid
        console.log('Address is invalid.');
        throw err;
      } else if (response.message !== undefined && response.message !== null) {
        console.log('Address is valid but has an issue: ', response.message);
        createParcel(response.address, emailCallback);
      } else {
        console.log('The verified address is', response);
        createParcel(response.address, emailCallback);
      }
    });
  });
}


function createParcel (verifiedToAddress, emailCallback) {
  easypost.Parcel.create({
    mode: 'test',
    predefined_package: "FlatRatePaddedEnvelope",
    weight: 21.2,
  }, function (err, response) {
    if (err) {
      console.log('Error in shipping controller', err);
      throw err;
    } else {
      console.log('parcel create returns\n\n', response);
      createShipment(verifiedToAddress, response, emailCallback);
    }
  });
}


/* TODO:
  // Create customs_info form for international shipping
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
*/


function createShipment (toAddress, parcel, emailCallback) {
  easypost.Shipment.create({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
  //    customs_info: customsInfo
  }, function(err, shipment) {
    // TODO: Pick "cheapest" using method
    shipment.buy({rate: shipment.rates[0]}, function(err, shipment) {
      var trackingCode = shipment.tracking_code;
      var label = shipment.postage_label.label_url;

      // TODO: set with email and info from fromAddress above, or similar method
      fromAddress.subject = rawSubject;
      fromAddress.body = rawBody;

      // Add all possible emails
      fromAddress.allRecipients = [
        fromAddress.mainTarget,
      ];
      fromAddress.additionalTargets.forEach(function (address) {
        fromAddress.allRecipients.push(address);
      });

      // TODO: Use filename safe part of name or order number to put in label
      fromAddress.files = [
        {
          filename: toAddress.country + "_label",
          url: label,
        }
      ];

      // TODO Fill in from toAddress above
      var simpleMailOptions = {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        trackingCode: trackingCode,
        toAddresses: [
          fromAddress.mainTarget,
          shippingInfo.email,
        ],
        subject: simpleSubject,
        fromAddress: fromAddress.fromEmail,
      };

      // Compare customer info, then mail here. Order save callback is called after mail.
      // TODO: Compare customer info here to that from checkout information
      //      rawMailController.sendEmail(fromAddress);
      //      simpleMailController.emailCustomer(simpleMailOptions, databaseCallback);
      emailCallback(trackingCode, fromAddress, label, simpleMailOptions);
    });
  });
}


module.exports = {
  createShippingLabel: createShippingLabel,
};
