# TODO:

## DATABASE
      
## SERVER
* AWS
  - [ ] Fix name server issues
  - [ ] Updating cloudfront cache
    - [ ] File-rev all files?
  - [ ] Using Elastic Beanstalk
  - [ ] SPF policy 
  - [ ] Why different regions for each service

* Other
  - [ ] Improve systemd startup script / journalctl
  - [ ] Get all latest Stripe and easypost credentials
  - jsdoc
   
## CLIENT
* Other
  - [ ] SEO Optimize
  - [ ] Allow client to reach all routes directly

## STYLE
* Modal cart
 - [x] Not signed in / no items in cart
 - PICKUP  div.main
 
#### Modal dialog box
#### Product page details
  - Short description
  - Price
  - Product info
  - size selector
  - size guide
  - add to cart
  - free shipping
  
#### Media
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
  
#### Order Confirmation Email
  - Logo
  - Real response email address

### ONGOING QUESTIONS:
- ANGULAR
  - Pages like 'About' do not need a controller. Do we use a null controller?
  - Saving a route and not getting a 404 (i.e. bookmarks)
  - What does compile do in a directive?
  - Why is link returned in directive?
  - Why does a directive have a controller
  - Use $scope or var in controllers (i.e. product Controller) [asked before]
  - What is html5 mode and is it important?
  - Why use base tag

#### JAVASCRIPT

#### NODE

#### EXPRESS

#### MONGODB:
#### YEOMAN:
  -  travis.yml
  -  buildignore
    
####  MISC
  - Editor config
  - Unit testing


##### Things I would have liked to have done better:
###### Database
  - Database design
  - use schema design to improve findProductByFlavor in database.js
  - Save user stripe token information in database.js
  - For the individual products, combine size information / sizes / distinctSizes
  - remove SKU from irrelevant collection

###### Mail Controller
  - Abstracted the emailing process even more (more generic methods)

###### Testing
