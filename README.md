# MERN-ES6-Template
Full-stack application template using JavaScript ES6 syntax and MongoDB, Express, React, Node technology stack.

## Setup
In order to function properly and to be flexible the template uses repository secrets
and environment variables for its setup.

### GitHub Actions workflow setup
Create secrets ( Settings > Secrets ) with names: "NAME" and "EMAIL".\
This will be the name and email git will use in the workflow commit to deploy branch.\
Put the values in " ".\

The workflow's <b>build-client</b> job uploads built client as artifact with name "client" and retains it for 1 day.

The prepare-deploy job downloads the "client" artifact in ./public folder, uploads deploy-ready artifact "server"\
and commits the deploy-ready app to "deploy" branch. 

This branch can be used from hosting providers ( https://render.com )\
as deploy-ready copy of the application (both front-end and back-end are included).

#### The workflow fails if there are warnings when client is built
You can prevent that by adding Secret with key CI and value false.

### Heroku removes all free dynos from 28/11/2022
There is still way to deploy your app for free.

### Render Web Service deploy.
https://render.com allows you to deploy both "Static" (stand-alone React applications)
and Web Service (MERN, NodeJS etc).

#### Creating Render "Web Service"
Go to https://render.com and create un account.\
If you already have one SignIn and go to Dashboard.\

Press the "New" button and select Web Service.\
You have to connect your GitHub account to be able to connect repository to the Web Service.\

In the "Connect a repository" select which repo you want to connect,\
by pressing the corresponding "Connect" button.\

"Name" of the "Web Service" is also the subdomain on which your application\
will be accessible. Your application will have domain "https://<b>service-name</b>.onrender.com".

"Root directory" is the root directory of your application.\
You should leave the field empty.\
If you have moved your backend root from / to /src or other subdirectory then you should
put that subdirectory here.\

"Environment" has to be set to "Node".\
You can also use Render Web Service for project written on Elixir, Go, Python, Ruby & Rust.
It can host Docker containers as well.\

"Region" is the location of the physical server that host your application.
At the current moment there are only 4 locations, but for the purpose of testing they are enough.

"Branch" - you should select the "deploy" branch.\
If it is not present then the GitHub actions workflow failed.\
You need to fix that first. When the workflow finishes successfully it creates the "deploy" branch.

"Build command" - The application is does NOT need to be build. It only needs its dependencies.\
type <b>npm install</b> or <b>yarn install</b>.

"Start command" - <b>npm run start</b>

"Plan type" - You can select any plan, but <b>Free</b> is why I use Render. 

"Advanced" - In this section are the "Environment" variables, "Secret" file, "Auto-Deploy" option and "Build" filters.\
In this section you can set all environment variables you need.

#### Environment Variables
They can be changed/added/removed later in the Environment section of the Web Service.
The Key/Value pairs are attached as properties of the process.env object.

The first one you have to set is <b>BASE_PATH</b> with value\
https://<b>service-name</b>.onrender.com

### Database SetUp
The template uses "mongoose" and it takes the database connection string
from environment variable named DB_CONNECTION_STRING for production.

###### If the connection password contains non-alphanumeric symbols you MUST URL-encode the connection string.
For development and in case the environment variable is NOT set it uses
the default values from /configs/database.js

### Security SetUp
There are several environment variables in this section. 
The default values can be changed in /configs/security.js

##### SECURITY_ENCODING
The string representation encoding of the salt and the hashed password.

###### Default is base64.
If you use Heroku it can be set by using Config Vars.

##### PASSWORD_SALT_LENGTH
The number of bytes ( before encoding ) of the salt.
###### Default is 16.

##### PASSWORD_HASH_LENGTH
The number of bytes ( before encoding ) of the hashed password. 
###### Default is 64.

##### PASSWORD_HASH_ITERATIONS
The number of hashing iterations of the password.
###### Default is 15000.

##### PASSWORD_HASHING_ALGORITHM
The algorithm used for the hashing. 
###### Default is sha512.

##### COOKIE_SECRET
When the token is stored in the cookie it is encrypted with this value.\
If it is not set it uses the default value from /configs/security.js

##### COOKIE_NAME
Is the name of the authentication cookie.

#### If you are going to deploy on server that does NOT support "https".
You must change the cookieConfigs.options.secure in /configs/security.js to "false".\
By default is to set it to true when NODE_ENV is "production";

## Creating fresh client with create-react-app

### You can create fresh client at any time
Just open a terminal in the main folder and use:
###### npx create-react-app client
You can use any option available for create-react-app.

##### Setup client build path
After you create fresh copy of the client application you must add .env file in /client with 
###### BUILD_PATH='../public'
This will change the client build path to /public and when you run <b>npm run build</b> in the client directory
the built client application will be placed automatically in the /public folder.  

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
You MUST create the itemsRouter with merged params.
###### const itemsRouter = Router({mergeParams: true});
Which preserve the req.params values from the parent router. 
##### If the parent and the child have conflicting param names, the child’s value take precedence.

## Adding router to routes
You MUST add the routers before the /api fallback middleware registration.