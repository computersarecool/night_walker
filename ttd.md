# TODO:
Final design and prepare media:
## Guest Checkout initiative
### Basket Directive Popup
 - Make rotating cube style something like a directive
 - Make responsive popup directive
 - Make all possible non-logged in options available (direct to right page)
 - Make view / edit portion of account page
 - Make Details page
 - Make Congrats popup directive / page

### Simultaneous
 - Finish heading (look into icon fonts for header)
 - Put logo upper left, stylize "Welcome to *nightWalker*" to upper right
 - Fit images

### Extras 
    - Work background, design entire mobile experience
    - Get the highest needed sizes fro sprites and all images
    - Image sizes: 335 x 855
    - Make Sprite sheet
    - Link Media so it displays
    - Fix gallery directive


Purchase scenarios:
  x Not logged in user buys items
  x Non-logged in user adds items to cart then creates account then checks out
  x Then re-adds items and checkouts out




#### Small todo items
- Only show view cart when there are things inside it
- Remove semicolons after function declarations
- Add missing semicolons to thanks like return
- Add return undefined to all return statements

- routes|checkout.j:91 save card information if not a guest
- routes|checkout.j:119, 124 only send usersafe information
- Stripeform directive line 23 is $apply neccesary

- userfactory.js line 135 what happens when there is an invalid auth token

--- Bower.json
- Add moduleType, license, ignore, main, homepage, repo, resolution to bower.json


# ONGOING QUESTIONS:

Angular:
  - What does compile do in a directive?
  - Why is link returned in directive?
  - Why does a directive have a controller


Javascript:
  - routes|checkout.js:20, set dbuser so I have db and object reference to item
  - routes|checkout.js:39, async callback
  - Should functions be defined inside of a callback (i.e. checkout.js:30, checkout)


Node:
  - checkout.js in routes. Does databaseuser need to be set, or will it persist from function calls
  - How is the callback defined in async.js (checkout.js:35)


EXPRESS:
  - The logger
  - The body of the request (bodyParser.json)
  - app.get('env')
  - Bin Folder


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

