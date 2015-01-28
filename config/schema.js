/*
    This is an early attempt at Schema Design for my E-Commerce Web App.  It is selling pants right now
    But should sell a variety of categories fo clothing later
    */

// Customer

var customer = {
  "firstName" : String,
  "lastName" : String,
  "middleInitial" : String,
  "addresses" : [
    {
      "houseNumber" : String,
      "apartmentNumber" : String,
      "street" : String,
      "city" : String,
      "state" : String,
      "zipCode" : String
    }
  ],
  "emailAddress" : String,
  "dateJoined" : ISODate,
  "emailOptin" : Boolean,
  "creditCards" : [
    {
      "kind" : String,
      "lastFour" : Number,
      "expiration" : ISODate
    }
  ],
  "orders" : [
    {
      "orderNumber" : Number
    }
  ],
  "sessions" : [
    {
      "sessionId" : Number
    }
  ]
}

var session = {
  "cart" : {
    "skus" : [
    //The sku numbers for the products in the cart
    Number
    ]
  }
}

var coupon = {
  "creationDate" : ISODate,
  "expirationDate" : ISODate,
  "value" : number
}

var product = {
  "category" : String,
  "price" : Number,
  "collection" : String,
}

var pant = {
  "sku" : Number,
  "waist_size" : Number,
  "inseam_size" : Number,
  "collection" : String,
  "price" : Number
}

/*
Situations:

    A an unknown computer visits the site and adds items to cat but leaves without buying:
        - A session ID is generated for the computer and stored as cookie browser (combined with expr date?)
        - That session ID is tied to a session on the server (which is deleted after the expiration date?)
        RESULT: When the same browser visits the page later, the entire shopping cart is restored


    A visitor comes back to the site
        - Browser submites a the session ID which was held as a cookie
        - The session (shopping cart) is restored


    A registered user visits from a new browser:
        - Upon login the most recent session is restored

    A registered user visits after two days of not visiting (was previously logged in)
        - Their session is restored using a cookie stored on their browser
        - Logged in is set to false so they must login to access certain parts of the site???


        */
