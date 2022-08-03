# H2G assessment

## Suggested technologies
* React
* Redux / MobX
* jest
* [json-server](https://github.com/typicode/json-server) (easy to use mock server)

## Description
Write a reading list application in React.
In this application users can add books to their list, mark a book as "reading" or "read" and books can be filtered based on their state.
Use Redux, MobX, or the technology of your choice to store the application's internal state.
Write unit tests for the most important parts.

## Requirements
### Pages (routes)
* "/"
* "/books"
* "/books/new"
* "/books/edit/{id}"
* "/404"

### "/"
Redirect to "/books"

### "/books"
List of books.

#### Elements
* title: "Reading list"
* "New" button
* "Reading", "Read" filter buttons,
* Book list:
  * book list item
    * book title,
    * "edit" button
    * "reading", "read" buttons

#### Behavior
* While the data is loading display a loading indicator
  * on unsuccessful data fetching display error message
* on "New" button click navigate to "/books/new" form
* on filter button click
  * indicate visually on the button if the given filter is active or not,
  * show the filtered book list according to the filter button states
  * only one filter can be active at a time
* Book list item edit button should navigate to "/books/edit/{i}"
  * on unsuccessful routing display error message
* Book list item "mark as reading", "mark as read" button
  * Save the change on server
  * while the operation is in progress display a loading indicator
  * on unsuccessful save display error message
  * on successful save update the UI accordingly

### "/books/new"
A form to add a new book to the book list

#### Elements
* Page Title: "Add new book" | "Editing book"
* Book form
  * Title: required
  * Author: required
  * Description: optional
  * Submit button
  * Cancel button

#### Behavior
* Use form validation according to the form elements description
  * if an already edited input field with validation has validation errors
    * add red border to the input field
    * display validation error message
* submit button should be disabled while the form is invalid
* on Cancel button click navigate back to the book list page
* on submit button click
  * display a loading indicator
  * send the form data to server
  * on successful request navigate back to "/books" page
  * on failed request display error message

### "/books/edit/{id}"
A form to edit an existing book in the list

#### Behavior
* routes could be lazy loading
* reuse the "/books/new" form, the behavior should be the same

### "/404"
Show a not found page

### "/*"
Redirect to "/404" route

## Json server example `db.json` file
```json
{
  "books": [
    {
      "title": "Harry Potter and the Philosopher's Stone",
      "author": "J. K. Rowling",
      "description": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday,",
      "reading": false,
      "read": false,
      "id": 1
    },
    {
      "title": "Foundation",
      "author": "Isaac Asimov",
      "description": "",
      "reading": false,
      "read": false,
      "id": 2
    }
  ]
}
```
