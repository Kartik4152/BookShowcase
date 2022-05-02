# Backend

This Directory is the backend for the [BookCatalogue](https://bookcataloguereact.netlify.app/) Website.

The [backend](https://bookcataloguereact.herokuapp.com/books) is built using NodeJS(Express-TypeScript) and Firebase/Firebase Storage is used as the database/storage.

## Setup
Steps for setting up credentials in environment variables:
1) Create a `.env` file in the root folder.
2) Add The Following Environment Variables
```

PROJECT_ID=""
PRIVATE_KEY_ID=""
PRIVATE_KEY=""
CLIENT_EMAIL=""
CLIENT_ID=""
CLIENT_CERT_URL=""

To Run Locally : `yarn && yarn start`


## Interfaces

Book : `{
title:string,
year:number,
image:string,
description:string,
id:string}`

## Routes

#### Books ('/books')
Fetches data from firestore and Returns `Book[]`.


### BookInfo ('/books/:id')
Fetches data from firestore using the `id` param and Returns `Book`.

