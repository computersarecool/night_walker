# TODO:
  DATABASE
    - Database design

  SERVER
    - Need to verify every db item in $push method? i.e. make sure all skus are valid in finduser?
    - Send a response indicating illegal tokens should be deleted
    - Add options to jwt.sign (login route)
    - Save user credit card token in database
    - Make filepath a good name in downloadeder
    - Use destructuring in database controller w / addresses
    - Internal error notification
    - favicon best practices
    - logging best practices
    - SPF policy

  CLIENT
    - Switch to api domain
    - Trying to create an account with a token stored returns a 404 and does nothing
    - When posting to add items, how are the items stored? Same thing for signing up, where is the cart? Same thing for skus?
    - Store a client ID instead of the user cart on the browser
    - Why is angular making a get request to user route when there is a token
    - email field in login in angular is set to text
    - Address verification
    - Only show view cart when there are things inside it
    - Convert to standard
    - Save user information to expediate form filling out
    - Stripeform directive line 23 is $apply neccesary
    - remove <base> tag
    - Finalize Bower.json / package.json(s)
    - Add moduleType, license, ignore, main, homepage, repo, resolution to bower.json
    - Make rotating cube style something like a directive
    - Make skus consistently numbers, right now inconsistent in the geturl function

  DESIGN
      Product page details
	    - Short description
        - Price
	    - Product info
	    - size selector
	    - size guide
	    - add to cart
        - free shipping

      Media
        - Black and white stripes as background, front photos pngs
        - fruity background on product images
        - Have all home gallery images fade to white on sides (which might be the shop pages too)
        - Fade to white on background image for shop gallery page (later make transparent cut out for bg image)
        - Create web font
        - SVG Logo and shopping cart
        - background images on home / shop
        - fade to white for product photos
        - Consider reusing the home sprite images on poster gallery as they will load quicker
        - optimize sizeof all images
      
### ONGOING QUESTIONS:
    ANGULAR
      - Pages like 'About' do not need a controller. Do we use a null controller?
      - Saving a route and not getting a 404
      - What does compile do in a directive?
      - Why is link returned in directive?
      - Why does a directive have a controller
      - Should the main.html view just be a directive?
      - Use $scope or var in controllers (i.e. product Controller)

    JAVASCRIPT
      - routes|checkout.js:20, set dbuser so I have db and object reference to item
      - routes|checkout.js:39, async callback
      - Should functions be defined inside of a callback (i.e. checkout.js:30, checkout)
      - Handling double clicks

    NODE
      - checkout.js in routes. Does databaseuser need to be set, or will it persist from function calls
      - How is the callback defined in async.js (checkout.js:35)
      - figure out the async aspects of setting a property on an object to zero then saving it to a database (checkout.js line 29)
      - database.js line 113, is this the correct way to test input

    MONGODB:
      - What are: db logs (mongodb.log), db journal

    YEOMAN:
      -  .travis.yml
      -  .buildignore
      
    EXPRESS

    MISC
        - Editor config

    UNIT TESTING:

