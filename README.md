##### To start dev database:
    mongod --dbpath /data/db/nightwalker &>/dev/null &

##### To add content to database:
    (From database directory)
    Test:
      mongo localhost:27017/test ./inventory.js

    Production:
      mongo localhost:27017/production ./inventory.js
      
##### Deployment scripts
    (copy service files to /etc/systemd/system)
    npm run-script copyServices
    
    (from the client directory, gulp)
    prep, cdnMin, aws tasks

    (Use systemctl to start / stop / monitor)
    
#### Bonus Material
##### Additional Media Concepts
  - Black and white stripes as background on gallery
  - fruit background images on shop images
  
###### Ongoing QUESTIONS:
- MongoDB
  - How do enterprise sized businesses upload data?

- Angular
  - Pages like 'About' do not need a controller - do we use a null controller?
  - Best way to be able to reach routes when using a CDN?
  - What does compile do in a directive?
  - Why is link returned in directive?

- AWS
  - Updating cloudfront cache / File-rev all files?
  - Using Elastic Beanstalk

##### Things I would have liked to have done better
###### Database
  - Database design
  - use schema design to improve findProductByFlavor in database.js
  - Save user stripe token information in database.js
  - For the individual products, combine size information / sizes / distinctSizes

###### Mail Controller
  - Abstracted the emailing process even more (more generic methods)

###### Testing
  - Added full testing

###### General
  - Used JSdoc
  - SEO Optimize
  - SPF policy / DKIM
