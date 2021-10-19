# MERN-ES6-Template
Full-stack application template using JavaScript ES6 syntax and Mongo-Express-React-Node technology stack.

## SetUp
In order to function properly and to be flexible the template uses repository secrets
and environment variables for its setup.

### GitHub Actions workflow setup.
Create secrets ( Settings > Secrets ) with names: "NAME" and "EMAIL". 
This will be the name and email git will use in the workflow commit to deploy branch.
Put the values in " ".The CI workflow built the client application to /public and 
commits to "deploy" branch. This branch can be used from hosting providers ( heroku )
as deploy ready copy of the application ( both front-end and back-end are included).
### Database SetUp
The template uses "mongoose" and it takes the database connection string
from environment variable named DB_CONNECTION_STRING for production.
For development and in case the environment variable is NOT set it uses
the default values from /configs/database.js

### Security SetUp
There are several environment variables in this section. 
The default values can be changed in /configs/security.js

##### SECURITY_ENCODING
The string representation encoding of the salt and the hashed password.
Default is base64.
##### PASSWORD_SALT_LENGTH
The number of bytes ( before encoding ) of the salt. Default is 16.
##### PASSWORD_HASH_LENGTH
The number of bytes ( before encoding ) of the hashed password. Default is 64.
##### PASSWORD_HASH_ITERATIONS
The number of hashing iterations of the password. Default is 15000.
##### PASSWORD_HASHING_ALGORITHM
The algorithm used for the hashing. Default is sha512.