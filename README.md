##### To start database:
    mongod --dbpath /data/db/nightwalker &>/dev/null &

##### To add content to database:
    (From database directory)
    mongo ../development/testdata.js

##### Deployment scripts
npm run-script copyServices
    (copy service files to /etc/systemd/system dir)
    
(from the client directory) gulp 
    prep, cdnMin, aws tasks

