##### To start database:
    mongod --dbpath /data/db/nightwalker &>/dev/null &

##### To add content to database:
    (From development directory)
    mongo localhost:27017/production ./inventory.js

##### Deployment scripts
npm run-script copyServices
    (copy service files to /etc/systemd/system dir)
    
(from the client directory) gulp 
    prep, cdnMin, aws tasks



## Bonus Material
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
###### Dev Ops
  - Handled the cloudfront routing better
  
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

###### Used JSdoc
