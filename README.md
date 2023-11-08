# Encyclopaedia (Library Management Website)

Welcome to the Library Management Website, a modern web application built to help users manage and explore a vast collection of books. This repository contains the source code for the website, featuring a variety of functionalities, technologies, and libraries.

## Features

1. **Home Page**:

   - Users can browse different book categories and click on a specific category to view books within that category.

2. **All Books Page**:

   - Users can see a list of all available books.
   - Users can filter books by in-stock availability (quantity > 0).
   - Each book card displays:
     - Cover photo
     - Title
     - Category
     - Author name
     - Rating
     - Update button
     - Details button

3. **User Authentication**:

   - Users can register using their email and password.
   - Users can also sign in using Google authentication through Firebase.

4. **Update Books**:

   - Logged-in users can click the "Update" button to edit book details.

5. **Book Details Page**:

   - Users can view detailed information about a book.
   - Users can borrow a book, specifying a return date. A book cannot be borrowed more than once (borrow button is disabled).
   - borrowed books quantity reduces by 1 every time a user borrow, and if quantity < 1, user can not borrow this book.

6. **Borrowed Books Page**:

   - Users can see the books they have borrowed.
   - For each borrowed book, information includes cover image, title, category, borrowed date, and return date.
   - A "Return" button allows users to return a book and borrow it again.

7. **Add Book Page**:
   - Users can add new books to the library.

## Technologies Used

The Library Management Website is built using the following technologies and libraries:

- **React**: A popular JavaScript library for building user interfaces.
- **Firebase**: A cloud-based platform that provides authentication and real-time database functionality.
- **React-Hook-Form**: A library for managing form state and validation in React applications.
- **React-Icons**: A library providing a wide range of icons for React applications.
- **SwiperJS**: A library for creating responsive, touch-enabled sliders and banners.
- **Axios**: A JavaScript library for making HTTP requests.
- **Tailwind CSS**: A utility-first CSS framework for building responsive and stylish web interfaces.
- **DaisyUI**: A collection of components and plugins for enhancing the Tailwind CSS framework.
- **Tanstack Query**: A library for fetching, caching, and synchronizing data in your application.

## [Live Website Link:](https://encyclopaedia-97061.web.app)(https://encyclopaedia-97061.web.app)

## [Live Website (Alternative):](https://encyclopaedia.surge.sh)(https://encyclopaedia.surge.sh)

## [ Client Side Private repo Link:](https://github.com/Porgramming-Hero-web-course/b8a11-client-side-Mahadi-Hasan-Sopon)(https://github.com/Porgramming-Hero-web-course/b8a11-client-side-Mahadi-Hasan-Sopon)

## [ Server Side Private repo:](https://github.com/Porgramming-Hero-web-course/b8a11-server-side-Mahadi-Hasan-Sopon)(https://github.com/Porgramming-Hero-web-course/b8a11-server-side-Mahadi-Hasan-Sopon)

# Admin Auth:

- admin route: website-link/admin (you have to type it manually)
- email: admin@gmail.com
- password: Admin@123

- TODO:
- 1.  Use ReactToPDF or any relevant package to make the PDF version of the "Read" page of a book.
