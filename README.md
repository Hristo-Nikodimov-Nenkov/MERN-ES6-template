# MERN-ES6-Template
Full-stack application template using JavaScript ES6 syntax and MongoDB, Express, React, Node technology stack.

## SetUp
In order to function properly and to be flexible the template uses repository secrets
and environment variables for its setup.

### GitHub Actions workflow setup.
Create secrets ( Settings > Secrets ) with names: "NAME" and "EMAIL". 
This will be the name and email git will use in the workflow commit to deploy branch.
Put the values in " ".\
The CI workflow built the client application to /public and 
commits to "deploy" branch.\
This branch can be used from hosting providers ( heroku )
as deploy-ready copy of the application (both front-end and back-end are included).

#### The workflow fails if there are warnings when client is built.
You can prevent that by adding Secret with key CI and value false.

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

##### COOKIE_SECRET
When the token is stored in the cookie it is encrypted with this value.\
If it is not set it uses the default value from /configs/security.js

##### COOKIE_NAME
Is the name of the authentication cookie.

#### If you are going to deploy on server that does NOT support "https".
You must change the cookieConfigs.options.secure in /configs/security.js to "false".\
By default is to set it to true when NODE_ENV is "production";

## Creating fresh client with create-react-app

### You can create fresh client at any time.
After you create fresh copy of the client application you must add .env file with
BUILD_PATH='../public' this will change the client build path to /public.\
and remove .env from MAIN .gitignore or the client will be built in /client/public\
You don't need .gitignore file in the client, so you can remove it if you wish.\
Setting BUILD_PATH in GitHub Secrets or Environments does NOT work.

## Adding models to back-end.
The /models folder has 4 sub-folders\

### constants
In this folder is located the .js file that contains the constants.

### methods
In this folder is located the .js file with the instance methods of the model.\
It MUST HAVE default export containing all instance methods OR {}.\
All methods in the default export are attached to the schema.

### statics
In this folder is located the .js file with the static (instance agnostic) methods of the model.\
It MUST HAVE default export containing all static methods or {}.\
All methods in the default export are attached to the schema.

### schemas
In this folder is located the .js file with the schema of the model.
It MUST export the schema as it's default export.

### The model itself.
You can copy-paste the content of the .js file since the changes that has to be made are not many.
The methods are attached to the schema in the 2 for-in loops.

#### Changes
##### 1) The name of the schema and the file from which it's imported.
If you do NOT use refactor/replace you need to change the name of the schema EVERYWHERE!

##### 2) The name of the file from which the instanceMethods are imported.
##### 3) The name of the file from which the staticMethods are imported.
##### 4) In mongoose.model()
You have to change the name of the model, the name of the schema and the name of the collection.
##### 5) The name of the const and the default export.

## Adding controllers
You can use both named and default export for the controller methods.

## Adding services
You can use both named and default export for the service methods.

## Adding validations
The default export of the model validation has to be Array for consistency.\
You can set it to empty array at the beginning and gradually add validation chains afterwords.

### Field validations
I usually export a single ValidationChain for every field that needs validation.

### Binding model validations
I usually export an Array of ValidationChain for every model that needs validation.\
In the beginning you can export an empty array which will always pass the validateModel middleware and call the controller method associated with the router path.

## Adding routers
You can create router for every entity and create standard REST service.
The minimal code for the router is:\
import {Router} from "express";\
const someRouter = Router();\
export default someRouter;

### If you are using nested routes like:
"storesRouter" in /api/stores\
"itemsRouter" in /api/stores/:storeId/items\
You MUST create the itemsRouter with merged params.\
const itemsRouter = Router({mergeParams: true});\
Which preserve the req.params values from the parent router. 
##### If the parent and the child have conflicting param names, the child’s value take precedence.

## Adding router to routes
You MUST add the router between the accountRouter registration and the /api fallback middleware registration.