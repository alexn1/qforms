create database demo charset utf8;
create user 'demo'@'localhost' identified by '123qwe';
grant all privileges on demo.* to 'demo'@'localhost';
flush privileges;