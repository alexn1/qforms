create database demo charset utf8;
create user 'demo'@'localhost' identified with mysql_native_password by '123qwe';
grant all privileges on demo.* to 'demo'@'localhost';
flush privileges;
