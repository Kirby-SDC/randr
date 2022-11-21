# Express/PostgreSQL API for Atelier Retailer
## Overview

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Thie repository is for making a RESTful API using postgresql and express for the online retail portal of Atelier. The original API was unable to handle a large increase is users, and I decided to rebuild rather than refactor it. You can use this repo as a guide to make your own API. This guide assumes you have postgres already setup on your machine. You will not need PGadmin, but it can be helpful for writing your queries.

## Setup

Install the dependencies
```
npm install
```
You will need a database already created in postgres to connect to using the npm package node-postgres. Create a .env file:
```
user: <psql username>
host: "localhost"
database: <database name>
password: <your password>
port: 5432,
```
Enter ou psql username and password as well as the name of your database. The default port for postgres is 5432 and the host will be localhost until you deploy the database. 

**Modify the Schema.sql file** 
    Use your own schema for creating the tables and change the copy commands to point towards your own csv files that you want to import into the database.
    
Go into the package.json file, and modify the script called "seed" to point towards your database:
    
```
    "scripts": {
    "seed": "psql -d <your_db_name_here> < Schema.sql",
```

Now you can seed/reseed your database by running ``npm run seed``

**Start the server**
To start the server, simply run ``npm run server``
If it successfully connected to you database, you should see "connected!" log to the console

**Write your queries**
In order to optimize performance, the requested data is built entirely in the sql query using json aggregate functions. These are located in server/controllers.js. To help protect against malicious sql injections **do not use template literals for your query parameters**. Refer to how the current queries are written, but further measures should be taken to sanitize any user inputs on the client side during form validation as well.

## Future sections
- Deploying your database on an EC2 instance
- Load balancing with Nginx
- Caching with Nginx
