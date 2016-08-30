var apiKey = require('../../credentials').easyPostApiKey;
var easypost = require('node-easypost')(apiKey);

//TODO: temporarily place here as part of email templating
const rawSubject = 'Test subject';
const rawBody = 'This is tlahe body of the email';
const simpleSubject = 'Order confirmation';


function createLabel (user, shippingDetails, emailCallback) {
  var toAddress = {
    name: shippingDetails.firstName +  ' ' + shippingDetails.lastName,
    street1: shippingDetails.address1,
    street2: shippingDetails.address2,
    city: shippingDetails.city,
    state: shippingDetails.state,
    zip: shippingDetails.zip,
    phone: shippingDetails.phone,
    email: shippingDetails.email,
  };

  // TODO: Set programatically
  var fromAddress = {
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
    internalTarget: 'paperwork@willynolan.com',
    additionalTargets: [
      'paperwork@willynolan.com',
    ]
  };
  createAddress(toAddress, fromAddress, shippingDetails, emailCallback);
}

// TODO: Create and verify when user enters information
function createAddress (toAddress, fromAddress, shippingDetails, emailCallback) {
  easypost.Address.create(toAddress, function (err, toAddress) {
    toAddress.verify(function (err, response) {
      if (err) {
        // TODO: Error handling: address is invalid
        console.log('Address is invalid.', err);
        throw err;
      } else if (response.message !== undefined && response.message !== null) {
        console.log('Address is valid but has an issue: ', response.message);
        createParcel(response.address, fromAddress, shippingDetails, emailCallback);
      } else {
        console.log('The verified address is', response);
        createParcel(response.address, fromAddress, shippingDetails, emailCallback);
      }
    });
  });
}

 
function createParcel (verifiedToAddress, fromAddress, shippingDetails, emailCallback) {
  easypost.Parcel.create({
    mode: 'test',
    predefined_package: "FlatRatePaddedEnvelope",
    weight: 21.2,
  }, function (err, parcel) {
    if (err) {
      console.log('Error in shipping controller', err);
      throw err;
    } else {
      console.log('parcel create returns\n\n', parcel);
      createShipment(verifiedToAddress, fromAddress, shippingDetails, parcel, emailCallback);
    }
  });
}


/* TODO CUSTOMS:
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


function createShipment (toAddress, fromAddress, shippingDetails, parcel, emailCallback) {
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
      
      fromAddress.subject = rawSubject;
      fromAddress.body = rawBody;

      // Add all possible emails
      fromAddress.allRecipients = [
        fromAddress.internalTarget,
      ];
      fromAddress.additionalTargets.forEach(function (address) {
        fromAddress.allRecipients.push(address);
      });
      fromAddress.allRecipients.push(shippingDetails.email);
      
      // TODO: Use filename safe part of name or order number to put in label instead of country
      fromAddress.files = [
        {
          filename: toAddress.country + "_label",
          url: label,
        }
      ];

      // TODO Fill in from toAddress above
      var simpleMailOptions = {
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        trackingCode: trackingCode,
        toAddresses: fromAddress.allRecipients,
        subject: simpleSubject,
        fromAddress: fromAddress.fromEmail,
      };
      emailCallback(trackingCode, fromAddress, simpleMailOptions);
    });
  });
}


module.exports = {
  createLabel: createLabel,
};

