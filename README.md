# ANGULARJS_FW_PHP_MVC_OO
Web application made on 1st year of higher education training cycle of DAW (Web Application Development)

## Preview
The next images are a sample of how the application looks like.

### Home
![Preview home](https://user-images.githubusercontent.com/76181286/122332034-14423900-cf36-11eb-9d3f-a24ebdc66127.png)
![Preview home](https://user-images.githubusercontent.com/76181286/122331143-a47f7e80-cf34-11eb-89e1-5856f56b0fc8.png)
![Preview home](https://user-images.githubusercontent.com/76181286/122331291-ddb7ee80-cf34-11eb-9615-c0eb90e32ef3.png)

### Menu
![Preview menu](https://user-images.githubusercontent.com/76181286/122331152-a6e1d880-cf34-11eb-8e93-cddcafa210ed.png)

![Preview menu_logged](https://user-images.githubusercontent.com/76181286/122331153-a6e1d880-cf34-11eb-88aa-5d822fedeec9.png)

### Shop
![Preview shop](https://user-images.githubusercontent.com/76181286/122331160-a8130580-cf34-11eb-9180-2a5b320deebd.png)

![Preview shop logged](https://user-images.githubusercontent.com/76181286/122331162-a8ab9c00-cf34-11eb-8923-66c46fb85507.png)

### Product Details
![Preview details](https://user-images.githubusercontent.com/76181286/122331689-836b5d80-cf35-11eb-865d-713682089312.png)

### Login
![Preview Login](https://user-images.githubusercontent.com/76181286/122331150-a6494200-cf34-11eb-85a3-31c1e3a9991d.png)

![Preview Register](https://user-images.githubusercontent.com/76181286/122331158-a77a6f00-cf34-11eb-85a4-c90eb02cfa70.png)

### Cart
![Preview Cart](https://user-images.githubusercontent.com/76181286/122331147-a5181500-cf34-11eb-8cc4-7cec6b3a2d15.png)

### Contact
![Preview Contact](https://user-images.githubusercontent.com/76181286/122331149-a5b0ab80-cf34-11eb-8f8e-020e9f8e22e8.png)

## Getting Started
To run this code you need to make docker-compose of the yml provided

## Prerequisites
* [Apache2](https://httpd.apache.org/)
* [MySQL](https://www.mysql.com/)
* [PHP](https://www.php.net/)
* [Docker](https://www.docker.com/)
* [Docker-compose](https://docs.docker.com/compose/)

## Installing
* You can installed by making docker compose up -d: [Documentation of Docker Compose](https://docs.docker.com/compose/)
* If you want to try this web application you can use my [database](https://github.com/SantiSL5/ANGULARJS_FW_PHP_MVC_OO/blob/master/backend/BBDD/BBDD.sql).

## Features
This application have the following modules.

Module | Description
:--- | :---
Home | Main page of the application where you can see two carrousels with the categories and the plataforms of the products.
Shop | Show all the videogames where you can use a filtering system by price slider, age recomended and genre.
Login | It allows you to register and login in the application, it sent you an email when you register with the form of the application and you can recover your password if you want to change it or you forget your password.
Social SignIn | It allows you to login using your Gmail and GitHub accounts.
Cart | You can purchase items and manage your cart. The cart is saved in a table of the database. When you make the checkout the order it save the order lines in one table and the order in other table.
Contact | It allows you to contact with the support anonymously or by providing an email so that support can respond to you.
Search | This module is implemented in all the app where you can search for the name of the products.
Translate | This module is implemented in the headbar, it translates using JSON files. Languages: spanish, english and valencian.

## Technologies

### Frontend
* [JS](https://developer.mozilla.org/es/docs/Web/JavaScript)
* [AngularJS](https://angularjs.org/) version 1.4.9
### Backend
* [Framework PHP](https://www.php.net/)
### Database
* [MySQL](https://www.mysql.com/)

## APIs
* [Google Books API](https://developers.google.com/books)

## Other technologies
* [Boostrap](https://getbootstrap.com/)
* [OWL Carousel](https://owlcarousel2.github.io/OwlCarousel2/)
* [Firebase](https://firebase.google.com/)
* Toastr: [CSS](https://npmcdn.com/angular-toastr/dist/angular-toastr.css) [JS](https://npmcdn.com/angular-toastr/dist/angular-toastr.tpls.js)
* rzSlider: [JS](https://github.com/rzajac/angularjs-slider.git)
* gravatar: [Gravatar](https://es.gravatar.com/)
