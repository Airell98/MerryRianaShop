# MerryRiana Shop

Creating MerryRiana Shop For Customer app, using express and Vuejs

```
MerryRiana Shop is an application for customers where they are able to purchase lots of products from  3 different categories and there is an Admin Page specialized ony for the admin.

This app has :
* RESTful endpoint for products's CRUD operation
* SPA based, Fast and Responsive
```

# ADMIN

```
If you want to be the admin, then sign in with the following account:

Email : joey@mail.com
Password : mamakumama

```

# URL

```
Client URL : https://merryrianashop-8f0ad.web.app
Server URL : https://merryrianashop.herokuapp.com
```

# USAGE

```
Make sure you have Node.js and npm in your computer and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.

Run `nodemon app.js` to start the server.

Run `live-server --host=localhost` to start the client
```

# Global Response

```
Common case response if you are exploring all Products endpoint

Response (401) = { "msg": "User Not Authenticated" }

Response (403) = { "msg": "Forbidden Access" }

Response (500) = { "msg": "Internal Server Error" }
```

# RESTful endpoints

<!-- --- -->

### POST /user/userLogin

_Request Header_

```
Not needed
```

_Request Body_

```
{
  "email" : "<your email>",
  "password" : "<your password>"

}
```

_Response (200)_

```
{ "access_token" : "<your account access token>",
  "email"        : "<your email address>",
  "name"         : "<your email name>",
  "role"         : "<notAdmin>",
}
```

_Response (400)_

```
{ "error"  : "LOGIN ERROR"
  "message": "Invalid Email / Password"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### POST /user/adminLogin

_Request Header_

```
Not needed
```

_Request Body_

```
{
  "email" : "<your email>",
  "password" : "<your password>",

}
```

_Response (201)_

```
{ "access_token" : "<your account access token>",
  "email"        : "<your email address>",
  "name"         : "<your email name>",
  "role"         : "<SuperAdmin>",
}
```

_Response (400)_

```
{ "error"  : "VALIDATION_ERROR"
  "message": "Name  required, password required, this is email is already taken, role required
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### POST /user/adminRegister

_Request Header_

```
Not needed
```

_Request Body_

```
{
  "email" : "<your email>",
  "password" : "<your password>",
}
```

_Response (200)_

```
{ "access_token" : "<your account access token>",
  "email"        : "<your email address>",
  "name"         : "<your email name>",
  "role"         : "<SuperAdmin>"
}
```

_Response (400)_

```
{ "error"  : "LOGIN ERROR"
  "message": "Invalid Email / Password"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### POST /user/userRegister

_Request Header_

```
Not needed
```

_Request Body_

```
{
  "email" : "<your email>",
  "password" : "<your password>",
  "name" : "<your name>",
}
```

_Response (200)_

```
{ "access_token" : "<your account access token>",
  "email"        : "<your email address>",
  "name"         : "<your email name>",
   "role"         : "<notAdmin>"

}
```

_Response (400)_

```
{ "error"  : "SequelizeValidationError"
  "message": "name required, Password required, Email required, Duplicate email, Invalid Email format"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### POST /user/google-sign-in

_Request Header_

```
Not needed
```

_Request Body_

```
{
  "id_token": "id_token"

}
```

_Response (200)_

```
{
  access_token: access_token,
  User:{
    "name": "<User's name>",
    "email": "<User's email>",
    "password": "<User's password>",
     "role"   : "<notAdmin>"
  }
}
```

_Response (500)_

```
{
  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### GET /products

> Get all products

_Request Header_

```
not needed
```

_Request Body_

```
Not needed
```

_Response (200)_

```
{
  Product :[{
    "id": "<product id>,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "category": "<product category>",
   
  },
  {
    "id": "<product id>,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "category": "<product category>",
   
  }]
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### GET /products/:id

> Get product with a specific id

_Request Params_

```
Products's ID
```

_Request Header_

```
{ access_token : <your account access token> }
```

_Request Body_

```
Not needed
```

_Response (200)_

```
{
  Product :{
    "id": "<product id>,
    "name": "<product name>",
    "image_url": "<product image_url>",
    "price": "<product price>",
    "stock": "<product stock>",
    "category": "<product category>",
    "User":{
      email : : "<User's email>",
    }
  }
}
```

_Response (400)_

```
{
  "error" : "DATA_NOT_FOUND"
  "message": "Invalid id"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### POST /product

> Create new product

_Request Header_

```
{ access_token : <your account access token> }
```

_Request Body_

```
{
  "name": "<title to get insert into>",
  "category": "<category to get insert into>",
  "stock": "<category to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "desc": "<image_url to get insert into>",
}
```

_Response (201 - Created)_

```
{
  "name": "<Product name>",
  "category": "<Product caaegory>",
  "stock": "<Product stock>",
  "image_url": "<Product image url>",
  "desc": "<Product desc>",
}
```

_Response (400)_

```
{
  "error" : "DATA_NOT_FOUND",
  "message": "Invalid Id"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### PUT /product/:id

> Update products with specific id

_Request Params_

```
Products's ID
```

_Request Header_

```
{ access_token : <your account access token> }
```

_Request Body_

```
{
  Product :{
    "name": "<input product name>",
    "image_url": "<input product image_url>",
    "price": "<input product price>",
    "stock": "<input product stock>",
    "category" :"<input product category>",
  }
}
```

_Response (200)_

```
{
  Product :{
    "name": "<edited product name>",
    "image_url": "<edited product image_url>",
    "price": "<edited product price>",
    "stock": "<edited product stock>",
    "category" :"<edited product category>",
  }
}
```

_Response (400)_

```
{
  "error" : "DATA_NOT_FOUND",
  "message": "Invalid Id"
}
```

_Response (403)_

```
{
  "error" : "FORBIDDEN_ACCESS",
  "message": "You are not authorized to access the file"
}
```

_Response (500)_

```
{
  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### DELETE /product/:id

> Delete product with specific id

_Request Params_

```
Products's ID
```

_Request Header_

```
{ access_token : <your account access token> }
```

_Request Body_

```
Product's ID
```

_Response (200)_

```
{
  product:[1]
}
```

_Response (400)_

```
{ "message": "Invalid Id" }
```

_Response (403)_

```
{
  "error" : "FORBIDDEN_ACCESS",
  "message": "You are not authorized to access the file"
}
```

_Response (500)_

```
{
  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### POST /cart/checkOut

> Purchase Product in Cart

_Request Header_

```
{ access_token : <your account access token> }
```

_Request Body_

```
{
  Cart:{
    UserId: <User's Id>,
    ProductId: <Product's Id>,
    qty: <Purchase amount>,
    totalPrice: <Purchase Total Price>
  }
}
```

_Response (200)_

```
{
  "msg":"Checkout succeeded"
}
```

_Response (400)_

```
{ "error" : "OUT_OF_STOCK",
  "message": "Product is currently running out of stock"
}
```

_Response (400)_

```
{ "error" : "INSUFFICIENT_STOCK",
  "message": "<Product's name> only have/has <Product's stock> left"
}
```

_Response (500)_

```
{
  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

### GET /user/getShoppingHistories

> Get all User's Shopping Histories

_Request Header_

```
{
"access_token": "access_token"
}
```

_Request Body_

```
Not neeeded
```

_Response (200)_

```
{
  "name": "<Product name>",
  "category": "<Product caaegory>",
  "stock": "<Product stock>",
  "image_url": "<Product image url>",
  "desc": "<Product desc>",
}
```

_Response (400)_

```
{
  "error": "DATA_NOT_FOUND",
  "message": "Invalid Id"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### POST /cart

> Get all User's Products

_Request Header_

```
{
"access_token": "access_token"
}
```

_Request Body_

```
Not neeeded
```

_Response (200)_

```
{
  "name": "<Product name>",
  "category": "<Product caaegory>",
  "stock": "<Product stock>",
  "image_url": "<Product image url>",
  "desc": "<Product desc>",
}
```

_Response (400)_

```
{
  "error": "DATA_NOT_FOUND",
  "message": "Invalid Id"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### POST /cart

> Create User's Cart

_Request Header_

```
{
"access_token": "access_token"
}
```

_Request Body_

```
{
  id: "<Product's ID>",
  qty: "<User's quantity input>"
}
```

_Response (200)_

```
{
  "name": "<Product name>",
  "category": "<Product caaegory>",
  "stock": "<Product stock>",
  "image_url": "<Product image url>",
  "desc": "<Product desc>",
}
```

_Response (400)_

```
{
  "error": "DATA_NOT_FOUND",
  "message": "Invalid Id"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### GET /cart

> Get User's Cart

_Request Header_

```
{
"access_token": "access_token"
}
```

_Request Body_

```
{
  not needed
}
```

_Response (200)_

```
{
  "Cart":{
    "UserId":"integer",
    "ProductId": "integer",
    "totalPrice": "integer",
    "qty": "integer",
    Product:{
  {
  "name": "<Product name>",
  "category": "<Product caaegory>",
  "stock": "<Product stock>",
  "image_url": "<Product image url>",
  "desc": "<Product desc>",
}
    }
  },
  User:{
  "name": "<User's name>",
  "email": "<User's email>",
  "password": "<User's password>"

}
}
```

_Response (400)_

```
{
  "error": "DATA_NOT_FOUND",
  "message": "Invalid Id"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### PUT /cart/updateAmount

> edit User's Cart

_Request Header_

```
{
"access_token": "access_token"
}
```

_Request Body_

```
{
  not needed
}
```

_Response (200)_

```
{
  "productId": "integer",
   "qty": "integer",
}
```

_Response (400)_

```
{
  "error": "DATA_NOT_FOUND",
  "message": "Invalid Id"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---

### DELETE /cart/delete

> Delete User's Cart

_Request Header_

```
{
"access_token": "access_token"
}
```

_Request Body_

```
{
  "productId": "integer",
   "qty": "integer",
}
```

_Response (200)_

```
{
 "product": [1]
}
```

_Response (400)_

```
{
  "error": "DATA_NOT_FOUND",
  "message": "Invalid Id"
}
```

_Response (500)_

```
{  "error" : "UNKNOWN_ERROR",
  "message": "Something went wrong"
}
```

---
