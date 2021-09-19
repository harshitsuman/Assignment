http://localhost:8080/signup
http://localhost:8080/insert
    {
        "email":"harshitsuman111@gmail.com",
        "firstName":"Harshit",
        "lastName":"Suman",
        "password":"Harshit@123",
        "type":"admin"
    }

There are two types of user: admin and student

POST: http://localhost:8080/signin

    {
        "email":"harshitsuman111@gmail.com",
        "password":"Harshit@123",
        "type":"admin"
    }

PUT: http://localhost:8080/update/6147868bc6fd54afa607a3dc

    {
        "firstName":"Rohit sikkw",
        "lastName":"Kumar",
        "email":"test@example.com"
    }

DELETE: http://localhost:8080/delete/6147868bc6fd54afa607a3dc

GET: http://localhost:8080/profile# Assignment
