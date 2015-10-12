# TODO:
Purchase scenarios
- Not logged in user buys items
- Non-logged in user adds items to cart then creates account then checks out
(not removed fromd database cart)
-- Then re-adds items and checkouts out




# Things to do, various
Only show view cart when there are things inside it
After pressing checkout route from sign in -> purchase
Afer pressing checkotu route from sign up -> purchase
Clear cart after logged in buyer buys something (set to null in database)

HIGHER RES SPRITES (Make FULL RES)
MAKE FULL RES FOR EACH IMAGE USED
Remove Semicolon after function declarations
remove double var in services



## Things to do order of operations
    • Prepare media:
        - Image sizes:
            335 x 855
        - Make Sprite sheet
        - Link Media so it displays
        - Fix animating pants completely

    • Add members to Edition Schema
    • Link Edition name in Schema
        (Can the edition schema be embedded?) - No

    • Finish copy
    • Style


#### Small todo items
routes|checkout.j:91 save card information if not a guest


# ONGOING QUESTIONS:
? What does compile do in a directive?
? checkout.js in routes. Does databaseuser need to be set, or will it persist from function calls
? Why is link returned?
? Directive controller?
? Should functions be defined inside of a callback (i.e. checkout.js:30, checkout)
? How is the callback defined in async.js (checkout.js:35)



Javascript:
- routes|checkout.js:20, set dbuser so I have db and object reference to item
- routes|checkout.js:39, async callback


Node:

EXPRESS:
    The logger
    The body of the request (bodyParser.json)
    app.get('env')
    Bin Folder


MONGODB:
    db logs (mongodb.log)
        db journal


YEOMAN: 
    .travis.yml
    .buildignore

BOWER:
    Directory: Bower components
    Bower.json


MISC:
    Editor config


UNIT TESTING:

