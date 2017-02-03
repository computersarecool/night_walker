To add content to database:
    (From database directory)
    mongo ../testdata.js


##### Deployment scritps
npm run-script to copy service files to /etc/systemd/system dir
gulp: (from the client directory) prep, cdnMin, aws tasks


To improve performance on low resource machine:
    echo 1 > /proc/sys/vm/drop_caches
    echo vm.swappiness=0 | sudo tee -a /etc/sysctl.conf
