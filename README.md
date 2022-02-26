# WIKI API 
## Build project api with typescript
##  DEPENDENCIES 
### Typescript     
    yarn add typescript -D
### ts-node-dev
    yarn add ts-node-dev -D 
###  @types/node 
    yarn add @types/node -D  
### tsconfig-paths 
    yarn add tsconfig-paths -D 
### express
    yarn add express
    yarn add express-async-errors
    yarn add  @types/express -D 
### cors 
    yarn add cors 
    yarn add @types/cors -D 
### typeorm (VERIFY NEW VERSION FIRST)
    yarn add typeorm
    yarn add typeorm-pagination
    yarn add typeorm-pagination@2.0.1
    yarn add reflect-metadata
    yarn add pg
### celebrate 
    yarn add celebrate
    yarn add  @types/joi -D
### bcryptjs 
    yarn add bcryptjs
    yarn add  @types/bcryptjs -D
### jsonwebtoken 
    yarn add jsonwebtoken
    yarn add  @types/jsonwebtoken -D 
### multer 
    yarn add multer
    yarn add @types/multer -D
### date-fns (VERIFY NEW VERSION FIRST )
    yarn add date-fns
    yarn add date-fns@2.16.1
### dotenv 
    yarn add dotenv
### class-transformer 
    yarn add class-transformer
### tsyringe 
    yarn add tsyringe
### BIG COMMAND DEPENDENCIES
    yarn add express express-async-errors cors typeorm typeorm-pagination reflect-metadata pg celebrate bcryptjs jsonwebtoken multer date-fns dotenv class-transformer tsyringe
### BIG COMMAND DEV DEPENDENCIES
    yarn add typescript ts-node-dev @types/node tsconfig-paths @types/express @types/cors @types/joi @types/bcryptjs @types/jsonwebtoken @types/multer -D
## INIT tsconfig.json
    npx tsc --init
        --module commonjs
        --lib es6
        --allowjs true
        --outDir dist   
        --rootDir src
        --strict true
        --noImplicityAny true
        --strictPropertyInitialization false
        --baseUrl ./
        --esModuleInterop true
        --experimentalDecorators true
        --emitDecoratorMetadata true
        --resolveJsonModule true   
        --skipLibCheck true
        --forceConsistentCasingInFileNames true
### BIG COMMAND TSCONFIG INIT 
    npx tsc --init --module commonjs --lib es6 --allowjs true --outDir dist --rootDir src --strict true --noImplicitAny true --strictPropertyInitialization false --baseUrl ./ --esModuleInterop true --experimentalDecorators true --emitDecoratorMetadata true --resolveJsonModule true --skipLibCheck true --forceConsistentCasingInFileNames true
### ADD IN tsconfig.json 
     "paths": {
       "@core/*": [
          "src/core/*"
       ],
       "@shared/*": [
         "src/shared/*"
       ],
       "@routes/*": [
         "src/routes/*"
       ]
     },
     "typeRoots": [
       "@types",
       ".node_modules/@types"
     ],
## PROJECT TREE 
    /src 
        /@types
            /express 
        /core
            /config 
            /database
            /middlewares 
        /interfaces   
        /repositories
        /entities
        /controllers 
        /services
        /routes
        /shared 
            /errors 
            /containers 
    index.ts 
## CONFIG DATABASE 
### CREATE FILE ormconfig.json  IN PROJECT ROOT 
    touch ormconfig.json
### ADD IN FILE ormconfig.json 
    {
        "type": "postgres",
        "host": "127.0.0.1",
        "port": 5432,
        "username": "postgres",
        "password": "123456",
        "database": "wiki",
        "entities": ["./src/**/entities/*.ts"],
        "migrations": [
            "./src/core/database/typeorm/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir": "./src/core/database/typeorm/migrations"
        }
    }

### CREATE DIRECTORY typeorm IN core AND ADD DIRECTORY migrations IN typeorm   
    mkdir -p src/core 
    mkdir -p src/core/databse 
    mkdir -p src/core/databse/typeorm 
    mkdir -p src/core/databse/typeorm 
    mkdir -p src/core/databse/typeorm/migrations  
### CREATE TABLE Users 
    yarn typeorm migration:create -n CreateUsers 
### EXECUTE MIGRATIONS 
    yarn typeorm migration:run 
### REVERT MIGRATIONS
    yarn typeorm migration:revert
## START PROJECT 
### ADD IN package.json 
    "scripts": {
         "start": "ts-node-dev -r tsconfig-paths/register --inspect --transpile-only --ignore-watch node_modules src/index.ts",
         "typeorm": "ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js"
    },
### DEV AMBIENT 
    yarn start 