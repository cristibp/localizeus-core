FLUSH PRIVILEGES;
drop user if exists 'localizeus'@'%';

create user 'localizeus'@'%' IDENTIFIED BY 'localizeus' ;
GRANT ALL PRIVILEGES ON * . * TO 'localizeus'@'%';
FLUSH PRIVILEGES;
CREATE DATABASE IF NOT EXISTS localizeus;
use localizeus;
