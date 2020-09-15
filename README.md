<p align="center">
    <img src="https://media.giphy.com/media/SWuIGimfRJm3FqWQxT/giphy.gif" title="All the flavors are shown by rotating your mobile device" />
</p>

# NightWalker
*The MEAN web app for [NightWalker.clothing](https://nightwalker.clothing "The Nightwalker.clothing website")*

## Description
#### What is NightWalker?
##### A colorful clothing line
  NightWalker is a colorful clothing line that explores the future while paying homage to the past.
  
Inspired by the 80s. Designed in 3D.

**This is the code for the original NightWalker MEAN Web App. The NightWalker website no longer uses this code.**

**Additionally this repo is archived and for observation purposed only.** 

The rest of this README is just notes about how to use the code.

To actually buy something from NightWalker go to [NightWalker.clothing](https://nightwalker.clothing "The Nightwalker.clothing website")

  ![Cherry Flavor](https://dummyimage.com/50/c71b39/c71b39.jpg "Cherrry Flavor")
  ![Nectarine Flavor](https://dummyimage.com/50/fa5132/fa5132.jpg "Nectarine Flavor")
  ![Lemon Flavor](https://dummyimage.com/50/feda60/feda60.jpg "Lemon Flavor")
  ![Apple Flavor](https://dummyimage.com/50/005b3a/005b3a.jpg "Apple Flavor")
  ![Electricity Flavor](https://dummyimage.com/50/26599a/26599a.jpg "Electricity Flavor")
  ![Plumn Crazy](https://dummyimage.com/50/3f2c63/3f2c63.jpg "Plum Crazy Flavor")
  ![Powder Flavor](https://dummyimage.com/50/e45c68/e45c68.jpg "Powder Flavor")
  ![Proton-Powder](https://dummyimage.com/50/ed243f/ed243f.jpg "Proton-Powder Flavor")

> The official color values of NightWalker's Cherry, Nectarine, Lemon, Apple, Electricity, Plum Crazy, Powder and Proton Powder flavors

## Tested On
- Ubuntu Linux 16.04

## To Use
##### To start the development database:
    mongod --dbpath /data/db/nightwalker &>/dev/null &

##### To add content to database:
```bash
    # From the database directory
    # Test:
    mongo localhost:27017/test ./inventory.js

    # Production:
    mongo localhost:27017/production ./inventory.js
 ```
##### Deployment scripts:
```bash
    # Copy service files to /etc/systemd/system
    npm run-script copyServices
    
    # From the client directory run with: gulp
    prep, cdnMin, aws

    # Use something like systemctl to start / stop / monitor
```


## Project Structure
- `client` contains the front-end code
- `server` contains the server code
- `database` contains the database code

## Functionality
- This repo contains all of the code required to run the entire web application (server / client / database)

## Extra Notes
This project was written in / uses:
```
MongoDB 3.2
Express 4
Angular 1.5 
Node ^6.9
ECMAScript 2015
```

This app was developed entirely with free and open source software. Thank you to everybody who worked on the code this project uses including: 
* [package](https://raw.githubusercontent.com/computersarecool/nightwalker/master/server/package.json "Server Package.json") [authors](https://raw.githubusercontent.com/computersarecool/nightwalker/master/server/package.json "Client Package.json")
* [Gimp](https://www.gimp.org/ "Gimp")
* [Inkscape](https://inkscape.org/ "Inkscape")
* [Free Software Foundation](https://www.fsf.org "FSF")
  
### License
:copyright: Willy Nolan 2017 

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
