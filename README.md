# Task-App
A simple task app built with express and mongodb.
## API
URL - Universal Resource Locator
URI - Universal Resource Identifier

API --> takes URI with a COMMAND and interacted with the server

HTTP request --> is generally STATELESS -> meaning after sending a 
- REQUEST and receiving a 
- RESPONSE it is done.
- REST API -- Representational State Transfer
	- All the REST api verbs are CRUD(Create,Read,Update,Delete)
- HTTP Verbs --
	- GET -- Only reading data from the server
	- POST -- Only sending data to the server
	- PUT -- Updating and Creating data on the server
	- PATCH -- Only updating data on the server
	- DELETE -- Deleting data from the server
	- HEAD -- Only reading the headers from a server

## MongoDB
* NoSQL -- Not Only Structured Query Language -- like MongoDB
* NoSQL stores data in a key-value pair -- like in a JSON format
* Each entry is a document -- in a collection --- and each key:value pair is a field
* total database is called a collections 

## Testing 
* Unit Testing -- Testing a single unit of code
	- Writing a test file that tests all the units we want to test
	- Can write as many test files we want for various units
* Integration Testing -- Testing a whole system