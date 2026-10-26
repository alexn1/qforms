-- users
create user if not exists 'qforms'@'localhost' identified with mysql_native_password by 'qforms';	-- for access from localhost
create user if not exists 'qforms'@'172.17.0.1' identified with mysql_native_password by 'qforms';	-- for access from docker
create user if not exists 'qforms'@'192.168.215.1' identified with mysql_native_password by 'qforms';	-- for access from OrgStack

-- db
drop database if exists qforms;
create database qforms charset utf8;
grant all privileges on qforms.* to 'qforms'@'localhost';
grant all privileges on qforms.* to 'qforms'@'172.17.0.1';
grant all privileges on qforms.* to 'qforms'@'192.168.215.1';

flush privileges;
