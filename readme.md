To start:
    (From database directory)
    mongod --dbpath ./data/db/ --logpath ./data/logs/mongodb.log --logappend --smallfiles &
    
To add content to database:
    (From database directory)
    mongo ../testdata.js

To improve performance:
    echo 1 > /proc/sys/vm/drop_caches
    echo vm.swappiness=0 | sudo tee -a /etc/sysctl.conf
