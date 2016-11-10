#!/bin/bash
cd database
mongod --dbpath data/db/ --logpath data/logs/mongodb.log --logappend --smallfiles

#improve performance
#echo 1 > /proc/sys/vm/drop_caches
#echo vm.swappiness=0 | sudo tee -a /etc/sysctl.conf
