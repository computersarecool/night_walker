To start:
    (From database directory)
    mongod --dbpath ./data/db/ --logpath ./data/logs/mongodb.log --logappend --smallfiles &
    
To add content to database:
    run testdata.js

To improve performance:
    echo 1 > /proc/sys/vm/drop_caches
    echo vm.swappiness=0 | sudo tee -a /etc/sysctl.conf
