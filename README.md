[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/computersarecool/nightwalker/issues)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

# What is this?
### A Colorful MEAN App for a colorful clothing line

  NightWalker is a colorful clothing line that is trying to explore the technological future while paying homage to the (1980s) past. It is inspired by the 80s and designed in 3D.

  This is the code for the NightWalker MEAN Web App and the rest of this README is just notes for how to get standard and notes from the its development
  
  To actually buy something from NightWalker go to [NightWalker.clothing](https://nightwalker.clothing "The Nightwalker.clothing website")
  
  This app was developed entirely with free and open source software. A huge thank you needs to be given to everybody who worked on the code this project uses including 
  
  * [package](https://raw.githubusercontent.com/computersarecool/nightwalker/master/server/package.json "Server Package.json") [authors](https://raw.githubusercontent.com/computersarecool/nightwalker/master/server/package.json "Client Package.json")
  * [Gimp](https://www.gimp.org/ "Gimp")
  * [Inkscape](https://inkscape.org/ "Inkscape")
  * [Free Software Foundation](https://www.fsf.org "FSF")
  * [Electronic Frontier Foundation Foundation](https://www.eff.org "EFF") 
  
  A portion of each sale goes directly to one of those organizations. 
  
  Thank You
***

### To Start
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
    
### Bonus Material
##### Additional Media Concepts
  - Black and white stripes as background on gallery
  - fruit background images on shop images
  
##### Ongoing Questions
- MongoDB
  - How do enterprise businesses upload data?

- Angular
  - Pages like 'About' do not need a controller - do we use a null controller?
  - Best way to be able to reach routes when using a CDN?
  - What does compile do in a directive?
  - Why is link returned in directive?

- AWS
  - Updating cloudfront cache / File-rev all files?
  - Using Elastic Beanstalk

##### Things I would have liked to have done (or done better)
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
