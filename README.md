[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/computersarecool/nightwalker/issues)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

  <img src="https://nightwalker.clothing/images/text_logo.svg" alt="NightWalker Logo" style="width: 200px;"/>

  ![Cherry Flavor](https://dummyimage.com/50/c71b39/c71b39.jpg "Cherry Flavor")
  ![Nectarine Flavor](https://dummyimage.com/50/fa5132/fa5132.jpg "Nectarine Flavor")
  ![Lemon Flavor](https://dummyimage.com/50/feda60/feda60.jpg "Lemon Flavor")
  ![Apple Flavor](https://dummyimage.com/50/005b3a/005b3a.jpg "Apple Flavor")
  ![Electricity Flavor](https://dummyimage.com/50/26599a/26599a.jpg "Electricity Flavor")
  ![Plumn Crazy](https://dummyimage.com/50/3f2c63/3f2c63.jpg "Plum Crazy Flavor")
  ![Powder Flavor](https://dummyimage.com/50/e45c68/e45c68.jpg "Powder Flavor")
  ![Proton-Powder](https://dummyimage.com/50/ed243f/ed243f.jpg "Proton-Powder Flavor")
  
  > The Official Color representations of NightWalker's Cherry, Nectarine, Lemon, Apple, Electricity, Plum Crazy, Powder and Proton Powder flavors

*The MEAN App for [NightWalker.clothing](https://nightwalker.clothing "The Nightwalker.clothing website")*

# What is NightWalker?
### A Colorful MEAN App for a colorful clothing line

  NightWalker is a colorful clothing line that is trying to explore the technological future while paying homage to the (1980s) past. It is inspired by the 80s and designed in 3D.

  **This is the code for the NightWalker MEAN Web App** and the rest of this README is just notes for how to get standard and notes from its development
  
  To actually buy something from NightWalker go to [NightWalker.clothing](https://nightwalker.clothing "The Nightwalker.clothing website")
  
  This project was written in / runs on
  ```
  MongoDB 3.2
  Express 4
  Angular 1.5 
  Node ^6.9
  ECMAScript 2015
  ```
  
  This app was developed entirely with free and open source software. A huge thank you to everybody who worked on the code this project uses including: 
  
  * [package](https://raw.githubusercontent.com/computersarecool/nightwalker/master/server/package.json "Server Package.json") [authors](https://raw.githubusercontent.com/computersarecool/nightwalker/master/server/package.json "Client Package.json")
  * [Gimp](https://www.gimp.org/ "Gimp")
  * [Inkscape](https://inkscape.org/ "Inkscape")
  * [Free Software Foundation](https://www.fsf.org "FSF")
  * [Electronic Frontier Foundation Foundation](https://www.eff.org "EFF") 
  
  A portion of each sale goes directly to one of those organizations. 
  
  Thank You
  
  <img src="https://nightwalker.clothing/images/symbol_logo.svg" alt="NightWalker Logo" style="width: 150px;"/>

### To Start
##### To start dev database:
    mongod --dbpath /data/db/nightwalker &>/dev/null &

##### To add content to database:
    # From database directory
    # Test:
      mongo localhost:27017/test ./inventory.js

    # Production:
      mongo localhost:27017/production ./inventory.js
      
##### Deployment scripts
    # copy service files to /etc/systemd/system
    npm run-script copyServices
    
    # From the client directory run with: gulp
    prep, cdnMin, aws

    #Use systemctl to start / stop / monitor
    
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
  - Used schema design to improve findProductByFlavor in database.js
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

### License
:copyright: Willy Nolan 2017 
[MIT](http://en.wikipedia.org/wiki/MIT_License)

