# TODO:

  DATABASE
    - Database design
    - use schema design to improve findProductByFlavor in database.js
    - Save user card information in database.js
    
  SERVER
    - "DevOps"
        - systemd startup script
        - log rotation
        - jsdoc
        - Move static assets to cloudfront
        - favicon best practices
        - SPF policy
        - Look into name server issues
        
    - Reset email password route
    - Create email templates
    - Finalize package.json
    
  CLIENT
    -- Switch to writing ES 2015 --
    -- Switch to using/ Standard JS --
    -- Switch to using API domain --
    
    - Style the modal dialog box
    - Delete token in addProduct and checkout routes and any invalid route
    - Stored token making a get request, getting 404 at start and creating an account
    - When posting to add items, how are the items stored? Same thing for signing up, where is the cart? Same thing for skus?
    - Store a client ID instead of the user cart on the browser ?
    - email field in login in angular is set to text
    - Client side form verification
    - Only show view cart when there are things inside it
    - Save user information to expediate form filling out
    - Stripeform directive line 23 is $apply neccesary
    - remove <base> tag
    - Make rotating cube style something like a directive
    - Make skus consistently numbers, right now inconsistent in the geturl function
    - Add moduleType, license, ignore, main, homepage, repo, resolution to bower.json    
    - Finalize Bower.json / package.json(s)
    - Make sure we need all scripts
    - Use newest possible scripts from bower
    == Finish site-gallery directive
    
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
      - Saving a route and not getting a 404 (i.e. bookmarks)
      - What does compile do in a directive?
      - Why is link returned in directive?
      - Why does a directive have a controller
      - Should the main.html view just be a directive?
      - Use $scope or var in controllers (i.e. product Controller)

    JAVASCRIPT

    NODE

    EXPRESS
    
    MONGODB:

    YEOMAN:
      -  travis.yml
      -  buildignore
      
    UNIT TESTING
    
    MISC
      - Editor config

