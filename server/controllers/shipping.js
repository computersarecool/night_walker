const apiKey = require('../../credentials').easyPostApiKey
const easypost = require('node-easypost')(apiKey)
const logger = require('./logger')

const fromAddress = {
  name: 'Willy Nolan',
  street1: '118 2nd Street',
  street2: '4th Floor',
  city: 'San Francisco',
  state: 'CA',
  zip: '94105',
  phone: '415-123-4567',
  email: 'paperwork@willynolan.com',
  fromName: 'Willy Nolan'
}

function createAddress (shippingDetails, callback) {
  // TODO: refactor to use destructuring
  const toAddress = {
    name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
    street1: shippingDetails.address1,
    street2: shippingDetails.address2,
    city: shippingDetails.city,
    state: shippingDetails.state,
    zip: shippingDetails.zip,
    phone: shippingDetails.phone,
    email: shippingDetails.email
  }

  easypost.Address.create(toAddress, (err, toAddress) => {
    if (err) {
      return callback(err)
    }
    toAddress.verify((err, response) => {
      if (err) {
        let error = new Error('The address you entered is invalid')
        error.type = ('AddressInvalid')
        error.status = 404
        return callback(error)
      }
      if (response.message !== undefined && response.message !== null) {
        logger.warn('Address is valid but has issue: ', response.message)
        return callback(null, response.address)
      }
      logger.info('The verified address is', response)
      return callback(null, response.address)
    })
  })
}

function createParcel (toAddress, shippingDetails, emailCallback) {
  easypost.Parcel.create({
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'test',
    predefined_package: 'FlatRatePaddedEnvelope',
    weight: 21.2
  }, (err, parcel) => {
    if (err) {
      return emailCallback(err)
    }
    logger.info('parcel create returns\n\n', parcel)
    createShipment(parcel, toAddress, shippingDetails, emailCallback)
  })
}

function createShipment (parcel, toAddress, shippingDetails, emailCallback) {
  easypost.Shipment.create({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel
   // customs_info: customsInfo
  }, (err, shipment) => {
    if (err) {
      return emailCallback(err)
    }
    // TODO: Pick cheapest programatically
    shipment.buy({rate: shipment.rates[0]}, (err, shipment) => {
      if (err) {
        return emailCallback(err)
      }
      emailCallback(null, shipment, fromAddress)
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
