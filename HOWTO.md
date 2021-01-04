#How to?

## Mysql
###How to start using it?
Initially it comes with the root user, but we have to change the initial password and to get rid of --skip-grant-tables.
So, how to change the password?
1. Start it using mysqld --skip-grant-tables
2. use mysql
3. Update user set authentication_string=password('my_password') where user='root';
4. Remove --skip-grant-tables and restart it

###How to manage the privileges?
* GRANT ALL PRIVILEGES ON *.* TO "localizeus"@'localhost' WITH GRANT OPTION;
* GRANT ALL PRIVILEGES ON *.* TO "localizeus"@'%' WITH GRANT OPTION;
* FLUSH PRIVILEGES;
