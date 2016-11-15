// TODO: Separate out interal vs user errors
const apiKey = require('../../credentials').easyPostApiKey
const easypost = require('node-easypost')(apiKey)

// TODO: temporarily place here as part of email templating
const rawSubject = 'Test subject'
const rawBody = 'This is the body of the email'
const simpleSubject = 'Order confirmation'

function createLabel (user, shippingDetails, emailCallback) {
  const toAddress = {
    name: shippingDetails.firstName + ' ' + shippingDetails.lastName,
    street1: shippingDetails.address1,
    street2: shippingDetails.address2,
    city: shippingDetails.city,
    state: shippingDetails.state,
    zip: shippingDetails.zip,
    phone: shippingDetails.phone,
    email: shippingDetails.email
  }

  // TODO: Set programatically
  const fromAddress = {
    name: 'Willy Nolan',
    street1: '118 2nd Street',
    street2: '4th Floor',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    phone: '415-123-4567',
    email: 'paperwork@willynolan.com',
    // Used when sending confirmation emails, targets are who to email at company
    fromName: 'Willy Nolan',
    fromEmail: 'paperwork@willynolan.com',
    internalTarget: 'paperwork@willynolan.com',
    additionalTargets: [
      'paperwork@willynolan.com'
    ]
  }
  createAddress(toAddress, fromAddress, shippingDetails, emailCallback)
}

// TODO: Create and verify when user enters information
function createAddress (toAddress, fromAddress, shippingDetails, emailCallback) {
  easypost.Address.create(toAddress, (err, toAddress) => {
    // TODO: Internal Error Handling
    if (err) {
      return emailCallback(err)
    }
    toAddress.verify((err, response) => {
      if (err) {
        return emailCallback(err)
      }
      if (response.message !== undefined && response.message !== null) {
        console.log('Address is valid but has an issue: ', response.message)
        return createParcel(response.address, fromAddress, shippingDetails, emailCallback)
      }
      console.log('The verified address is', response)
      createParcel(response.address, fromAddress, shippingDetails, emailCallback)
    })
  })
}

function createParcel (verifiedToAddress, fromAddress, shippingDetails, emailCallback) {
  easypost.Parcel.create({
    mode: 'test',
    predefined_package: 'FlatRatePaddedEnvelope',
    weight: 21.2
  }, (err, parcel) => {
    if (err) {
      // TODO: Internal Error handling
      emailCallback(err)
    } else {
      console.log('parcel create returns\n\n', parcel)
      createShipment(verifiedToAddress, fromAddress, shippingDetails, parcel, emailCallback)
    }
  })
}

// TODO CUSTOMS:
// Create customs_info form for international shipping
//  var customsItem = {
//    description: "EasyPost t-shirts",
//    hs_tariff_number: 123456,
//    origin_country: "US",
//    quantity: 2,
//    value: 96.27,
//    weight: 21.1
//  }

// var customsInfo = {
//   customs_certify: 1,
//   customs_signer: "Hector Hammerfall",
//   contents_type: "gift",
//   contents_explanation: "",
//   eel_pfc: "NOEEI 30.37(a)",
//   non_delivery_option: "return",
//   restriction_type: "none",
//   restriction_comments: "",
//   customs_items: [customsItem]
// }

function createShipment (toAddress, fromAddress, shippingDetails, parcel, emailCallback) {
  easypost.Shipment.create({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel
   // customs_info: customsInfo
  }, (err, shipment) => {
    if (err) {
      return emailCallback(err)
    }
    // TODO: Pick cheapest using method
    shipment.buy({rate: shipment.rates[0]}, (err, shipment) => {
      if (err) {
        return emailCallback(err)
      }

      const trackingCode = shipment.tracking_code
      const label = shipment.postage_label.label_url
      fromAddress.subject = rawSubject
      fromAddress.body = rawBody

      // Add all possible emails
      fromAddress.allRecipients = [
        fromAddress.internalTarget
      ]
      fromAddress.additionalTargets.forEach((address) => {
        fromAddress.allRecipients.push(address)
      })
      fromAddress.allRecipients.push(shippingDetails.email)

      // TODO: Use filename safe part of name or order number in label filename
      fromAddress.files = [
        {
          filename: toAddress.country + '_label',
          url: label
        }
      ]

      // TODO Fill in from toAddress above
      const simpleMailOptions = {
        firstName: shippingDetails.firstName,
        lastName: shippingDetails.lastName,
        trackingCode: trackingCode,
        toAddresses: fromAddress.allRecipients,
        subject: simpleSubject,
        fromAddress: fromAddress.fromEmail
      }
      emailCallback(null, trackingCode, fromAddress, simpleMailOptions)
    })
  })
}

module.exports = {
  createLabel: createLabel
}
