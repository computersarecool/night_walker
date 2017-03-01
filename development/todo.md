# TODO:

## DATABASE
* General
  - [ ] Size chart and actual measurements in DB
  - [ ] Inventory in DB
  - [ ] Write better item copy
  
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
  - [ ] Allow client to reach all routes through bookmarks
  - [ ] Implement ssl cert
  - [ ] Make favicon
  - [ ] Make header logo an SVG
  - [ ] Have all home gallery images fade to white on sides (which might be the shop pages too)  
  - [ ] Optimize size of images
  - [ ] Convert .details popup to flexbox
  - [ ] Write about and contact copy
  - [ ] Should obfuscate email?
  - [ ] Make loading gif
  - [ ] Sunglasses SVG logo on about us
  - [ ] Check responsiveness when page grows
  - [ ] Add logo to email
  - [ ] Real response email address
  
#### Media Concepts
  - Black and white stripes as background, front photos pngs
  - fruity background on product images

### ONGOING QUESTIONS:
- ANGULAR
  - Pages like 'About' do not need a controller. Do we use a null controller?
  - Saving a route and not getting a 404 (i.e. bookmarks)
  - What does compile do in a directive?
  - Why is link returned in directive?
  - What is html5 mode and is it important?
  - Why use base tag
  
#### MongoDB
  -  How is data uploaded
  
#### YEOMAN:
  -  travis.yml
  -  buildignore
    
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
  - Added full testing
