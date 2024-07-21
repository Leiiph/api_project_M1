
# api_project_M1

# Book List Website Requirements
## Introduction
This document outlines all the requirements for our M1 final project in API class: a book list website, allowing the users to manage their book list. On it, the users are able to see the state of each book in the book list, add a new book to the list, remove one, and update the state of each book. They can also download the whole database in a .csv file.

The website can be accessed here:
-	http://3.128.61.45/
-	https://github.com/Leiiph/api_project_M1

But it requires to use the .env file in both /graphql and /backend

## Frontend
**Page & Feature**
1.	Home page
-	Display the whole book list with the author, book’s name and current state. Books are ordered through their book_id.
-	Option to add a new book to the list. For that, the user must input the book’s name, author and current state.
-	Option to delete a book from the list. To do so, the user must input the book’s name.
-	Option to download the whole database into a .csv file. 

**User Interface**
-	99% Responsive, to adapt to desktop & mobile devices,
-	User-friendly navigation.
-	Web-design convention is respected: the subject of our website (content of the book list) is the hero of the page.
-	“Card style” for the books to make it easier to find the desired book & require less input from the user to find their book. No “validate” button to also reduce the number of inputs.

## Backend
**Database architecture**
Having already used MongoDB for a previous lab, we decided to use MySQL, to see how it should be done. Here is our unique table:
-	Table “bookstate”
  -	id_book (unique identifier, auto-increment, primary key),
  -	name,
  -	author,
  -	state.
 
The database is stored on AWS and can be CRUD through either the website itself or any instance able to connect to it, such as MySQL Workbench. The login information (USER, PASSWORD) are stored in a .env, for security purposes.

# API Documentation
## Endpoints - REST
**Get all books**
-	GET/books
-	Description: Retrieve everything from the bookstate table.
-	Responses:
	  - 200: success
	  - 500: error

**Get all books’ names**
-	GET/books/names
-	Description: Retrieve only the values inside the “name” column of the bookstate table.
-	Responses:
	  - 200: success
	  - 500: error

**Update book state:**
-	PUT/books/:id/state
-	Description: Update the state of the chosen book using it’s unique book_id.
-	Path parameters: 
    -	Book_id (integer, auto_increment & assigned): ID of the book.
-	Request:
    -	State: in what state must be updated.
-	Responses:
	  - 200: success
	  - 500: error

**Add a book:**
-	POST/books/add
-	Description: Insert into bookstate table a new book with its name, author and current state. book_id is automatically attributed by the database.
-	Responses:
	  - 200: success
	  - 500: error

**Delete a book:**
-	POST/books/name/deletion
-	Description: Remove a book from the bookstate table using its name. 
-	Responses:
	  - 200: success
	  - 500: error

**Possible updates**
-	Use colors to visually differentiate book’s states,
-	Graph on the webpage to see the proportion of each states (dynamically updated),
-	Google oath.
