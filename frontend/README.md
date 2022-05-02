# FRONTEND

This Directory is the frontend for the [BookCatalogue](https://bookcataloguereact.netlify.app/) Website.

The website built using ReactJS(TypeScript) and Styled using SCSS.

To run locally : `npm install && npm start`

## Interfaces (Same as Response Object Schema)

Book : `{
title:string,
year:number,
image:string,
description:string,
id:string}`

## Pages

#### Home ('/')

This Page displays the list of all available books in the catalogue.

How It Works:
1)  Fetches Data from `https://bookcataloguebackend.herokuapp.com/books` and stores it in `books` state.
2)  `books` is mapped to the `Card` element which renders the individual book card elements.
3)  Clicking on a `Card` navigates to the `/books/:id` route for the selected book which renders the `BookInfo` page.


### BookInfo ('/book/:id')

This Page displays all the information about a single book.

How It Works:
1)  Fetches Data from `https://bookcataloguebackend.herokuapp.app/books/:id` and stores it in the `book` state.
2)  The data from `book` state is rendered on the screen.
