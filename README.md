# Penn Course Cart

For my implementation of the Penn Course Cart Challenge, I seperated the project into 3 main files: 

1. App.js to handle exhcanging information between the courses and cart, 

2. Cart.js to take in all the selected courses and display additional information about the classes 

3. A Courses.js to handle loading all the CIS courses provided in the JSON file 

--------------------

### Structure 

I used the provided JS files and JSON files for the skeleton of my app's functionality. Additionally, I used React Bootstrap to 
style my components quickly given time constraints. Additionally, I used the Penn Labs API for additional information about courses
that I personally like to see when browsing for courses. 


--------------------

### General structure

```
public/
  index.html           Root HTML file for each page

src/                   Where the JS logic is
  components/          Contains all React components
    Cart.js            Basic component for the course cart
    Courses.js         Basic component for rendering courses
    Nav.js             Basic component for the navbar
    ...                Feel free to add other components

  data/                Contains data rendered by the components
    courses.json       Contains information on CIS courses at Penn

  App.css              CSS for the app
  App.js               Root component for the app
  index.js             Renders the React app
  ...
```

--------------------

### Features

1. __Explore courses__
  Using the Form component from my component library, I used the onChange handle to pass the text entered in the field from my App.js to Courses.js. Inside Courses.js
  I had function that went through courses.json and showed a course if a subset of its information matched the text entry. For example, if the user had check to search 
  by "courses" my method would include all courses whose official CIS title or Cross Listed Title contained the text entry as a substring. 

2. __Add courses to your cart__
  *Clicking the button corresponding to a course opens a modal with the basic information about the course(title, course code, description). There is also a button 
  that, when clicked, adds the course to a list. This button is not visible if we already have 7 courses in the list. 
  * I kept a counter of the number of courses we have added to far to check if I should make an alert if the user tries to add an 8th course
  * When a course has been added, the Cart button in the upper right's badge increases in its value to reflect the number of courses we have selected. The course's modal
  will also now contain a disabled button marked "Already in Cart" so we can't re add a course that has already been selected. 

3. __View cart and checkout__
  * The cart button in the upper right can be clicked to view the current state of the cart. 
  * If there is nothing selected, there will be a box saying that nothing has been selected, else there is a table with each row being a selected course as well 
  as information I fetched with a call to the Penn Labs API 
  * The bottom of the table contains a label that shows the total number of credits a student has selected as well as a button to check out. 
    * clicking this button results in a receipt modal to show what they have checked out and a nice video player to a wholesome youtube video :) 

4. __Additional features__

  * I used the Penn Labs API to display only the relevant information such as whether or not a course is open, its max enrollment, etc 
  * I created 3 checkboxes above the text entry so users can search by description, prerequsites and course code, or title 

--------------------

### I hope you all enjoy my product it was pretty fun! 
