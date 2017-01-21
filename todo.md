# TODO:
  DATABASE
    - Database design
    - use schema design to improve findProductByFlavor in database.js
    - Save user stripe token information in database.js
    NOTES:
      - Start by looking at what the API returns
      - For the individual products, combine size information / sizes / distinctSizes
      - Add flavor index
      - remove SKU from irrelevant collection
      
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
    - Update and finalize package.json
     
  CLIENT
     PICKUP 
    - User model across page
    - Client side checkout form verification model after login
    - Save user information to expedite form filling out    
    - Only show view cart when there are things inside it
    - Add moduleType, license, ignore, main, homepage, repo, resolution to bower.json    
    - Update and finalize Bower.json / package.json(s)
    - Make sure we need all scripts
    - Show the address form if not logged in on checkout line 37    
    - Use newest possible scripts from 
    - email field in login in angular is set to text    
    - Finish site-gallery directive
    - babelify
    
    STYLE
        - Style the modal dialog box
    
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
      - Use $scope or var in controllers (i.e. product Controller) [asked before]
      - What is html5 mode and is it important?
      - Why use base tag
      - The $scope.$watch and UserFactory.getUser() issue (in login.js), how to watch item in storage


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

