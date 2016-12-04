// TODO: Separate out interal vs user errors
const apiKey = require('../../credentials').easyPostApiKey
const easypost = require('node-easypost')(apiKey)

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

function createAddress (shippingDetails, callback) {
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

  easypost.Address.create(toAddress, (err, toAddress) => {
    // TODO: Internal Error Handling
    if (err) {
      return callback(err)
    }
    toAddress.verify((err, response) => {
      if (err) {
        let error = new Error('The address you entered is invalid')
        error.status = 404
        return callback(error)
      }
      if (response.message !== undefined && response.message !== null) {
        console.log('Address is valid but has an issue: ', response.message)
        return callback(null, response.address)
      }
      console.log('The verified address is', response)
      return callback(null, response.address)
    })
  })
}

function createParcel (toAddress, shippingDetails, emailCallback) {
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
      createShipment(parcel, toAddress, shippingDetails, emailCallback)
    }
  })
}

function createShipment (parcel, toAddress, shippingDetails, emailCallback) {
  easypost.Shipment.create({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel
   // customs_info: customsInfo
  }, (err, shipment) => {
    // TODO: Internal error handling
    if (err) {
      return emailCallback(err)
    }
    // TODO: Pick cheapest programatically
    shipment.buy({rate: shipment.rates[0]}, (err, shipment) => {
      if (err) {
        // TODO: Internal error handling
        return emailCallback(err)
      }
      emailCallback(null, shipment)
    })
  })
}

module.exports = {
  createAddress,
  createParcel
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
