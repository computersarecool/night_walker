# TODO:
  DATABASE
    [] Add flavor index
      - Database design
      - use schema design to improve findProductByFlavor in database.js
      - Save user stripe token information in database.js
      - For the individual products, combine size information / sizes / distinctSizes
      - remove SKU from irrelevant collection
      
  SERVER
   [] Create email templates
   
   * "DevOps"
        []  Move static assets to cloudfront
        []  favicon best practices
        []  systemd startup script / elastic startup
        []  Look into name server issues
        []   Update and finalize package.json
          - log rotation
          - jsdoc
          - SPF policy
    
  CLIENT
    []  Finish site-gallery directive
      - Update and finalize Bower.json / package.json(s)
      - Make sure we need all scripts
      - babelify
    
    STYLE
     * Modal dialog box
 
     * Product page details
	    - Short description
        - Price
	    - Product info
	    - size selector
	    - size guide
	    - add to cart
        - free shipping

    *  Media
        - Black and white stripes as background, front photos pngs
        - fruity background on product images
        - Make favicon
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



    JAVASCRIPT

    NODE

    EX PRESS
    
    MONGODB:

    YEOMAN:
      -  travis.yml
      -  buildignore
      
    UNIT TESTING
    
    MISC
      - Editor config

