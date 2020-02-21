DROP DATABASE IF EXISTS billydb;
DROP USER IF EXISTS python;

CREATE DATABASE billydb;

CREATE USER 'python' IDENTIFIED BY 'luca';
GRANT USAGE ON *.* TO 'python'@localhost IDENTIFIED BY 'luca';
GRANT ALL privileges ON `billydb`.* TO 'python'@localhost;

FLUSH PRIVILEGES;