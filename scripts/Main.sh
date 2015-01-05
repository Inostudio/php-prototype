#!/usr/bin/env bash
# From Creating a Vagrant Box
cat << EOF | sudo tee -a /etc/motd.tail
***************************************

Welcome to ubuntu/trusty32 Vagrant Box

For php-prototype

***************************************
EOF

sudo apt-get install -y dos2unix



PATHS=/vagrant/scripts/

sudo dos2unix /vagrant/scripts/PHP.sh
sudo dos2unix /vagrant/scripts/MySQL.sh
sudo dos2unix /vagrant/scripts/Apache2.sh
sudo dos2unix /vagrant/scripts/PhpMyAdmin.sh
sudo dos2unix /vagrant/scripts/Composer.sh
sudo dos2unix /vagrant/scripts/Configuration.sh

sudo /bin/bash $PATHS'PHP.sh'
sudo /bin/bash $PATHS'MySQL.sh'
sudo /bin/bash $PATHS'Apache2.sh'
sudo /bin/bash $PATHS'PhpMyAdmin.sh'
sudo /bin/bash $PATHS'Composer.sh'
sudo /bin/bash $PATHS'Configuration.sh'

echo "You've been provisioned"