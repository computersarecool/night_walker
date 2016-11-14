# TODO:
### Add product, checkout, skus. Update DB methods
## Generalized styling directive (mock ups)
    - Black and white stripes as background, front photos pngs
    - fruity background on product images


## Individual Technicals
    - Email / checkout clean js
    - All skus are the same?
    
    
### Product page details
  - Short description
  - Price
  - Product info
  - size selector
  - size guide
  - add to cart
  - free shipping


### Media
- Have all home gallery images fade to white on sides (which might be the shop pages too)
- Fade to white on background image for shop gallery page (later make transparent cut out for bg image)
- Create web font
- SVG Logo and shopping cart
- background images on home / shop
- fade to white for product photos
- Consider reusing the home sprite images on poster gallery as they will load quicker
- optimize sizeof all images


### Basket Directive Popup
 - Make rotating cube style something like a directive
 - Make skus consistently numbers, right now inconsisten in the geturl function



#### Small todo items
- favicon best practices
- correct logger
- Only show view cart when there are things inside it
- (Use a good linter / Google style guide) Remove semicolons after function declarations
- Save user information to expediate form filling out
- Stripeform directive line 23 is $apply neccesary
- userfactory.js line 135 what happens when there is an invalid auth token
- remove <base> tag
- Internal error notification
--- Bower.json
- Add moduleType, license, ignore, main, homepage, repo, resolution to bower.json

## Things to do at the end
- Spf policy

### ONGOING QUESTIONS:
Angular:
  - Pages like 'About' do not need a controller. Do we use a null controller?
  - Saving a route and not getting a 404
  - What does compile do in a directive?
  - Why is link returned in directive?
  - Why does a directive have a controller
  - Should the main.html view just be a directive?
  - Use $scope or var in controllers (i.e. product Controller)


Javascript:
  - routes|checkout.js:20, set dbuser so I have db and object reference to item
  - routes|checkout.js:39, async callback
  - Should functions be defined inside of a callback (i.e. checkout.js:30, checkout)
  - Handling double clicks

Node:
  - checkout.js in routes. Does databaseuser need to be set, or will it persist from function calls
  - How is the callback defined in async.js (checkout.js:35)
  - figure out the async aspects of setting a property on an object to zero then saving it to a database (checkout.js line 29)

Express:
    - When to call with four arguments to function?

MONGODB:
  - db logs (mongodb.log)
  - db journal


YEOMAN:
  -  .travis.yml
  -  .buildignore


BOWER:
  - Directory: Bower components
  - Bower.json


MISC:
  - Editor config

UNIT TESTING:

