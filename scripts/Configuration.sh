#!/bin/bash
#sudo sh -c "echo 'Include /etc/phpmyadmin/apache.conf' >> /etc/apache2/apache2.conf"
sudo sh -c "echo 'ServerName vagrant' >> /etc/apache2/apache2.conf"
cat > /etc/apache2/sites-available/001-php-prototype.conf << EOF
<VirtualHost *:80>
    ServerName php-prototype
    DocumentRoot /vagrant/public

    DirectoryIndex index.php

    <Directory "/vagrant/public">
        Require all granted
        AllowOverride All
    </Directory>

</VirtualHost>
EOF
sudo a2ensite 001-php-prototype.conf
sudo service apache2 restart